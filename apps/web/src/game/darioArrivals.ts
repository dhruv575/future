import type { Line } from "./types.ts";

interface Arrival {
  title: string;
  location: string;
  lines: Line[];
}

function arrival(title: string, location: string, text: string): Arrival {
  return { title, location, lines: [{ speaker: "narrator", text }] };
}

// Each cut establishes where Dario is, what changed, and why the meeting is needed.
export const darioArrivals: Record<string, Arrival> = {
  D1_REVIEW: arrival(
    "Pacing the Frontier",
    "Anthropic lab · San Francisco",
    "You have announced Pacing the Frontier: slow AI capability growth so safety work can keep up. You have promised outside evaluators access to Anthropic. Now your team wants to expand Claude's role in building the next model. You must decide how to honor that commitment.",
  ),
  D2_DIRECTION: arrival(
    "One week later",
    "Anthropic office · San Francisco",
    "The trial report has reached the board. Dario calls a meeting about whether Anthropic should keep building stronger AI. He wants to consider continuing, pausing frontier training, and closing the company.",
  ),
  D3_FRONTIER: arrival(
    "Three weeks later",
    "Anthropic campus · San Francisco",
    "You chose to keep pursuing RSI. Talks with other labs and the US government now raise a different question: who should control the work if it succeeds? Dario meets Jack and Brian before choosing a commitment.",
  ),
  D3_CLOSE: arrival(
    "Three weeks later",
    "Anthropic office · San Francisco",
    "You asked the board to close Anthropic. Customers are moving to other services. Sam arrives to discuss hiring the safety team. Brian has two other plans for the records that the company will leave behind.",
  ),
  D3_CIVILIAN: arrival(
    "Three weeks later",
    "Anthropic campus · San Francisco",
    "You paused frontier training. A medical partnership is testing a possible treatment. A utility team is preparing talks on AI incidents. Both can continue. Dario meets Demis and Daniela to choose where he will take a direct role.",
  ),
  D4_SUCCESSOR: arrival(
    "Eight weeks later",
    "OpenAI office · San Francisco",
    "Anthropic is closed. You chose OpenAI to carry on the safety work. Brian and Sam have spent the winter drafting the handover. One issue remains: can the review team stop a run that OpenAI wants to start?",
  ),
  D5_SUCCESSOR: arrival(
    "Three months later",
    "OpenAI lab · San Francisco",
    "The team and records have moved to OpenAI under your agreement. Its spring tests report faster model development. One result cannot be repeated. Sam asks Dario, now an adviser, whether the next run should wait.",
  ),
  D4_COMPACT: arrival(
    "Eight weeks later",
    "US–China talks · Geneva",
    "Anthropic is closed. Its files remain with the foundation you chose. Both governments now support talks on a joint lab. Rubio asks Dario to help settle the inspection rules before any model files change hands.",
  ),
  D5_COMPACT: arrival(
    "Three months later",
    "US–China talks · Geneva",
    "The joint lab has staff and a proposed training limit. Inspectors have requested access to sites in both countries. Two military sites remain closed. Rubio calls Dario back before the planned handover of Anthropic's files.",
  ),
  D4_LIQUIDATION: arrival(
    "Eight weeks later",
    "Dario's office · San Francisco",
    "Anthropic is closed. You chose no successor. Former staff ask you to help create an independent review team. Sam visits Dario to discuss whether he should stay involved in AI oversight after leaving the race.",
  ),
  D5_LIQUIDATION: arrival(
    "Three months later",
    "Dario's office · San Francisco",
    "Dario has left company management. The US and China now seek his public support for a pause in large training runs. Sam asks him to help review OpenAI's next model instead. Both requests need an answer.",
  ),
  D4_INDEPENDENT: arrival(
    "Eight weeks later",
    "Anthropic lab · San Francisco",
    "You kept AI research independent. Over the winter, Claude proposed new training methods and rewrote the evaluations used to measure them. Some claimed gains now look doubtful. The researchers meet before the next run.",
  ),
  D5_INDEPENDENT: arrival(
    "Three months later",
    "Anthropic lab · San Francisco",
    "The team has used your evaluation rules through the spring. It now wants each model to run experiments for its successor. Brian also has terms for moving the research into a public lab. Both proposals need a decision.",
  ),
  D4_COALITION: arrival(
    "Eight weeks later",
    "Three-lab meeting · San Francisco",
    "You chose shared research with OpenAI, DeepMind, Meta, and SpaceX's AI team. Elon and Mark join the talks on testing and inspection rights. Demis advises as DeepMind's chair; Koray and DeepMind's leadership must approve its terms.",
  ),
  D5_COALITION: arrival(
    "Three months later",
    "Three-lab meeting · San Francisco",
    "The failed March test is still disputed. Anthropic's team wants to resume work without repeating it. Demis, Elon, and Mark return to the talks. Dario must decide whether to release the records or ask the labs for an exception.",
  ),
  D4_STATE: arrival(
    "Eight weeks later",
    "Oval Office · Washington",
    "You chose to make national defense a core mission. Brian has spent the winter negotiating the partnership. The draft allows uses beyond cyber defense. Trump invites Dario to the White House to settle those limits before the contract is signed.",
  ),
  D5_STATE: arrival(
    "Three months later",
    "Situation Room · Washington",
    "The March outage remains unexplained. A second port outage has raised fears of an attack. Anthropic's federal team has issued a new report. General Caine calls Dario into the briefing to assess its claim against China.",
  ),
  D4_MEDICINE: arrival(
    "Eight weeks later",
    "Anthropic lab · San Francisco",
    "You chose to lead the medical partnership. A second lab has repeated its early result. The partners prepare safety studies while Jared argues for stronger research models. Dario must decide who can reverse his pause on frontier training.",
  ),
  D5_MEDICINE: arrival(
    "Three months later",
    "Anthropic office · San Francisco",
    "The first safety study is complete. The medical partners prepare a human trial. Jared now asks to restart frontier training alongside that work. Dario returns to the choice that brought him here: pursue stronger models or keep the pause.",
  ),
  D4_DIPLOMACY: arrival(
    "Eight weeks later",
    "Incident talks · Geneva",
    "You chose to lead talks on AI incidents. The utility team has found signs of an intrusion. Its model points to China, but analysts cannot confirm that. Rubio meets Dario to decide who should see the evidence.",
  ),
  D5_DIPLOMACY: arrival(
    "Three months later",
    "Situation Room · Washington",
    "The March outage led to military alerts, then months of talks. A second port outage has raised the alarm again. US advisers cite Anthropic's earlier report to support a strike. General Caine asks Dario to review that claim.",
  ),
};
