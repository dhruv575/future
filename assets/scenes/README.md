# Scene backgrounds

Donald has [nine dedicated ending splashes](trump-endings.md), with exact prompts and source records. They use the same pixel-art treatment as Dario's endings.

Sixteen backgrounds and event stills are available. Nine settings give Trump's route distinct locations and remote-call cutaways. Two event stills support Dario's journey. The original five remain available to Sam's route.

Two additional scene plates support text within the environment: [report-desk.png](../../apps/web/public/scenes/report-desk.png) and [briefing-screen.png](../../apps/web/public/scenes/briefing-screen.png). The built-in image tool generated them as opaque pixel art. Their exact prompts are [report-desk.prompt.txt](report-desk.prompt.txt) and [briefing-screen.prompt.txt](briefing-screen.prompt.txt). The original PNGs were copied without image processing. Live HTML text sits inside the blank paper or display. News also places the existing scene image inside the monitor. Text can reflow and scroll within the physical surface on small screens.

| File | Setting |
| --- | --- |
| `office.png` | A fictional San Francisco company boardroom at night. |
| `washington.png` | A fictional federal briefing room. |
| `datacenter.png` | An operations room with server racks. |
| `taipei.png` | A Taipei conference room at dawn. |
| `summit.png` | A neutral conference room near Lake Geneva. |
| `oval-office.png` | A fictionalized Oval Office in warm afternoon light. |
| `cabinet-room.png` | A White House meeting room at dusk. |
| `capitol-hearing.png` | An empty congressional committee room. |
| `court-corridor.png` | A quiet marble corridor outside a federal courtroom. |
| `ai-campus.png` | A modern AI company meeting space overlooking San Francisco. |
| `evaluation-lab.png` | A model evaluation room behind a server-room partition. |
| `situation-room.png` | A secure briefing room with a Pacific map wall. |
| `beijing-briefing.png` | A formal Beijing government briefing room. |
| `taiwan-harbor.png` | A port operations room overlooking a Taiwan container harbor. |
| `hospital-care.png` | A patient and nurse during routine treatment in a public clinic. |
| `missile-launch.png` | A distant missile rises above a fictional coastal launch site at night. |

Final PNG files are in [`apps/web/public/scenes`](../../apps/web/public/scenes).
Each `.prompt.txt` file in this folder contains the exact prompt.
Each matching `.json` file records the source image and destination.

The images were generated with the built-in image tool. They have opaque backgrounds. Meeting locations contain no characters; the app layers existing transparent character sprites over them. The hospital still includes a patient and nurse. It has no character overlay. All scenes depict fictional environments, not evidence about real facilities.

All images were visually checked. Their canonical copies match the original generated files. The game applies `image-rendering: pixelated` to the backgrounds and sprites. Furniture stays behind the character stage, with location cues in the upper center for mobile crops.

The additions were generated with nine separate built-in image calls, with up to three calls in progress at once. Exact prompts and source records are stored beside this file. The original outputs were copied without image processing.

Trump's scene assignments are explicit in `apps/web/src/game/trumpJourney.ts`. Reactions can use a separate setting. During calls, Xi, Lai, Wei, and Jensen appear in their own location; the view returns to the US room when a US official speaks. This art update changes no dialogue, choices, outcomes, or save version.

Dario's two new stills were generated concurrently with separate built-in image calls, visually reviewed, and copied unchanged into the public scene folder. They appear in the treatment and nuclear escalation sequences. Their exact prompts are [hospital-care.prompt.txt](hospital-care.prompt.txt) and [missile-launch.prompt.txt](missile-launch.prompt.txt); matching JSON files record their source paths. The backgrounds use `image-rendering: pixelated` and cover the viewport. This preserves the existing responsive presentation, rather than claiming exact integer scaling at every window size.

Dario now has [twelve dedicated ending backgrounds](endings.md). Each final scene has its own art and exact prompt.
