import type { Evidence } from "./types.ts";

// Reviewed copies and source limits: wiki/characters/dario-amodei/README.md.
// These sources support the opening and dilemmas, not the invented outcomes.
export const darioEvidence = {
  spacex: {
    id: "DARIO-SPACEX-2026",
    title: "xAI joins SpaceX · 2 February 2026",
    url: "https://x.ai/news/xai-joins-spacex",
    context: "xAI confirms its acquisition by SpaceX.",
    limit:
      "This establishes the company relationship. Elon's dialogue and participation in shared reviews are fictional.",
  },
  meta: {
    id: "DARIO-META-2026",
    title: "Meta Enterprise Platform · 28 September 2026",
    url: "https://about.fb.com/news/2026/09/launching-meta-enterprise-platform/",
    context:
      "Meta identifies Mark Zuckerberg as founder and CEO and describes its model and agent business.",
    limit:
      "This establishes his role and the company's AI work. The negotiations and dialogue are fictional.",
  },
  deepmindLeadership: {
    id: "GDM-LEADERSHIP-2026",
    title: "Google: The next chapter of our AI momentum",
    url: "https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/",
    context:
      "Demis becomes DeepMind chair and Alphabet chief scientist. Koray leads DeepMind operations. Demis continues to lead Isomorphic Labs.",
    limit:
      "This supersedes the older CEO description. Demis's advice in the game does not itself bind DeepMind; negotiations and approvals are fictional.",
  },
  cast: {
    id: "CH-AI-062",
    title: "Anthropic leadership · checked 11 October 2026",
    url: "https://www.anthropic.com/company/leadership",
    context:
      "The company identifies the remits of Daniela Amodei, Jared Kaplan, Chris Olah, Jack Clark, Brian Israel, Tom Brown, and Krishna Rao.",
    limit:
      "An undated role page. The meetings, budgets, advice, and future employment in this route are invented. A job title does not establish a private view.",
  },
  alignment: {
    id: "CH-AI-064",
    title: "Jan Leike: Alignment is not solved · 22 January 2026",
    url: "https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable",
    context:
      "Leike sees a plausible path through automated alignment research, while identifying unresolved oversight problems.",
    limit:
      "His conditional assessment, not a proof of safety or a prediction of his response to the game's trial.",
  },
  character: {
    id: "CH-AI-066",
    title: "Claude's Constitution · January 2026",
    url: "https://www.anthropic.com/constitution",
    context:
      "The document sets behavior aims and credits Amanda Askell, Chris Olah, Jared Kaplan, and other contributors.",
    limit:
      "Intended behavior is not established behavior. Amanda's dialogue and every future model result are fiction.",
  },
  interpretability: {
    id: "CH-AI-052",
    title: "Chris Olah and Amanda Askell: Lex Fridman interview · November 2024",
    url: "https://lexfridman.com/dario-amodei-transcript/",
    context:
      "Olah explains the promise and limits of interpreting model features. Askell discusses shaping model behavior.",
    limit:
      "A public interview supports voice and subject matter. It does not document these private conversations.",
  },
  scaling: {
    id: "CH-AI-067",
    title: "Kaplan and coauthors: Scaling Laws for Neural Language Models · January 2020",
    url: "https://arxiv.org/abs/2001.08361",
    context:
      "The paper studies empirical relations among training resources and language-model loss.",
    limit:
      "Author list and abstract checked. The paper does not predict autonomous RSI or certify safety.",
  },
  incidents: {
    id: "CH-AI-060",
    title: "Anthropic: Investigating unintended model actions · 9 October 2026",
    url: "https://www.anthropic.com/news/investigating-unintended-model-actions",
    context:
      "Anthropic reported unintended actions found largely through retrospective review. It said impact was limited and suspended live internet access in all internal evaluations.",
    limit:
      "Company account. It does not report the new research trial or losses shown in this story.",
  },
  cyber: {
    id: "CH-AI-061",
    title: "Anthropic: Cyber Mission · 8 October 2026",
    url: "https://www.anthropic.com/news/anthropic-cyber-mission",
    context:
      "The company announced support for infrastructure defenders and open-source security. Finding a flaw and safely fixing a live system are separate tasks.",
    limit: "Company announcement. The later outages, deployments, and military crisis are fiction.",
  },
  pace: {
    id: "CH-AI-044",
    title: "Dario Amodei: We Must Pace the Frontier · September 2026",
    url: "https://darioamodei.com/post/we-must-pace-the-frontier",
    context:
      "Amodei called for capability growth to slow enough for safety work to keep up, committed Anthropic to embedded external evaluators, and proposed verified coordination. His support for further self-improvement is conditional.",
    limit:
      "The essay commits to evaluator access and independent reporting; it does not establish the binding stop power offered in this game. The implementation, veto rights, and later agreements are fictional.",
  },
  grace: {
    id: "CH-AI-006",
    title: "Dario Amodei: Machines of Loving Grace · October 2024",
    url: "https://darioamodei.com/essay/machines-of-loving-grace",
    context:
      "The essay describes possible gains in health, prosperity, and human agency. Experiments, production, and distribution still constrain delivery.",
    limit:
      "Conditional hopes, not trial results or a dated forecast. The treatments and benefits in the game are fictional.",
  },
  power: {
    id: "CH-AI-042",
    title: "Dario Amodei: The Adolescence of Technology · January 2026",
    url: "https://darioamodei.com/essay/the-adolescence-of-technology",
    context:
      "The essay discusses loss of control, misuse, authoritarian power, and economic disruption as distinct risks.",
    limit:
      "The route explores these mechanisms. It supplies no research-based probability of extinction, conquest, or democratic success.",
  },
  control: {
    id: "CH-AI-041",
    title: "Dario Amodei: The Urgency of Interpretability · April 2025",
    url: "https://darioamodei.com/post/the-urgency-of-interpretability",
    context:
      "Amodei calls for better ways to inspect model behavior and acknowledges that useful demonstrations fall short of reliable control tools.",
    limit:
      "Interpretability and passing tests do not prove safety. The successful control regimes are scenario assumptions.",
  },
  finance: {
    id: "CH-AI-051",
    title: "Dwarkesh Patel interviews Dario Amodei · 13 February 2026",
    url: "https://www.dwarkesh.com/p/dario-amodei-2",
    context:
      "Amodei discusses the financial risk of committing to compute before revenue arrives, including being wrong about timing.",
    limit:
      "His account is not an audit. The game's funding offers, obligations, and board votes are invented.",
  },
  defense: {
    id: "CH-AI-047",
    title: "Dario Amodei: Statement on the Department of War · 26 February 2026",
    url: "https://www.anthropic.com/news/statement-department-of-war",
    context:
      "Amodei supports democratic defense while stating limits on mass domestic surveillance and fully autonomous weapons under then-current conditions.",
    limit:
      "A public position, not a prediction of private conduct. The demands, laws, court actions, and war decisions here are fiction.",
  },
  china: {
    id: "CH-AI-007",
    title: "Dario Amodei: On DeepSeek and Export Controls · January 2025",
    url: "https://darioamodei.com/post/on-deepseek-and-export-controls",
    context:
      "Amodei argues for chip controls while distinguishing Chinese researchers and people from the Chinese government.",
    limit:
      "His strategic argument does not establish an inevitable winner. All transfers in this story assume explicit legal authorization.",
  },
  rsi: {
    id: "CH-AI-054",
    title: "Anthropic Institute: Recursive Self-Improvement · 4 June 2026",
    url: "https://www.anthropic.com/institute/recursive-self-improvement",
    context:
      "Marina Favaro and Jack Clark discuss increasing automation of AI research. This is an institutional account, not a personal essay by Dario.",
    limit:
      "It does not establish autonomous successor development as achieved at the story's opening. Later recursive self-improvement is invented.",
  },
} satisfies Record<string, Evidence>;
