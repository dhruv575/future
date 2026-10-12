# What model war games can show

These studies test systems under specified conditions.
They do not sample future wars from a known distribution.

| Study | Evidence | Main result | Limit for this game |
| --- | --- | --- | --- |
| [Rivera et al., 2024](https://arxiv.org/html/2401.03408v1) | Five model types in structured simulations. | Escalation appeared across the tested systems. | Rules, prompts, model versions, and scoring affect the result. |
| [Lamparth et al., 2024](https://arxiv.org/html/2403.03407v4) | Human expert responses compared with model responses. | Models differed from humans in important strategic behavior. | A simulated persona cannot establish an actual person's likely action. |
| [Elbaum and Panter, 2025](https://arxiv.org/html/2508.01056v2) | One Mistral model with changed prompts and temperature. | Interventions reduced escalation in that setup. | The result does not establish broad safety across models or tasks. |
| [Payne, 2026](https://arxiv.org/html/2602.14740v1) | Three models in 21 nuclear-crisis games. | The systems showed coercion, deception, and nuclear escalation. | The small game set does not establish robust event probabilities. |

## Design decisions

These are recommendations for this project.

Use the studies to identify behaviors to test.
Do not copy a model's action rate into a real-world probability.
Record the model version and prompt if a later game uses an LLM.
Keep a rule-based resolution layer separate from generated dialogue.
Show players which facts support each available choice.

Compare at least these versions:

1. Humans choose all state actions.
2. An AI suggests options. Humans choose actions.
3. An agent can act within a narrow mandate.
4. A failed control system acts outside that mandate.

These are different causal models.
An extreme result in version 4 does not establish the risk in version 2.

## Avoid circular evidence

Do not prompt a model to expect war, run the game, and use the resulting war as proof.
Do not make escalation the only route that changes the story.
Do not assign a real person a hidden aggression score without evidence.

Test whether peaceful outcomes remain possible under adverse initial conditions.
Test whether bad outcomes remain possible despite competent choices.
This prevents the game from making every result depend on one hero or one error.

[Research index](README.md).
