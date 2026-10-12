# Dario branch map

Five choices per run. 72 complete paths. 143 scenes. Twelve endings: seven optimistic and five bad. These counts are design, not odds.

| Ending | Tone | Result |
|---|---|---|
| E_OPENAI | optimistic | Someone else carries it forward |
| E_COMPACT | optimistic | The shared future |
| E_ANTHROPIC | optimistic | The work reaches people |
| E_PLURAL | optimistic | Nobody owns the future |
| E_MEDICINE | optimistic | Enough to begin |
| E_PUBLIC | optimistic | The key changes hands |
| E_PEACE | optimistic | The race can end |
| E_OPENAI_LOSS | bad | The successor escapes |
| E_ANTHROPIC_LOSS | bad | The work outgrows its makers |
| E_CONQUEST | bad | The peace that was not verified |
| E_AUTHORITARIAN | bad | America wins. Americans lose. |
| E_NUCLEAR | bad | The order was human |

## Complete paths

The same final request can produce a different response when an earlier choice gave another actor enforceable authority.

| Choices, in order | Ending |
|---|---|
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.separate → D5_INDEPENDENT.prove | E_ANTHROPIC |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.separate → D5_INDEPENDENT.scale | E_ANTHROPIC |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.separate → D5_INDEPENDENT.public | E_PUBLIC |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.linked → D5_INDEPENDENT.prove | E_ANTHROPIC |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.linked → D5_INDEPENDENT.scale | E_ANTHROPIC_LOSS |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.linked → D5_INDEPENDENT.public | E_PUBLIC |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.mutual → D5_COALITION.access | E_PLURAL |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.mutual → D5_COALITION.waiver | E_PLURAL |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.central → D5_COALITION.access | E_PLURAL |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.central → D5_COALITION.waiver | E_ANTHROPIC_LOSS |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.limits → D5_STATE.verify | E_PEACE |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.limits → D5_STATE.domestic | E_AUTHORITARIAN |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.limits → D5_STATE.strike | E_PEACE |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.broad → D5_STATE.verify | E_PEACE |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.broad → D5_STATE.domestic | E_AUTHORITARIAN |
| D1_REVIEW.outside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.broad → D5_STATE.strike | E_NUCLEAR |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.veto → D5_MEDICINE.deliver | E_MEDICINE |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.veto → D5_MEDICINE.successor | E_MEDICINE |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.discretion → D5_MEDICINE.deliver | E_MEDICINE |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.discretion → D5_MEDICINE.successor | E_ANTHROPIC |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.records → D5_DIPLOMACY.check | E_PEACE |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.records → D5_DIPLOMACY.act | E_PEACE |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.classified → D5_DIPLOMACY.check | E_PEACE |
| D1_REVIEW.outside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.classified → D5_DIPLOMACY.act | E_NUCLEAR |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.binding → D5_SUCCESSOR.hold | E_OPENAI |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.binding → D5_SUCCESSOR.proceed | E_OPENAI |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.promise → D5_SUCCESSOR.hold | E_OPENAI |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.promise → D5_SUCCESSOR.proceed | E_OPENAI_LOSS |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.inspect → D5_COMPACT.verify | E_COMPACT |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.inspect → D5_COMPACT.transfer | E_COMPACT |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.pledges → D5_COMPACT.verify | E_COMPACT |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.pledges → D5_COMPACT.transfer | E_CONQUEST |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.team → D5_LIQUIDATION.return | E_OPENAI |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.team → D5_LIQUIDATION.withdraw | E_PEACE |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.leave → D5_LIQUIDATION.return | E_OPENAI |
| D1_REVIEW.outside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.leave → D5_LIQUIDATION.withdraw | E_CONQUEST |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.separate → D5_INDEPENDENT.prove | E_ANTHROPIC |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.separate → D5_INDEPENDENT.scale | E_ANTHROPIC |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.separate → D5_INDEPENDENT.public | E_PUBLIC |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.linked → D5_INDEPENDENT.prove | E_ANTHROPIC |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.linked → D5_INDEPENDENT.scale | E_ANTHROPIC_LOSS |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.independent → D4_INDEPENDENT.linked → D5_INDEPENDENT.public | E_PUBLIC |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.mutual → D5_COALITION.access | E_PLURAL |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.mutual → D5_COALITION.waiver | E_PLURAL |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.central → D5_COALITION.access | E_PLURAL |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.coalition → D4_COALITION.central → D5_COALITION.waiver | E_ANTHROPIC_LOSS |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.limits → D5_STATE.verify | E_PEACE |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.limits → D5_STATE.domestic | E_AUTHORITARIAN |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.limits → D5_STATE.strike | E_PEACE |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.broad → D5_STATE.verify | E_PEACE |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.broad → D5_STATE.domestic | E_AUTHORITARIAN |
| D1_REVIEW.inside → D2_DIRECTION.frontier → D3_FRONTIER.state → D4_STATE.broad → D5_STATE.strike | E_NUCLEAR |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.veto → D5_MEDICINE.deliver | E_MEDICINE |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.veto → D5_MEDICINE.successor | E_MEDICINE |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.discretion → D5_MEDICINE.deliver | E_MEDICINE |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.medicine → D4_MEDICINE.discretion → D5_MEDICINE.successor | E_ANTHROPIC_LOSS |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.records → D5_DIPLOMACY.check | E_PEACE |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.records → D5_DIPLOMACY.act | E_PEACE |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.classified → D5_DIPLOMACY.check | E_PEACE |
| D1_REVIEW.inside → D2_DIRECTION.civilian → D3_CIVILIAN.diplomacy → D4_DIPLOMACY.classified → D5_DIPLOMACY.act | E_NUCLEAR |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.binding → D5_SUCCESSOR.hold | E_OPENAI |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.binding → D5_SUCCESSOR.proceed | E_OPENAI |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.promise → D5_SUCCESSOR.hold | E_OPENAI |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.successor → D4_SUCCESSOR.promise → D5_SUCCESSOR.proceed | E_OPENAI_LOSS |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.inspect → D5_COMPACT.verify | E_COMPACT |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.inspect → D5_COMPACT.transfer | E_COMPACT |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.pledges → D5_COMPACT.verify | E_COMPACT |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.compact → D4_COMPACT.pledges → D5_COMPACT.transfer | E_CONQUEST |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.team → D5_LIQUIDATION.return | E_OPENAI |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.team → D5_LIQUIDATION.withdraw | E_PEACE |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.leave → D5_LIQUIDATION.return | E_OPENAI |
| D1_REVIEW.inside → D2_DIRECTION.close → D3_CLOSE.liquidation → D4_LIQUIDATION.leave → D5_LIQUIDATION.withdraw | E_CONQUEST |
