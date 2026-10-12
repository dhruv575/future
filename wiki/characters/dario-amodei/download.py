"""Download public source files and record access limits. No login or paywall bypass."""
import hashlib
import io
import json
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent


def download(item):
    record = dict(item)
    record["retrieved_at"] = datetime.now(timezone.utc).isoformat()
    try:
        response = requests.get(item["url"], timeout=40, headers={"User-Agent": "ResearchArchive/1.0"})
        record.update(http_status=response.status_code, final_url=response.url)
        if not response.ok:
            record.update(download_status="unavailable", reason=f"HTTP {response.status_code}")
            return record
        payload = response.content
        is_pdf = payload.startswith(b"%PDF")
        suffix = ".pdf" if is_pdf else ".xml" if item["url"].endswith(".xml") else ".html"
        path = ROOT / "downloads" / (item["id"] + suffix)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(payload)
        record.update(raw_path=str(path.relative_to(ROOT)).replace("\\", "/"),
                      sha256=hashlib.sha256(payload).hexdigest(), bytes=len(payload),
                      content_type=response.headers.get("Content-Type", ""))
        if is_pdf:
            from pypdf import PdfReader
            reader = PdfReader(io.BytesIO(payload))
            body = "\n\n".join(f"[Page {i + 1}]\n{page.extract_text()}" for i, page in enumerate(reader.pages))
            record["pages"] = len(reader.pages)
        elif suffix == ".xml":
            body = response.text
        else:
            soup = BeautifulSoup(payload, "html.parser")
            for tag in soup(["script", "style", "nav", "footer", "noscript"]):
                tag.decompose()
            title = soup.find("title")
            record["page_title"] = title.get_text(" ", strip=True) if title else None
            content = soup.find("article") or soup.find("main") or soup.body or soup
            body = content.get_text("\n", strip=True)
            record["headings"] = [h.get_text(" ", strip=True) for h in content.find_all(["h1", "h2", "h3"])]
        text_path = ROOT / "text" / (item["id"] + ".txt")
        text_path.parent.mkdir(parents=True, exist_ok=True)
        text_path.write_text(body + "\n", encoding="utf-8")
        record.update(text_path=str(text_path.relative_to(ROOT)).replace("\\", "/"),
                      word_count=len(body.split()), download_status="downloaded_pending_review")
        # An HTTP success is not proof that the article body was available.
    except Exception as error:
        record.update(download_status="unavailable", reason=str(error))
    return record


if __name__ == "__main__":
    inputs = json.loads((ROOT / "catalog.json").read_text(encoding="utf-8"))
    with ThreadPoolExecutor(max_workers=4) as pool:
        records = list(pool.map(download, inputs))
    (ROOT / "downloads.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for record in records:
        print(record["id"], record["download_status"], record.get("word_count", ""), record.get("reason", ""))
