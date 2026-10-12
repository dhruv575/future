"""Package the complete sprite set. Does not modify image pixels."""
import json
import zipfile
from datetime import datetime
from pathlib import Path

root = Path(__file__).resolve().parents[1]
public = root / 'apps/web/public'
art = root / 'assets/sprites'
manifest = json.loads((public / 'sprites/manifest.json').read_text(encoding='utf-8'))
if manifest['ready'] != manifest['total']:
    raise SystemExit(f"Sprite set is incomplete: {manifest['ready']}/{manifest['total']}")
downloads = Path.home() / 'Downloads'
downloads.mkdir(exist_ok=True)
archive = downloads / 'us-china-war-games-sprites.zip'
if archive.exists():
    archive = downloads / f"us-china-war-games-sprites-{datetime.now():%Y%m%d-%H%M%S}.zip"
with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_DEFLATED) as bundle:
    bundle.write(public / 'sprites/manifest.json', 'sprites/manifest.json')
    bundle.write(art / 'README.md', 'README.md')
    for item in manifest['items']:
        bundle.write(public / item['src'].lstrip('/'), item['src'].lstrip('/'))
    for prompt in sorted((art / 'prompts').glob('*.txt')):
        bundle.write(prompt, f"prompts/{prompt.name}")
print(f"Saved {manifest['total']} PNG assets: {archive}")
