"""Exhaustively check story paths and authority/ownership continuity."""
import json
import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import unquote, urlparse
from render import render_script, render_map

ROOT = Path(__file__).resolve().parent
data = json.loads((ROOT / "branches.json").read_text(encoding="utf-8"))
nodes = {x["id"]: x for x in data["nodes"]}
endings = {x["id"]: x for x in data["endings"]}
errors, routes = [], []
visited, used_options, used_lines, used_variants = set(), set(), set(), set()


def check(ok, message):
    if not ok:
        errors.append(message)


def matches(c, state):
    if "all" in c:
        return all(matches(x, state) for x in c["all"])
    if "any" in c:
        return any(matches(x, state) for x in c["any"])
    value = state.get(c["key"])
    if "equals" in c:
        return value == c["equals"]
    if "in" in c:
        return value in c["in"]
    raise ValueError(f"Unsupported condition: {c}")


def check_state(state, location):
    for company in ("openai_control", "anthropic_control"):
        check(state[company] in {"private", "public", "special_rights", "contested"},
              f"{location}: invalid control state")
        if state[company] == "public":
            check(state["acquisition_act"], f"{location}: public ownership without acquisition law")
        if state[company] == "special_rights":
            check(state["deal_authorized"], f"{location}: special rights without approved deal")
    if state["legal"] in {"challenged", "defied", "constitutional_crisis", "defied_final"}:
        check(state["openai_control"] == state["anthropic_control"] == "contested",
              f"{location}: custody dispute treated as a lawful transfer")


def walk(key, state, choices):
    check_state(state, key)
    if key in endings:
        check(len(choices) == data["levels"], f"{key}: route has {len(choices)} choices")
        check(state["openai_control"] != "contested" and state["anthropic_control"] != "contested",
              f"{key}: unresolved custody in terminal state")
        ownership = [x["text"] for x in data["ending_ownership"] if matches(x["when"], state)]
        check(len(ownership) == 1, f"{key}: ending has {len(ownership)} ownership passages")
        pacing = [x for x in data["ending_additions"]
                  if x["when"].get("key") == "pacing_policy" and matches(x["when"], state)]
        check(len(pacing) == 1, f"{key}: ending must retain exactly one pacing-policy passage")
        if key in {"E_REVERSED", "E_GRIDLOCK", "E_REMOVED"}:
            check(state["openai_control"] == state["anthropic_control"] == "private",
                  f"{key}: companies were not restored")
        if key == "E_HOLLOW":
            check(state["readiness"] in {"weakened", "prototype"}, "Hollow ending lacks capability cause")
        if key == "E_WAR":
            check(state.get("war_origin") in {"warning_response", "expanded_campaign"},
                  "War ending lacks human decision to begin or expand operations")
        if key == "E_TRUCE":
            check(state["protocol"] and state.get("verification") == "reciprocal",
                  "Truce ending lacks agreement and reciprocal review")
        if key == "E_REMOVED":
            check(state["legal"] == "removed" and choices[-1] == "L5_BREAKDOWN.B",
                  "Removal skips the authored constitutional confrontation")
        routes.append({"choices": choices, "ending": key, "state": state,
                       "ownership_text": ownership,
                       "additional_text": [x["text"] for x in data["ending_additions"]
                                           if matches(x["when"], state)]})
        return
    check(key in nodes, f"Missing destination: {key}")
    if key not in nodes:
        return
    node = nodes[key]
    check(node["level"] == len(choices) + 1, f"{key}: skips or repeats a decision level")
    if node["level"] != len(choices) + 1:
        return
    visited.add(key)
    check(len(node["options"]) >= 2, f"{key}: no meaningful choice")
    check(len({o["id"] for o in node["options"]}) == len(node["options"]), f"{key}: duplicate option")
    for i, line in enumerate(node["lines"]):
        if "when" not in line or matches(line["when"], state):
            used_lines.add((key, i))
    for opt in node["options"]:
        used_options.add((key, opt["id"]))
        updated = dict(state, **opt["effects"])
        variants = opt.get("consequence_variants", [])
        if variants:
            matching = [i for i, x in enumerate(variants) if matches(x["when"], updated)]
            check(len(matching) == 1, f"{key}.{opt['id']}: ambiguous consequence")
            used_variants.update((key, opt["id"], i) for i in matching)
        if "next" in opt:
            check("next_by_state" not in opt, f"{key}.{opt['id']}: competing routing methods")
            target = opt["next"]
        else:
            possible = [x["next"] for x in opt["next_by_state"] if matches(x["when"], updated)]
            check(len(possible) == 1, f"{key}.{opt['id']}: resolves to {len(possible)} targets")
            if len(possible) != 1:
                continue
            target = possible[0]
        walk(target, updated, choices + [f"{key}.{opt['id']}"])


check(len(nodes) == len(data["nodes"]), "Duplicate scene IDs")
check(len(endings) == len(data["endings"]), "Duplicate ending IDs")
check(not set(nodes).intersection(endings), "Scene and ending IDs overlap")
check(data["levels"] == 5, "Draft must contain five levels")
walk(data["start"], dict(data["initial_state"]), [])
check(visited == set(nodes), "Some decision scenes are unreachable")
check({x["ending"] for x in routes} == set(endings), "Some endings are unreachable")
check(len(used_options) == sum(len(n["options"]) for n in nodes.values()), "Some choices are unreachable")
check(len(used_lines) == sum(len(n["lines"]) for n in nodes.values()), "Some conditional dialogue is unreachable")
check(len(used_variants) == sum(len(o.get("consequence_variants", []))
      for n in nodes.values() for o in n["options"]), "Some consequence variants are unreachable")
check(len(routes) == 48, "Expected 48 complete choice sequences")

for file, expected in (("script.md", render_script(data)), ("BRANCH-MAP.md", render_map(data))):
    text = (ROOT / file).read_text(encoding="utf-8")
    check(text == expected, f"{file}: stale render")
    for target in re.findall(r"\]\(([^)]+)\)", text):
        if urlparse(target).scheme:
            continue
        path, _, anchor = target.partition("#")
        local = (ROOT / unquote(path)) if path else ROOT / file
        # This report is created below, including on the first verification run.
        check(local.is_file() or local == ROOT / "verification.json",
              f"{file}: broken local link {target}")
        if anchor:
            body = local.read_text(encoding="utf-8") if local.is_file() else ""
            check(f'id="{anchor}"' in body, f"{file}: broken anchor {target}")

widths = Counter(n["level"] for n in nodes.values())
report = {
    "status": "PASS" if not errors else "FAIL",
    "checked": data["checked"],
    "decision_levels_per_run": data["levels"],
    "decision_scenes": len(nodes),
    "scene_widths_by_level": dict(sorted(widths.items())),
    "complete_choice_sequences": len(routes),
    "terminal_families": len(endings),
    "ending_coverage_counts": dict(sorted(Counter(r["ending"] for r in routes).items())),
    "note": "Coverage counts are not probabilities. The story is an authored scenario.",
    "errors": errors,
    "routes": routes,
}
(ROOT / "verification.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps({k: v for k, v in report.items() if k != "routes"}, indent=2))
sys.exit(bool(errors))
