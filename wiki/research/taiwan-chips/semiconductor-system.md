# The semiconductor system

AI hardware is a production network. Model each stage before modeling a national cutoff.

| Stage | Relevant actors in this module | Variable to track |
| --- | --- | --- |
| Design and customer software | NVIDIA; AMD | Qualified product designs and usable software |
| Wafer fabrication | TSMC; Samsung | Output by process and qualified product |
| Memory | SK hynix; Samsung; Micron | Compatible memory supply |
| Packaging | TSMC and partners | Qualified packaging capacity |
| Tools | ASML; Tokyo Electron; Applied Materials | Installed and usable tools |
| Tool inputs and support | Carl Zeiss SMT; service providers | Parts, support and specialist inputs |
| Rule enforcement | BIS; Dutch authority; METI; Taiwan agencies | Item-specific lawful access |
| Overseas manufacturing | Arizona; JASM; ESMC | Actual output, local rules and remaining imports |

This is a structural map. It does not assert exclusive suppliers in every row. [CSET taxonomy](https://cset.georgetown.edu/publication/the-semiconductor-supply-chain/), [NVIDIA supplier disclosure](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm), [Tokyo Electron scope](https://www.tel.com/sustainability/customer/value/), [Applied Materials filing](https://investors.appliedmaterials.com/node/28666/html).

## Connections matter

SK hynix's agreement with TSMC links memory, logic base dies and packaging. Thus a memory supplier outside Taiwan can still have a Taiwan-related dependency. [TW-C024; SK hynix](https://news.skhynix.com/en/sk-hynix-partners-with-tsmc-to-strengthen-hbm-technological-leadership/).

Samsung is a real alternative producer in parts of the system. Its reported production does not prove immediate compatibility with every displaced TSMC design. Treat substitution as a process with time, qualification and capacity requirements. [TW-C025; Samsung](https://news.samsungsemiconductor.com/global/samsung-electronics-announces-fourth-quarter-and-fy-2025-results/).

These distinctions prevent two errors: treating TSMC as the whole chip system, and treating every non-TSMC supplier as a ready substitute.

## Overseas facilities differ

| Site | Supported baseline | Limit |
| --- | --- | --- |
| Arizona | First fab has reported 4 nm volume output. | Future expansion has no single fixed schedule. |
| JASM | TSMC-majority venture; first-fab output reported. | Original plans and later technology scope differ. |
| ESMC | Joint venture with a specified automotive and industrial process mix. | Do not count all planned wafers as frontier AI capacity. |

Sources: [TSMC annual report](https://investor.tsmc.com/static/annualReports/2025/english/index.html), [JASM announcement](https://pr.tsmc.com/english/news/3105), [ESMC announcement](https://pr.tsmc.com/english/news/3049), [July 2026 transcript](https://investor.tsmc.com/english/encrypt/files/encrypt_file/reports/2026-08/3e494f0c14dd0890f897aa044415e21d93486cc4/TSMC%202Q26%20Transcript.pdf).

## Candidate state variables

These variables are analysis for later game design:

- Installed compute stock.
- New qualified accelerator deliveries.
- Memory and packaging availability.
- Operational production capacity by location.
- Customer access and legal permission.
- Spare parts and service access.
- Shipment reliability.
- Recovery time and available substitutes.
- Confidence in public commitments.

Do not sum these into a single chip-power score until the units and causal links are justified.

## Capture is not continuity

Mark Liu warned in 2022 that force would disrupt TSMC's outside connections. Record this as his warning. It does not prove a remote disable switch, a secret destruction plan, or a fixed shutdown time. [TW-C042; CNN transcript](https://transcripts.cnn.com/show/cnr/date/2022-08-16/segment/17).

The game should distinguish control of territory from control of productive output. It should also allow costly partial recovery, lawful continuity arrangements and prolonged shared loss.
