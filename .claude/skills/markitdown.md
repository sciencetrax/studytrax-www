# MarkItDown — Convert documents to Markdown

Convert files (PDF, DOCX, PPTX, XLSX, HTML, images, audio, etc.) to Markdown using Microsoft's MarkItDown library.

## Prerequisites

MarkItDown must be installed:

```bash
pip install markitdown[all]
```

**Check:** Run `markitdown --help` — if it fails, install first.

Requires Python 3.10+.

## Usage

### Convert a file to Markdown

```bash
markitdown <file> -o <output.md>
```

### Convert and read inline

```bash
markitdown <file>
```

Output goes to stdout — pipe or capture as needed.

### Convert from stdin

```bash
cat <file> | markitdown
```

## Supported Formats

| Format | Extensions |
|--------|-----------|
| PDF | `.pdf` |
| Word | `.docx` |
| PowerPoint | `.pptx` |
| Excel | `.xlsx`, `.xls` |
| HTML | `.html`, `.htm` |
| CSV | `.csv` |
| JSON | `.json` |
| XML | `.xml` |
| Images | `.jpg`, `.png`, `.gif`, `.bmp`, `.tiff` (EXIF + OCR) |
| Audio | `.mp3`, `.wav`, `.m4a` (transcription) |
| Outlook | `.msg` |
| eBooks | `.epub` |
| Archives | `.zip` (iterates contents) |

## When to Use

- **Reading a document the user provides** — convert first, then read the Markdown
- **Extracting text from PDFs** — especially scanned documents or complex layouts
- **Processing spreadsheets** — converts to Markdown tables
- **Analyzing presentations** — extracts slide content and speaker notes
- **Ingesting HTML pages** — cleaner than raw HTML parsing

## Workflow

1. User provides or references a document file
2. Run `markitdown <file> -o /tmp/converted.md`
3. Read the converted Markdown
4. Use the content for your task (analysis, summarization, implementation reference, etc.)

## Tips

- For large files, convert to a temp location: `markitdown input.pdf -o /tmp/output.md`
- The output is optimized for LLM consumption — structure is preserved but formatting is dense
- ZIP files are recursively processed — each file inside is converted
- Image conversion extracts EXIF metadata; for descriptions, use the Python API with an LLM client
