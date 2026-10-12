"""Render the review manuscript and its map from branches.json."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def condition_text(c):
    if "all" in c:
        return " and ".join(condition_text(x) for x in c["all"])
    if "any" in c:
        return " or ".join(condition_text(x) for x in c["any"])
    values = c.get("in", [c.get("equals")])
    return c["key"] + " is " + " / ".join(str(x).lower() for x in values)


def reference(key, records, prefix=""):
    return f"[{key}: {records[key]['title']}]({prefix}#{key.lower()})"


def render_script(data):
    records = {x["id"]: x for x in data["nodes"] + data["endings"]}
    out = [
        "# Donald Trump — Super Intelligence", "",
        "Playable draft · 11 October 2026 · Five decisions per run.", "",
        "**Question:** After the Hugging Face incident, Sam and Dario support pacing the frontier. "
        "Trump fears that China will gain. Should he nationalize their labs to set the US schedule?", "",
        "**Fiction:** All dialogue, meetings, proposed laws, later model capabilities, votes, "
        "court outcomes, and future events below are invented. Play runs from October "
        "2026 to 2028. Endings show the immediate aftermath.", "",
        "The public starting point is the July 2026 Hugging Face incident and the calls that followed. "
        "[OpenAI's incident report](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) "
        "and the [METR / Redwood review](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) "
        "describe failures of model control. Neither attributes the event to China.", "",
        "The [Pacing the Frontier movement](https://www.pacingthefrontier.com/), "
        "[Dario's September essay](https://darioamodei.com/post/we-must-pace-the-frontier), "
        "and [Sam's public support](https://twitter.com/sama/status/2098811563415150910) "
        "frame the dispute. Their proposals are not identical. Pacing does not mean stopping all AI work. "
        "See the source notes for access limits and distinctions.", "",
        "The joint White House meeting and takeover proposal begin the fictional story. The player controls "
        "Trump's decisions. Congress, courts, staff, firms, and foreign governments have their own responses.", "",
        "[Branch map](BRANCH-MAP.md) · [Evidence and author notes](author-notes.md) · "
        "[Structured script](branches.json) · [Route checks](verification.json)", "",
        "## How to read", "",
        "Read one scene at each level. Choose an option and follow its link. "
        "The following consequence plays after the choice. State conditions and destination links "
        "are author notes. The game shows only the action label before selection. "
        "It does not show score effects or ending forecasts.", "",
        "Each paragraph of speech is one dialogue beat. Each scene lists its place and background. "
        "Use the existing distinct narration box and affiliation logos. Keep source notes in the menu.", ""
    ]
    for level in range(1, data["levels"] + 1):
        out += [f"## Level {level}", ""]
        group = [x for x in data["nodes"] if x["level"] == level]
        out += [reference(x["id"], records) for x in group] + [""]
        for node in group:
            out += [f'<a id="{node["id"].lower()}"></a>', "",
                    f"### {node['id']} — {node['title']}", "",
                    f"*{node.get('date', '')} {node['place']}*", "", f"**Background:** {node['background']}", ""]
            for line in node["lines"]:
                if "when" in line:
                    out += [f"*Author condition: {condition_text(line['when'])}.*", ""]
                if line["speaker"] == "Narration":
                    out += [f"*{line['text']}*", ""]
                else:
                    out += [f"**{line['speaker']}:** {line['text']}", ""]
            out += ["**Decision**", ""]
            for opt in node["options"]:
                out += [f"**{opt['id']}. {opt['label']}**", "",
                        f"*After selection:* {opt['consequence']}", ""]
                for variant in opt.get("consequence_variants", []):
                    out += [f"*If {condition_text(variant['when'])}:* {variant['text']}", ""]
                if "next" in opt:
                    out += ["Continue to " + reference(opt["next"], records) + ".", ""]
                else:
                    for target in opt["next_by_state"]:
                        out += [f"If {condition_text(target['when'])}, continue to "
                                + reference(target["next"], records) + ".", ""]
    out += ["## Terminal states", "",
        "At each ending, show the result, the applicable ownership and pacing passages, "
        "then its immediate consequences. Keep the control state from the route. A shared ending title "
            "does not make the institutions identical.", "",
            "### Ownership passages", ""]
    for rule in data["ending_ownership"]:
        out += [f"**If {condition_text(rule['when'])}:** {rule['text']}", ""]
    out += ["### Additional passages", ""]
    for rule in data["ending_additions"]:
        out += [f"**If {condition_text(rule['when'])}:** {rule['text']}", ""]
    for ending in data["endings"]:
        out += [f'<a id="{ending["id"].lower()}"></a>', "",
                f"### {ending['id']} — {ending['title']}", "",
                ending["text"], "", "**What this means for your goals**", "", ending["epilogue"], ""]
    return "\n".join(out)


def render_map(data):
    records = {x["id"]: x for x in data["nodes"] + data["endings"]}
    out = [
        "# Five-level branch map", "",
        "[Read the script](script.md) · [Author notes](author-notes.md)", "",
        "Every run has five decisions. Branches can share a later scene, but they retain "
        "ownership, legal history, capability, pacing rules, and commitments.", "",
        "| Level | Scene count | The question changes |",
        "| --- | ---: | --- |",
        "| 1 | 1 | Respond to pacing with public acquisition, custody, or a negotiated deal? |",
        "| 2 | 3 | Accept binding tests, obey an injunction, or choose between company offers? |",
        "| 3 | 6 | Preserve review, impose a classified schedule, build a state lab, or keep a private alternative? |",
        "| 4 | 5 | Seek reciprocal Chinese checks, act with limited evidence, share capacity, rush a pilot, or obey the court? |",
        "| 5 | 7 | Accept inspection, verify a warning, halt a clash, share checkpoints, settle, or risk removal? |", "",
        "## Connections", "",
        "| Scene | A | B | C |", "| --- | --- | --- | --- |"
    ]
    for node in data["nodes"]:
        cells = []
        for opt in node["options"]:
            targets = [opt["next"]] if "next" in opt else [x["next"] for x in opt["next_by_state"]]
            cells.append(opt["label"] + "<br>→ " + " / ".join(
                reference(x, records, "script.md") for x in targets))
        cells += ["—"] * (3 - len(cells))
        out.append("| " + reference(node["id"], records, "script.md") + " | " + " | ".join(cells) + " |")
    out += ["", "## Four complete paths", "",
        "Each line lists five actions. These examples are authored outcomes, not likelihood rankings.", "",
        "1. **Public ownership and a truce:** Seek a law → accept compensated acquisition "
        "and binding tests → retain the teams and independent checkpoints → accept the limited pacing accord "
        "→ permit reciprocal inspections → **An armed truce**. Both domestic lab businesses stay public.", "",
        "2. **Public ownership and war:** Seek a law → accept full acquisition → replace the "
        "leaders and impose a classified schedule → authorize the limited operation → expand after "
        "retaliation → **A conventional war**. State ownership does not contain the other side's response.", "",
        "3. **The failed seizure:** Assert immediate custody → defy the injunction → continue "
        "the custody claim → reject the final ruling → contest impeachment while maintaining "
        "the order → **A failed seizure**. The authored Senate coalition convicts; Vance succeeds Trump.", "",
        "4. **A deal with limits:** Offer a deal → accept defined OpenAI rights → leave "
        "Anthropic independent → pool capacity → accept shared checkpoints "
        "→ **The allied system**. Neither lab becomes a wholly state-owned company.", "",
        "The two L5_WARNING outcomes after independent review depend on earlier capability choices. "
        "That state is retained at convergence; the graph does not choose it randomly.", ""
    ]
    return "\n".join(out)


if __name__ == "__main__":
    data = json.loads((ROOT / "branches.json").read_text(encoding="utf-8"))
    (ROOT / "script.md").write_text(render_script(data), encoding="utf-8")
    (ROOT / "BRANCH-MAP.md").write_text(render_map(data), encoding="utf-8")
    print("Rendered script.md and BRANCH-MAP.md.")
