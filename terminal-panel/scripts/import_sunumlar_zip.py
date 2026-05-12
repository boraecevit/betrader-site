"""Extract Sunumlar_PDF.zip into public/docs with correct names; emit library-presentations.ts"""
from __future__ import annotations

import json
import zipfile
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "public" / "docs"
ZIP_PATH = Path(r"c:\Users\PC\Downloads\Sunumlar_PDF.zip")
OUT_TS = ROOT / "src" / "app" / "dashboard" / "library" / "library-presentations.ts"

# Dosya adından türetilen başlık yetersizse (yeniden içe aktarımda korunur)
DISPLAY_TITLE_OVERRIDES: dict[str, str] = {
    "Cci.pdf": "CCI",
}


def slug_id(idx: int) -> str:
    return f"sunum-{idx:03d}"


def ts_escape(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def main() -> None:
    if not ZIP_PATH.is_file():
        raise SystemExit(f"ZIP not found: {ZIP_PATH}")

    DOCS.mkdir(parents=True, exist_ok=True)

    # Remove PDFs except BETrader (not in archive)
    for p in DOCS.glob("*.pdf"):
        if p.name != "BETrader-ALGO-V6-Terminali.pdf":
            p.unlink()

    names: list[str] = []
    with zipfile.ZipFile(ZIP_PATH, "r", metadata_encoding="utf-8") as zf:
        for info in zf.infolist():
            if info.is_dir():
                continue
            raw = info.filename
            if "__MACOSX" in raw or raw.startswith("."):
                continue
            base = raw.split("/")[-1]
            if not base.lower().endswith(".pdf"):
                continue
            dest = DOCS / base
            dest.write_bytes(zf.read(info.filename))
            names.append(base)

    names = sorted(set(names))

    betrader = DOCS / "BETrader-ALGO-V6-Terminali.pdf"
    if not betrader.is_file():
        raise SystemExit("Missing BETrader-ALGO-V6-Terminali.pdf — add it to public/docs")

    entries: list[tuple[str, str, str]] = []
    entries.append(
        (
            "betrader-algo-v6",
            "Bora Ecevit — BETrader ALGO & V6 Terminali",
            "/docs/BETrader-ALGO-V6-Terminali.pdf",
        )
    )

    for i, name in enumerate(names, start=1):
        base_title = name[:-4] if name.lower().endswith(".pdf") else name
        title = DISPLAY_TITLE_OVERRIDES.get(name, base_title)
        safe = quote(name, safe="")
        src = f"/docs/{safe}"
        entries.append((slug_id(i), title, src))

    lines = [
        'import type { LibraryPresentation } from "./library-browser";',
        "",
        "/** Otomatik: Sunumlar_PDF.zip + BETrader. Dosya adları orijinaldir. */",
        "export const libraryPresentations: LibraryPresentation[] = [",
    ]
    for eid, title, src in entries:
        lines.append(
            f"  {{ id: {ts_escape(eid)}, title: {ts_escape(title)}, src: {ts_escape(src)} }},"
        )
    lines.append("];")
    lines.append("")

    OUT_TS.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_TS} with {len(entries)} items")
    print(f"Extracted {len(names)} PDFs to {DOCS}")


if __name__ == "__main__":
    main()
