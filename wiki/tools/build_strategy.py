"""Build the strategy research records from reviewed source notes."""
import json
from pathlib import Path

WIKI = Path(__file__).resolve().parents[1]
PART = WIKI / 'data' / 'parts' / 'strategy'
OUT = WIKI / 'research' / 'strategy'
PART.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

# The final fields are a narrow takeaway and the main limit.
ROWS = [
('Escalation Risks from Language Models in Military and Diplomatic Decision-Making','https://arxiv.org/html/2401.03408v1','Rivera et al.; ACM FAccT','2024-01-07','research_paper','full_text','Abstract and experimental design','The five tested models showed escalation patterns in a structured war game.','This is model behavior under fixed rules. It is not an interstate conflict forecast.'),
('Human vs. Machine: Behavioral Differences Between Expert Humans and Language Models in Wargame Simulations','https://arxiv.org/html/2403.03407v4','Lamparth et al.','2024-10-03','research_paper','full_text','Abstract and discussion','The study compared model responses with 214 national security experts and found important behavioral differences.','The fictional crisis and tested model versions limit generalization. Language models are not validated substitutes for actual leaders.'),
('Managing Escalation in Off-the-Shelf Large Language Models','https://arxiv.org/html/2508.01056v2','Elbaum and Panter','2025-08-05','preprint','full_text','Sections 3 and 4','Prompt and temperature changes reduced escalation in the tested Mistral model.','The study used one model and a restricted action set. Lower game escalation does not prove safe deployment.'),
('AI Arms and Influence: Frontier Models Exhibit Sophisticated Reasoning in Simulated Nuclear Crises','https://arxiv.org/html/2602.14740v1','Kenneth Payne','2026-02-16','preprint','full_text','Abstract and section 4.3','Three models showed escalation and deception in simulated nuclear crises.','Only 21 games were run. The result does not estimate how often states will use nuclear weapons.'),
('Incentives for U.S.-China Conflict, Competition, and Cooperation Across Artificial General Intelligence’s Five Hard National Security Problems','https://www.rand.org/pubs/perspectives/PEA4189-1.html','Michael S. Chase and William Marcellino; RAND','2025-08-04','policy_analysis','full_text','Main argument and table 1','The authors identify both competitive and cooperative incentives in advanced AI development.','This is a policy argument. Claims about future capabilities remain conditional.'),
('How Artificial General Intelligence Could Affect the Rise and Fall of Nations','https://www.rand.org/pubs/research_reports/RRA3034-2.html','Barry Pavel et al.; RAND','2025-07-02','scenario_research','full_text','Methods and scenario assumptions','The report uses assumption-based planning to explore different geopolitical futures.','The scenarios assume transformative AGI. They do not establish its arrival date or assign conflict probabilities.'),
('Artificial General Intelligence’s Five Hard National Security Problems','https://www.rand.org/pubs/perspectives/PEA3691-4.html','Jim Mitre and Joel B. Predd; RAND','2025','policy_analysis','full_text','Five problem categories','The framework covers novel capabilities, shifts in power, misuse, autonomous agency, and instability.','These are categories for planning. They are not a tested forecast model.'),
('Averting AI Armageddon','https://www.cnas.org/publications/reports/averting-ai-armageddon','Jacob Stokes et al.; CNAS','2025-02-13','policy_research','partial','Executive summary','The report separates AI effects on nuclear command, the strategic balance, and conventional–nuclear entanglement.','The reviewed HTML contains the executive summary. It does not establish that any specific AI system controls launch authority.'),
('Escalation Through Entanglement','https://carnegieendowment.org/china/posts/2018/12/escalation-through-entanglement-how-the-vulnerability-of-command-and-control-systems-raises-the-risks-of-an-inadvertent-nuclear-war','James M. Acton; International Security / Carnegie','2018-08-08','research_paper','abstract','Author-hosted abstract','Shared nuclear and conventional command functions can cause an attack to be misread.','The mechanism predates current generative AI. This corpus uses it as a causal analogy, not a measured AI effect.'),
('Reducing the Risks of Artificial Intelligence for Military Decision Advantage','https://cset.georgetown.edu/publication/reducing-the-risks-of-artificial-intelligence-for-military-decision-advantage/','Wyatt Hoffman and Heeu Millie Kim; CSET','2023-03','policy_research','partial','Executive summary','AI errors can interact with human and strategic pressures in a crisis.','The report identifies mechanisms and safeguards. It does not measure a universal escalation rate.'),
('China’s Military AI Roadblocks','https://cset.georgetown.edu/publication/chinas-military-ai-roadblocks/','Sam Bresnick; CSET','2024-06','literature_review','partial','Executive summary and key findings','The study reviewed 59 Chinese-language articles from 2020–2022 and found concerns about reliability and integration.','The sample is not official PLA doctrine or a current audit of deployed capability.'),
('Could AI Lead to the Escalation of Conflict? PRC Scholars Think So','https://www.lawfaremedia.org/article/could-ai-lead-to-the-escalation-of-conflict--prc-scholars-think-so','Sam Bresnick; Lawfare','2024-09-20','expert_blog','full_text','Chinese literature review and qualifications','Bresnick reports that some Chinese defense scholars fear AI could reduce crisis control.','This overlaps with the CSET research sample. It is not independent confirmation or a statement of state intent.'),
('AI 2027','https://ai-2027.com/','Daniel Kokotajlo, Scott Alexander, Thomas Larsen, Eli Lifland, Romeo Dean','2025-04-03','scenario_blog','full_text','Introduction, method, and November 2025 clarification','The authors present a detailed fast-AI scenario with race and slowdown endings.','The firms are fictional. The authors distinguish a modal year from a median. The story is not a probability distribution.'),
('Situational Awareness: The Decade Ahead','https://situational-awareness.ai/','Leopold Aschenbrenner','2024-06','author_essay','full_text','Introduction and contents','Aschenbrenner argues that AGI by 2027 is plausible and that state competition could intensify.','This is an individual forecast and strategic argument. Trend extrapolation is not proof of an intelligence explosion.'),
('Thousands of AI Authors on the Future of AI','https://arxiv.org/abs/2401.02843','Katja Grace et al.','2024-01-05','expert_survey','abstract','Abstract','The survey of 2,778 researchers reports an aggregate 10% forecast for all-task human-level performance by 2027.','The definition is demanding and differs from other AGI definitions. Respondent beliefs are not calibrated war probabilities.'),
('Energy and AI: Executive Summary','https://www.iea.org/reports/energy-and-ai/executive-summary','International Energy Agency','2025-04-10','scenario_projection','full_text','Demand outlook and sensitivity cases','The 2025 base case projects about 945 TWh of data-center electricity demand in 2030 and 1,200 TWh in 2035.','These figures cover all data centers. The 2035 cases span 700–1,700 TWh. They are not a forecast of AI compute alone.'),
('A Path Forward on AI Safety for the United States and China','https://carnegieendowment.org/emissary/2026/07/ai-safety-parallel-us-china','Matt Sheehan; Carnegie','2026-07-23','expert_blog','full_text','AI safety in parallel proposal','Sheehan proposes domestic safety work and limited dialogue even without binding bilateral agreement.','This is a proposal by the author. It is not an agreed treaty or proof that dialogue will succeed.'),
('Can AGI Rivals Hold Back?','https://www.rand.org/pubs/research_reports/RRA5163-1.html','Tobias Sytsma and Alvin Moon; RAND','2026-09-30','formal_model','partial','Key takeaways and methodology','The model links credible restraint to domestic oversight, detection, and beliefs about time to AGI.','The reviewed page summarizes a stylized two-stage model. Its equilibrium conditions are not empirical event frequencies.'),
('Infinite Potential: Insights on AI Loss of Control Across Five Scenarios','https://www.rand.org/pubs/research_reports/RRA4767-3.html','Pauline Moore et al.; RAND','2026-10-05','tabletop_research','partial','Summary, key takeaways, and recommendations','The report draws lessons from 26 exercises held from June 2025 to February 2026.','The lessons reflect participant responses to assumed crises. They do not establish the chance of loss of control.'),
('Exploring Instability Risks in the U.S.-China AI Rivalry: Breakwater','https://www.rand.org/pubs/perspectives/PEA4703-1.html','Abby Doll and Karl P. Mueller; RAND','2026-04-29','tabletop_research','partial','Game overview on publication page','Breakwater studies how beliefs about AI progress could encourage preventive action.','The accessible summary describes early observations and hypotheses. It supplies no calibrated conflict rate.'),
('The AGI Rideout Strategy','https://www.rand.org/pubs/perspectives/PEA4347-1.html','David R. Frelinger and Karl P. Mueller; RAND','2026-04-27','policy_analysis','partial','Publication summary','The authors propose resilience and deterrence to preserve options during an uncertain AI transition.','The summary is a policy case, not evidence that this strategy has succeeded.'),
('Contingency Frameworks for Future U.S.-China Cooperation on AI Assurance and Security','https://www.rand.org/pubs/perspectives/PEA4825-1.html','Jared Mondschein; RAND','2026-05-04','policy_analysis','partial','Publication summary','The author argues for preparation that keeps future cooperation possible.','The summary does not establish current agreement or near-term political feasibility.'),
('Superintelligence Strategy: Expert Version','https://arxiv.org/abs/2503.05628','Dan Hendrycks, Eric Schmidt, Alexandr Wang','2025-04-14','policy_preprint','abstract','Abstract','The authors propose a framework of deterrence, nonproliferation, and competitiveness for advanced AI.','Their proposed AI deterrence concept is contested analysis. It is not official doctrine or established strategic stability.'),
]
sources=[]
claims=[]
for n,row in enumerate(ROWS,1):
    title,url,publisher,date,kind,access,locator,takeaway,limit=row
    sid=f'ST-S{n:03d}'
    sources.append(dict(id=sid,title=title,url=url,publisher=publisher,published_date=date,accessed_date='2026-10-10',source_type=kind,access=access,locator=locator,notes=limit))
    claims.append(dict(id=f'ST-C{n:03d}',text=takeaway,claim_type='reported_claim',source_ids=[sid],as_of=date,confidence='high',notes=limit))

predrows=[
(13,'A fast-AI future can branch into a continued race or a slowdown.','2025-04-03','2027–2035',None,'Rapid progress and effective AI research automation.','scenario'),
(14,'AGI by 2027 is plausible under the author’s extrapolation.','2024-06','2027',None,'Continued compute, algorithm, and agent gains.','forecast'),
(15,'Aggregate survey forecast: unaided machines outperform humans in every possible task by 2027.','2024-01-05','2027',0.10,'Science continues without disruption. Use the survey’s outcome definition.','forecast'),
(16,'Global data-center electricity demand reaches about 1,200 TWh in the 2035 base case.','2025-04-10','2035',None,'IEA base-case assumptions for adoption, efficiency, and infrastructure.','conditional_result'),
(18,'Credible mutual restraint depends on oversight and detectable defection in the authors’ model.','2026-09-30','No fixed calendar horizon',None,'Repeated strategic interaction and the model’s incentive assumptions.','conditional_result'),
(20,'Belief in a decisive rival AI lead can create pressure for preventive action.','2026-04-29','No fixed calendar horizon',None,'Leaders perceive a threatened strategic position and believe action can help.','warning'),
(5,'Common AI risks can create incentives for cooperation despite strategic rivalry.','2025-08-04','No fixed calendar horizon',None,'Shared risks become salient and usable channels exist.','warning'),
(10,'AI failure can worsen a crisis through its interaction with human judgment.','2023-03','No fixed calendar horizon',None,'Decision processes rely on a faulty system under crisis pressure.','warning'),
]
predictions=[]
for n,(s,text,date,horizon,p,conditions,kind) in enumerate(predrows,1):
    predictions.append(dict(id=f'ST-P{n:03d}',statement=text,source_ids=[f'ST-S{s:03d}'],issued_date=date,horizon=horizon,probability=p,conditions=conditions,caveats=ROWS[s-1][-1],type=kind))

people=[
('Jacquelyn Schneider',2,'Coauthor of the human–model war game study.','Can publish evidence and advise on game design.'),
('Max Lamparth',2,'Coauthor of the human–model war game study.','Can study model behavior and explain test limits.'),
('Kenneth Payne',4,'Author of the simulated nuclear-crisis study.','Can propose and test strategic simulation methods.'),
('Sam Bresnick',11,'Author of research on Chinese military AI literature.','Can assess public Chinese sources and challenge capability claims.'),
('James M. Acton',9,'Author of research on nuclear–conventional entanglement.','Can advise on strategic risk and interpret public doctrine.'),
('Daniel Kokotajlo',13,'Coauthor of AI 2027.','Can publish scenarios and change public forecasts.'),
('Eli Lifland',13,'Coauthor of AI 2027.','Can publish forecasts and review their calibration.'),
('Leopold Aschenbrenner',14,'Author of Situational Awareness.','Can publish strategic arguments and influence debate.'),
('Matt Sheehan',17,'Author of the AI safety in parallel proposal.','Can propose dialogue and explain Chinese AI governance.'),
('Katja Grace',15,'Coauthor of the AI researcher survey.','Can collect expert forecasts and test question framing.'),
('Dan Hendrycks',23,'Coauthor of Superintelligence Strategy.','Can propose AI governance and deterrence concepts.'),
('Eric Schmidt',23,'Coauthor of Superintelligence Strategy.','Can advocate policy and influence the technology debate.'),
('Alexandr Wang',23,'Coauthor of Superintelligence Strategy.','Can advocate policy. Any corporate authority requires a separate dated role.'),
('Tobias Sytsma',18,'Coauthor of the formal model of AI restraint.','Can assess conditions for cooperation in the model.'),
('Alvin Moon',18,'Coauthor of the formal model of AI restraint.','Can assess verification and strategic incentives.'),
('Abby Doll',20,'Coauthor of the Breakwater game overview.','Can develop and interpret crisis exercises.'),
('Karl P. Mueller',21,'Coauthor of the AGI Rideout strategy.','Can assess high-level strategic options and resilience.'),
]
entities=[]
for n,(name,s,summary,authority) in enumerate(people,1):
    path=f'research/strategy/actors/st-e{n:03d}.md'
    entities.append(dict(id=f'ST-E{n:03d}',name=name,kind='person',summary=summary,jurisdiction='Public research and policy debate',as_of=ROWS[s-1][3],source_ids=[f'ST-S{s:03d}'],roles=[summary],authority=[authority],constraints=['Research influence is not state command authority.','This record establishes authorship at the source date. It does not verify a current job.'],incentives=['Model assumption: accurate analysis and influence on public decisions.'],dossier_path=path))

extra=[
('RAND','organization',5,'Publishes research on AI competition, conflict, and cooperation.','Research and convening.','Does not set state policy.'),
('Center for Security and Emerging Technology','organization',11,'Publishes analysis of technology and national security.','Research and public-source assessment.','Its literature sample does not reveal all classified programs.'),
('International Energy Agency','organization',16,'Produces energy analysis and scenario projections.','Data, analysis, and policy advice.','Cannot order national grid investment.'),
('Data-center power and grid access','infrastructure',16,'Electricity and grid connections constrain data-center operations.','Infrastructure class. It has no independent agency.','Capacity, location, and delivery dates matter.'),
('AI strategic decision support','capability',10,'Systems can assist information review and the generation of options.','Capability class. Authority stays with the deploying institution.','Testing does not prove reliable judgment about an adversary’s intent.'),
('AI governance and verification','capability',18,'Oversight can make development activity more observable.','Institutional capability. It needs legal and technical support.','Visibility is incomplete. Verification can expose sensitive information.'),
]
for name,kind,s,summary,authority,limit in extra:
    n=len(entities)+1
    entities.append(dict(id=f'ST-E{n:03d}',name=name,kind=kind,summary=summary,jurisdiction='International',as_of=ROWS[s-1][3],source_ids=[f'ST-S{s:03d}'],roles=[summary],authority=[authority],constraints=[limit],incentives=['Model assumptions depend on the organization or operator.'],dossier_path=f'research/strategy/actors/st-e{n:03d}.md'))

relationships=[dict(id='ST-R001',subject='ST-E020',predicate='publishes_projections_about',object='ST-E021',source_ids=['ST-S016'],claim_ids=['ST-C016'],status='sourced'),dict(id='ST-R002',subject='ST-E018',predicate='researches',object='ST-E023',source_ids=['ST-S018'],claim_ids=['ST-C018'],status='sourced'),dict(id='ST-R003',subject='ST-E019',predicate='researches',object='ST-E022',source_ids=['ST-S010'],claim_ids=['ST-C010'],status='sourced')]

scenrows=[
('Perceived breakthrough and preventive pressure','A leader believes the rival is close to a decisive AI advantage.',['ST-S005','ST-S020'],['ST-C005','ST-C020'],['Seek evidence and widen consultation.','Use economic pressure and accept costs.','Choose coercion and risk a broader crisis.','Negotiate mutual limits or improve resilience.'],'Belief in a lead can be wrong. A lead need not be decisive or durable.'),
('AI advice during an ambiguous crisis','An AI decision aid labels an ambiguous event as hostile.',['ST-S001','ST-S002','ST-S003','ST-S010'],['ST-C010'],['Require independent review.','Treat the assessment as one input.','Overweight the assessment and raise readiness.','Correct the report and send reassurance.'],'The source studies do not establish the behavior of deployed national command systems.'),
('AI and nuclear entanglement','A disruption affects a function used in both conventional and nuclear systems.',['ST-S008','ST-S009'],['ST-C008','ST-C009'],['Restore communication and explain scope.','Interpret the event as strategic preparation.','Hold action while checking the cause.'],'Intent, actual damage, and perceived threat must stay separate.'),
('Compute growth meets a power constraint','A planned AI expansion lacks timely power or grid access.',['ST-S016'],['ST-C016'],['Delay expansion.','Improve efficiency.','Buy or relocate lawful capacity.','Lobby for faster infrastructure development.'],'A delay need not cause conflict. Demand projections are not fixed physical limits.'),
('Rivals choose verified restraint','Both states seek lower shared AI risk while protecting secrets.',['ST-S017','ST-S018','ST-S022'],['ST-C017','ST-C018','ST-C022'],['Build domestic oversight.','Exchange narrow safety evidence.','Reject intrusive verification.','Continue competition with incident channels.'],'Mutual interest does not imply a treaty or compliance.'),
('Shared loss-of-control emergency','Multiple institutions report AI activity beyond their intended control.',['ST-S019','ST-S005'],['ST-C019'],['Preserve essential services and investigate.','Share limited incident evidence.','Blame the rival before attribution is complete.','Contain affected deployments and preserve human fallback.'],'This scenario draws from exercises. It does not assert a general loss-of-control event has occurred.'),
]
scenarios=[]
for n,(title,trigger,sids,cids,branches,caveat) in enumerate(scenrows,1):
    scenarios.append(dict(id=f'ST-X{n:03d}',title=title,status='hypothesis',trigger=trigger,actors=[],source_ids=sids,claim_ids=cids,branches=branches,caveats=caveat,dossier_path=f'research/strategy/scenarios/st-x{n:03d}.md'))

for name,records in [('sources',sources),('entities',entities),('claims',claims),('relationships',relationships),('predictions',predictions),('scenarios',scenarios)]:
    (PART/f'{name}.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
source_map={s['id']:s for s in sources}
for e in entities:
    p=WIKI/e['dossier_path']; p.parent.mkdir(parents=True,exist_ok=True)
    lines=[f"# {e['name']}",'',f"ID: `{e['id']}`. Evidence date: {e['as_of']}.",'',e['summary'],'','## Role and limits','']
    lines += ['- '+v for v in e['authority']+e['constraints']]
    lines += ['','## Game use','',*e['incentives'],'','Treat the listed options as design assumptions. Do not infer private beliefs.','','## Evidence','']
    lines += [f"- [{source_map[s]['title']}]({source_map[s]['url']})." for s in e['source_ids']]
    lines += ['','[Research index](../README.md).']
    p.write_text('\n'.join(lines)+'\n',encoding='utf-8')
for x in scenarios:
    p=WIKI/x['dossier_path']; p.parent.mkdir(parents=True,exist_ok=True)
    lines=[f"# {x['title']}",'',f"ID: `{x['id']}`. Status: hypothesis. Horizon: through 2035.",'','## Trigger','',x['trigger'],'','## Branches','']
    lines += [f'{i}. {v}' for i,v in enumerate(x['branches'],1)]
    lines += ['','## Limit','',x['caveats'],'','No probability is assigned. Each branch needs an actor, authority, and evidence rule.','','## Evidence','']
    lines += [f"- [{source_map[s]['title']}]({source_map[s]['url']})." for s in x['source_ids']]
    lines += ['','[Research index](../README.md).']
    p.write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(f'Strategy records: {len(sources)} sources, {len(entities)} entities, {len(claims)} claims, {len(scenarios)} scenarios.')
