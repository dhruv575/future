"""Prepare the complete sprite roster. Image generation uses the built-in tool."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'assets' / 'sprites'
PUBLIC = ROOT / 'apps' / 'web' / 'public' / 'sprites'
ART.mkdir(parents=True, exist_ok=True)
(ART / 'prompts').mkdir(exist_ok=True)
for folder in ('people', 'entities'):
    (PUBLIC / folder).mkdir(parents=True, exist_ok=True)

entities = json.loads((ROOT / 'wiki/data/entities.json').read_text(encoding='utf-8'))
groups = json.loads((ROOT / 'wiki/data/entity_aliases.json').read_text(encoding='utf-8'))
aliases = {g['canonical_id']: g['alias_ids'] for g in groups}
reference_file = ART/'references/sources.json'
references = {r['id']:r for r in json.loads(reference_file.read_text(encoding='utf-8'))} if reference_file.is_file() else {}
skip = {alias for g in groups for alias in g['alias_ids']}

# These are art directions, not evidence claims about the underlying entities.
symbols = {
'AI-E001': ('brand', 'OpenAI interwoven six-loop knot logomark, in ivory and deep green.'),
'AI-E002': ('brand', 'Anthropic distinctive black ANTHROPIC wordmark with its diagonal-cut A, on transparent background; only the word ANTHROPIC.'),
'AI-E003': ('brand', 'Google DeepMind brand: compact DeepMind loop mark with blue violet tones and a small simple DeepMind wordmark.'),
'AI-E004': ('brand', 'Meta blue infinity-loop logo, exact recognizable loop silhouette.'),
'AI-E005': ('brand', 'xAI diagonal x slash AI logomark in ivory. Represent the xAI business, distinct from the separate SpaceX entity.'),
'AI-E006': ('brand', 'DeepSeek blue whale logomark, rounded whale and upward tail.'),
'AI-E007': ('brand', 'Alibaba orange smiling face / flowing lowercase a logomark.'),
'AI-E008': ('brand', 'Baidu blue paw-print logomark with its recognizable four toes.'),
'AI-E009': ('brand', 'Tencent blue italic Tencent wordmark.'),
'AI-E010': ('brand', 'Huawei red radial flower-petal fan logomark.'),
'AI-E011': ('brand', 'Microsoft four equal squares: red, green, blue and yellow, separated by a clean gap.'),
'AI-E012': ('brand', 'Amazon AWS wordmark and orange smile arrow, in ivory and orange.'),
'AI-E013': ('brand', 'Hugging Face smiling yellow face and two open hugging hands.'),
'AI-E014': ('symbol', 'A precise teal evaluation gauge around a small neural-network node diagram, with the short label METR. Custom game badge for evaluation research.'),
'AI-E015': ('symbol', 'A navy shield with a small Union Jack corner, a magnifying glass and an AI chip. Custom game badge for the UK AI Security Institute.'),
'AI-E030': ('symbol', 'OpenAI knot inside a crisp teal conversation bubble, representing GPT models rather than the company itself.'),
'AI-E031': ('brand', 'Claude warm terracotta radial starburst / asterisk logomark.'),
'AI-E032': ('brand', 'Google Gemini four-point sparkle logomark, blue and violet with cyan highlights.'),
'AI-E033': ('brand', 'Grok circular black-and-ivory diagonal slash logomark.'),
'AI-E034': ('symbol', 'DeepSeek blue whale nested in a small silver chip outline, denoting the R1 and V3 model families.'),
'AI-E035': ('brand', 'Qwen purple interlocking geometric rounded three-lobed knot logomark.'),
'AI-E036': ('symbol', 'Baidu blue paw paired with a small gold chat bubble. Custom badge for the ERNIE model family.'),
'AI-E037': ('symbol', 'Tencent blue cloudlike neural knot inside a silver conversation-bubble outline. Custom badge for Hunyuan models.'),
'AI-E038': ('symbol', 'Huawei red petal fan above a small jade mountain and AI chip. Custom badge for the Pangu model family.'),
'AI-E039': ('symbol', 'A small silver AI chip with two articulated tool-gripper symbols, precise and non-threatening.'),
'AI-E040': ('symbol', 'A teal circuit chip with a navy network shield and two small data packets.'),
'AI-E041': ('symbol', 'A document entering a chat bubble through an amber warning triangle; symbolic prompt injection, no code.'),
'AI-E042': ('symbol', 'Three stacked deep-blue memory blocks carrying a tiny gold neural-network graph, representing model weights.'),
'AI-E043': ('symbol', 'Three compact server racks beneath a silver cloud, teal status lights, isometric pixel icon.'),
'AI-E044': ('symbol', 'A magnifying glass, a teal check mark, and a containment shield around one AI chip.'),
'AI-E045': ('symbol', 'An ivory research flask connected to a teal AI chip and a small circular arrow.'),
'AI-E046': ('brand', 'SpaceX ivory SPACEX wordmark with the long curved orbital stroke through the X.'),
'SD-E001': ('flag', 'United States flag with thirteen red-and-ivory stripes and a blue canton of small white stars.'),
'SD-E002': ('flag', 'People\'s Republic of China red flag, one large gold star and four small gold stars.'),
'SD-E004': ('flag', 'Japan flag: red circular sun centered in a white rectangle.'),
'SD-E005': ('flag', 'Philippines flag: blue upper band, red lower band, white hoist triangle, gold sun and three gold stars.'),
'SD-E006': ('flag', 'Republic of Korea flag: white field, red-blue taegeuk and four black trigrams.'),
'SD-E007': ('flag', 'Australian flag: blue field, Union Jack canton, Commonwealth star and Southern Cross stars.'),
'SD-E008': ('flag', 'Netherlands flag: three equal horizontal bands of red, white, blue.'),
'SD-E009': ('flag', 'United Kingdom Union Jack with correct layered red and white crosses on blue.'),
'SD-E010': ('flag', 'European Union flag: twelve small gold stars arranged in a circle on royal blue.'),
'SD-E011': ('flag', 'Russian Federation flag: equal horizontal bands white, blue, red.'),
'SD-E012': ('flag', 'North Korea flag: broad red middle with white-edged blue top and bottom, white disk with red star toward hoist.'),
'SD-E013': ('symbol', 'A red five-point star above crossed gold laurel sprigs, formal deep-red command shield. Custom CMC game badge, no invented official lettering.'),
'SD-E014': ('emblem', 'People\'s Liberation Army emblem: red five-point star with gold rim and central gold Chinese numerals 八一.'),
'SD-E015': ('symbol', 'An American bald eagle, small blue shield and gold laurel within a pentagonal navy outline. Custom Department of Defense game badge.'),
'SD-E016': ('symbol', 'The white US Capitol dome over a navy circular field with a small gold gavel, custom Congress badge.'),
'SD-E017': ('symbol', 'Pacific-centered blue globe, gold eagle wings, small silver compass star. Custom US Indo-Pacific Command badge.'),
'SD-E018': ('symbol', 'Blue globe with a silver orbital ring, eagle wings and a gold central command star. Custom US Strategic Command badge.'),
'SD-E019': ('symbol', 'An American bald eagle holding olive branches over an ivory diplomatic scroll. Custom US State Department badge.'),
'SD-E020': ('symbol', 'A red-and-gold Chinese state motif above two ivory olive branches and a blue globe. Custom Chinese foreign ministry badge.'),
'SD-E021': ('symbol', 'A gold-edged red star centered on a deep red defense shield, with a gold laurel border. Custom Chinese defense ministry badge.'),
'SD-E022': ('symbol', 'Taiwan white sun on blue above a restrained gold anchor, wings, and shield. Custom Taiwan armed forces badge.'),
'SD-E023': ('symbol', 'Three linked navy, ivory and gold rings around a small ocean globe. Custom AUKUS partnership emblem; no claim to an official logo.'),
'SD-E024': ('symbol', 'A gold-edged red star over a blue circuit network and gold communication arcs. Custom PLA Information Support Force badge.'),
'SD-E049': ('symbol', 'A closed steel strategic deterrent shield with an atomic symbol and a small US flag strip. No explosion or launch action.'),
'SD-E050': ('symbol', 'A closed steel strategic deterrent shield with an atomic symbol and a small PRC red-and-gold flag strip. No explosion or launch action.'),
'SD-E051': ('symbol', 'A closed steel strategic deterrent shield with an atomic symbol and a small Russian tricolor strip. No explosion or launch action.'),
'SD-E052': ('symbol', 'A closed steel strategic deterrent shield with an atomic symbol and a small Union Jack strip. No explosion or launch action.'),
'SD-E053': ('symbol', 'A closed steel strategic deterrent shield with an atomic symbol and a small North Korean flag strip. No explosion or launch action.'),
'SD-E054': ('symbol', 'A closed steel strategic deterrent shield with an atomic symbol and a small French blue-white-red vertical tricolor strip. No explosion or launch action.'),
'SD-E055': ('symbol', 'A restrained silver reconnaissance drone silhouette above a teal autonomy chip, custom capability icon.'),
'SD-E056': ('symbol', 'A navy shield containing a teal AI chip and three branching gold decision paths.'),
'SD-E057': ('symbol', 'A silver government shield in front of a navy network globe, with teal circuit paths.'),
'SD-E058': ('symbol', 'Three secured communication nodes around a gold command shield and small atomic symbol.'),
'SD-E059': ('symbol', 'A silver satellite with blue solar panels in a gold orbit around a small Earth.'),
'SD-E060': ('symbol', 'A curved gold protective dome over a small navy globe and a silver radar dish. Custom missile-defense symbol.'),
'SD-E061': ('symbol', 'A restrained navy badge with small silver aircraft, ship and armored-vehicle silhouettes, with a US flag stripe.'),
'SD-E062': ('symbol', 'A restrained dark-red badge with small silver aircraft, ship and armored-vehicle silhouettes, with a PRC flag stripe.'),
'SD-E063': ('symbol', 'A jade island silhouette inside a navy defense shield, with a small Taiwan white-sun emblem.'),
'SD-E064': ('symbol', 'Three small silver autonomous drones arranged around a teal coordination chip. Custom Replicator initiative icon.'),
'SD-E065': ('symbol', 'Three linked alliance rings around a teal AI chip and a small silver autonomous underwater craft. Custom AUKUS AI badge.'),
'SD-E066': ('brand', 'Palantir circular lens logomark above two spreading support legs, in ivory and charcoal.'),
'SD-E068': ('brand', 'Anduril Industries distinctive angular black-and-ivory A logomark.'),
'SD-E071': ('brand', 'Lockheed Martin blue wordmark and thin angular shooting-star symbol.'),
'SD-E073': ('brand', 'RTX bold red uppercase three-letter wordmark, with precise stepped pixel lettering.'),
'SD-E075': ('brand', 'AVIC blue oval winglike circular emblem and short AVIC wordmark.'),
'ST-E018': ('brand', 'RAND blue compact RAND wordmark, strong clean geometric letters.'),
'ST-E019': ('symbol', 'A navy shield with a gold circuit star and short ivory CSET letters. Custom research institute badge.'),
'ST-E020': ('brand', 'International Energy Agency blue IEA wordmark with its simple rising circular energy motif.'),
'ST-E021': ('symbol', 'A silver electrical substation connected to a compact navy server rack, one gold lightning bolt.'),
'ST-E022': ('symbol', 'A teal AI chip above three branching ivory paths with a gold decision marker, custom strategic analysis icon.'),
'ST-E023': ('symbol', 'An ivory balance scale beside a teal verification check over a navy chip, custom AI governance icon.'),
'TW-E001': ('flag', 'Taiwan Republic of China flag: red field with a blue canton and white twelve-rayed sun.'),
'TW-E002': ('symbol', 'Taiwan blue-and-white sun above an ivory government building with a jade executive seal. Custom Executive Yuan badge.'),
'TW-E003': ('symbol', 'Taiwan blue-and-white sun above an ivory parliament semicircle and a gold gavel. Custom Legislative Yuan badge.'),
'TW-E004': ('symbol', 'Two separated jade coastlines connected by a gold dialogue arc, with a small Taiwan white sun. Custom Mainland Affairs Council badge.'),
'TW-E005': ('emblem', 'Democratic Progressive Party green square flag emblem with the white Taiwan island silhouette and white cross motif.'),
'TW-E006': ('emblem', 'Kuomintang blue circular emblem with the white twelve-rayed sun.'),
'TW-E007': ('brand', 'Taiwan People\'s Party cyan TPP geometric lettermark.'),
'TW-E014': ('brand', 'TSMC red lowercase tsmc wordmark over a clean black outlined silicon wafer grid.'),
'TW-E017': ('brand', 'ASML dark-blue uppercase ASML wordmark, with the diagonal accent cut in the A.'),
'TW-E019': ('brand', 'NVIDIA lime-green eye logomark with its distinctive spiral square eye.'),
'TW-E021': ('brand', 'AMD black-and-ivory AMD wordmark with the upward-right square arrow.'),
'TW-E023': ('brand', 'Samsung blue uppercase SAMSUNG wordmark inside its tilted blue oval, ivory letters.'),
'TW-E024': ('brand', 'SK hynix red and orange butterfly-like SK symbol with short sk hynix wordmark.'),
'TW-E025': ('brand', 'Micron blue lowercase micron wordmark and sweeping orbital ring.'),
'TW-E026': ('brand', 'Tokyo Electron blue TEL geometric monogram.'),
'TW-E027': ('brand', 'Applied Materials blue geometric A motif and the short APPLIED MATERIALS wordmark.'),
'TW-E028': ('brand', 'ZEISS white uppercase wordmark inside the blue shield with curved bottom.'),
'TW-E029': ('symbol', 'An American eagle above a navy chip and a gold license document. Custom BIS export-control badge.'),
'TW-E030': ('symbol', 'A gold Dutch crown above a navy chip and a small red-white-blue tricolor strip. Custom Dutch export-authority badge.'),
'TW-E031': ('symbol', 'A red Japanese sun above a navy industrial gear and gold policy document. Custom METI ministry badge.'),
'TW-E033': ('symbol', 'A blue maritime shield with a silver anchor, red star and two white waves. Custom China Coast Guard badge.'),
'TW-E034': ('symbol', 'An isometric silver semiconductor fab with copper desert ground accents, a small US flag and a red TSMC wafer marker. Custom Arizona fab icon.'),
'TW-E035': ('symbol', 'An ivory Japanese fab building over a blue silicon wafer, small red sun and short JASM letters. Custom JASM subsidiary badge.'),
'TW-E036': ('symbol', 'An ivory European fab building over a blue silicon wafer, small ring of gold stars and short ESMC letters. Custom ESMC subsidiary badge.'),
'TW-E037': ('symbol', 'A neatly exploded isometric stack of silicon dies on a green interposer, gold connection bumps, custom advanced-packaging icon.'),
'TW-E038': ('symbol', 'Four stacked navy memory dies on a gold and green chip substrate, crisp isometric view.'),
'TW-E040': ('symbol', 'A silver service wrench next to a small lithography lens and gold gear. Custom semiconductor maintenance icon.'),
}

people_style = '''Create a NEW full-body portrait of the named person in the pixel-art craft of the supplied reference. Use the reference ONLY for pixel treatment, lighting, and approximate canvas scale. Redraw the whole body from scratch: the pose, silhouette, arm positions, shoulders, and leg arrangement MUST follow the individual pose brief, not the reference's clasped hands. Replace the face and hair with the named person's recognizable public likeness. High-detail pixel art, visible square-pixel clusters, hard stepped outlines, muted limited palette, top-left lighting. Entire head and both shoes visible, centered with generous transparent margin. Serious, composed expression, no grin, no combat or action stance. Formal tailored business clothing appropriate to the subject, a light shirt and restrained tie for men, a formal tailored suit for women. Preserve real gender presentation, age, hair, skin tone, facial structure and usual glasses. No inherited Dario glasses or curly hair unless appropriate. Natural adult build. Only use a small prop when specified in the pose brief. No names, text, scenery, glow, floor, shadows outside the figure, or watermarks. Genuinely transparent background; 1024x1536 portrait canvas. This is an invented game pose, not a depiction of a real event.'''
poses = [
    'Stand front-facing, shoulders level, both arms resting separately at the sides, hands open and relaxed. Feet parallel, balanced formal stance.',
    'Turn three-quarters toward the left. Put the right hand in the trouser pocket; let the left arm hang freely. Weight on the back leg, attentive face toward the viewer.',
    'Stand three-quarters toward the right, holding a thin closed document folder vertically at the left hip with the left hand. The right arm rests naturally at the side.',
    'Stand upright facing forward, arms loosely folded across the chest, shoulders relaxed, thoughtful level gaze. Avoid clenched hands or an aggressive stance.',
    'Turn slightly left, left hand holding a slim closed notebook at waist level while the right hand makes one small open-palm explanatory gesture at chest height.',
    'Stand at a right-facing three-quarter angle with both hands behind the back. Chest relaxed, chin slightly lowered, serious listening expression.',
    'Stand almost front-facing, left arm at the side, right hand lightly touching the jacket lapel. One foot slightly ahead, calm mid-conversation posture.',
    'Stand three-quarters left with the left forearm supporting a slim closed folio against the torso; the right hand rests on its top edge. Head turned toward the viewer.',
    'Stand in a composed pause, slightly angled right. The left hand adjusts the right shirt cuff in front of the lower torso. Keep the elbows separated and feet uncrossed.',
    'Stand front-facing with the left hand in a trouser pocket and right hand held low with the palm slightly open, making a restrained explanatory gesture. Weight shifted subtly left.',
    'Stand three-quarters right, one forearm across the lower chest supporting the other elbow, the other hand lightly near the chin in a thoughtful pose. Keep the face fully visible.',
    'Stand slightly left-facing, hold a thin tablet in the left hand at waist level and point gently at its blank screen with the right index finger. Serious focused expression, head mostly upright.',
    'Stand upright facing the viewer, holding a closed folder down at the right side, left hand loosely resting on the jacket seam. Feet slightly offset and shoulders level.',
    'Stand three-quarters right, right arm resting at the side, left hand making a small measured palm-down gesture at waist height. Calm diplomatic posture.',
    'Stand front-facing with one hand resting lightly over the other wrist behind the back. Feet naturally spaced, head angled a few degrees left in attentive listening.',
    'Stand three-quarters left, hands holding a thin closed briefing folder horizontally at waist height, with elbows slightly away from the torso. Neutral focused face.',
]
pose_overrides = {
    'AI-E017': 'Preserve the approved Dario pose: hands gently clasped at the waist, dark suit, burgundy tie, calm serious expression.',
    'AI-E016': poses[1],
    'AI-E018': poses[10],
    'AI-E020': poses[4],
    'AI-E021': poses[0],
    'AI-E029': poses[3],
    'SD-E025': poses[13],
    'SD-E031': poses[5],
    'TW-E020': poses[9],
    'TW-E022': poses[2],
}
person_ids = [e['id'] for e in entities if e['kind']=='person' and e['id'] not in skip]
pose_by_id = {eid: pose_overrides.get(eid, poses[index % len(poses)]) for index,eid in enumerate(person_ids)}
wardrobes = ['deep navy suit with muted blue accents', 'charcoal suit with a restrained burgundy accent', 'slate-gray suit with muted silver accents', 'very dark brown suit with neutral ivory accents', 'black suit with muted forest-green accents']
symbol_style = '''Create ONE high-quality pixel-art game emblem on a genuinely transparent square canvas. Crisp deliberate square pixels, hard stair-step edges, restrained 24–32-color palette, subtle stepped highlights, clean readable silhouette. Match the craft of high-detail early-1990s arcade pixel art with modern clarity. The artwork should fill about 70 percent of the square with generous transparent padding. No card, panel, backdrop, halo, border around the canvas, additional logos, labels or watermarks. Preserve recognizable colors and geometry when interpreting a public brand or flag. A stylized interpretation is not an official brand asset. For a custom game badge, use the specified symbol and do not invent a claim of official provenance. Text only where the brief explicitly requests a short wordmark. No gradients, blurry edges, photographic textures or smooth vector rendering.'''

override_path=ART/'prompt-overrides.json'
prompt_overrides=json.loads(override_path.read_text(encoding='utf-8')) if override_path.is_file() else {}
plan=[]
for e in entities:
    if e['id'] in skip: continue
    person=e['kind']=='person'
    if person:
        art_kind='portrait'
        prompt=people_style+'\nSubject: '+e['name']+'.\nIdentity context: '+e['summary']+'\nIndividual pose brief: '+pose_by_id[e['id']]+'\nWardrobe palette: '+wardrobes[person_ids.index(e['id']) % len(wardrobes)]+'.'
    else:
        if e['id'] not in symbols: raise ValueError('Missing symbol: '+e['id'])
        art_kind,brief=symbols[e['id']]
        prompt=symbol_style+'\nEntity: '+e['name']+'.\nArt brief: '+brief
    path=f"/sprites/{'people' if person else 'entities'}/{e['id'].lower()}.png"
    row=dict(id=e['id'],name=e['name'],kind=e['kind'],art_kind=art_kind,aliases=aliases.get(e['id'],[]),summary=e['summary'],source_ids=e['source_ids'],dossier_path=e['dossier_path'],src=path,prompt=prompt,status='pending',likeness_review='review_requested' if person else None)
    if person:
        row.update(pose_brief=pose_by_id[e['id']], style_revision='varied-serious-poses-v2')
        if e['id'] in references:
            row['identity_reference']=references[e['id']]['file']
            row['prompt']+='\nThe second reference image is the subject identity reference. Use its face, hair, and glasses. The first reference controls pixel craft only. Retain the individual pose brief.'
            prompt=row['prompt']
    if e['id'] in prompt_overrides:
        row.update(prompt_overrides[e['id']])
        prompt=row['prompt']
    plan.append(row)
    (ART/'prompts'/f"{e['id'].lower()}.txt").write_text(prompt+'\n',encoding='utf-8')
(ART/'plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Prepared {len(plan)} unique assets: {sum(p["kind"]=="person" for p in plan)} people.')
