# Game design

Donald Trump and Dario Amodei are the two playable characters, in that order. The other eight cards are locked. Sam's playable story and earlier manuscript have been removed. He remains a supporting character, with his research profile and portrait.

[Super Intelligence](narrative/trump-the-national-asset/script.md) has five decisions per run, 48 complete paths, and nine endings. Donald wants to keep China from taking the AI lead, bring prosperity to America, and control AI's direction and use.

[Dario's journey](narrative/dario-the-next-generation/author-notes.md) has five decisions per run, 72 paths, and twelve endings. His choices concern beneficial AI, loss of control, and authoritarian power.

Each scene follows the prior choice. Documents and broadcasts appear on physical scene surfaces. Final screens place concrete outcomes over distinct pixel-art backgrounds. Dialogue includes affiliation logos; the speaker is highlighted and right-hand portraits are mirrored. There is no score overlay.

Routes are registered in apps/web/src/game/journeys.ts. Donald is the default. Each playable character has a separate saved run. Old or removed routes cannot load. Current story versions are Donald v3 and Dario v3. Internal scores are design values, not probabilities, and do not select their endings.

The [research wiki](../wiki/README.md) separates sourced facts from scenario assumptions. Dialogue and future events are fiction. Sam's research remains available for his supporting role.
