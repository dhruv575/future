# Sprite library

The visual reference is the user-approved formal Dario Amodei sprite.
Use clear pixel edges, restrained colors, business suits, and calm standing poses.
The tone is serious. Use varied poses, arm positions, body angles, and suit colors.
Use the approved sprite for pixel treatment, not as a repeated body template.
Small briefing props and restrained gestures are allowed. Avoid combat poses and comic exaggeration.

## Files

- `plan.json`: one job for each distinct entity.
- `prompts/`: exact image prompts, including separate correction prompts where used.
- `prompt-overrides.json`: reviewed corrections retained when the plan is rebuilt.
- `generation/`: source output paths and tool records.
- `coverage.json`: generated file coverage and transparency checks.
- `../../apps/web/public/sprites/`: PNG assets and the public manifest.

The 193 research records resolve to 189 assets through four known aliases.

Nine Anthropic supporting portraits were added for Dario's route. Each uses a public identity reference and a distinct serious pose. The built-in image generator produced the PNGs. Exact prompts and reference paths are in [anthropic-cast-jobs.json](anthropic-cast-jobs.json). Generation records are in `generation/ai-e047.json` through `generation/ai-e055.json`.
The approved Dario image is reused.
Other images are generated with the built-in image tool.
Person images use Dario only as a visual style reference.
They are stylized likenesses for review, not verified portrait reproductions.

## Emblem classes

`brand` is a pixel interpretation of a brand mark.
`flag` is a pixel interpretation of a national or institutional flag.
`emblem` is a pixel interpretation of a public emblem.
`symbol` is an original game icon for an entity or capability.
Custom symbols are not official logos or insignia.

These assets are game art. They do not add evidence to the research corpus.
Use entity IDs to link art with the dated research records.

## Refresh the gallery catalog

```sh
python scripts/catalog-sprites.py
```

The script inspects PNG files without changing pixels.
It requires Pillow. It records dimensions, transparency, and missing files.
Do not treat a valid PNG as proof of a correct likeness or logo.
