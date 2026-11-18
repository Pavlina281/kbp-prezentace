import html
import os
import zipfile
import xml.etree.ElementTree as ET

BASE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(BASE, "clanky")
NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

TEMPLATE = """<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    body { margin: 0; background: #010002; color: #f7f7f7; font-family: Poppins, Segoe UI, sans-serif; line-height: 1.6; padding: clamp(1.5rem, 4vw, 3rem); }
    .wrap { max-width: 44rem; margin: 0 auto; }
    .kicker { color: #8dca76; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; margin: 0 0 0.75rem; }
    h1 { font-family: Onest, Segoe UI, sans-serif; font-weight: 300; font-size: clamp(1.6rem, 3vw, 2.2rem); margin: 0 0 1.25rem; }
    p { margin: 0 0 0.9rem; color: #bebebe; font-size: 1rem; }
    .back { display: inline-block; margin-top: 1.5rem; color: #8dca76; font-size: 0.95rem; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="kicker">Návrh textu</p>
    <h1>{title}</h1>
    {body}
    <a class="back" href="../index.html#12">Zpět do prezentace</a>
  </div>
</body>
</html>
"""


def docx_paragraphs(path: str) -> list[str]:
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    paras = []
    for p in root.iter(NS + "p"):
        parts = [t.text for t in p.iter(NS + "t") if t.text]
        line = "".join(parts).strip()
        if line:
            paras.append(line)
    return paras


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    items = [
        ("gryf.html", "GRYF — navržený článek", "KBP INTERNATIONAL představuje GRYF.docx"),
        ("milkor.html", "MILKOR — navržený článek", "KBP INTERNATIONAL a MILKOR rozvíjejí partnerství.docx"),
    ]
    for fname, title, docx in items:
        paras = docx_paragraphs(os.path.join(BASE, docx))
        body = "".join(f"<p>{html.escape(p)}</p>" for p in paras)
        path = os.path.join(OUT_DIR, fname)
        out = TEMPLATE.replace("{title}", html.escape(title)).replace("{body}", body)
        with open(path, "w", encoding="utf-8") as f:
            f.write(out)
        print(fname, len(paras), "paragraphs")


if __name__ == "__main__":
    main()