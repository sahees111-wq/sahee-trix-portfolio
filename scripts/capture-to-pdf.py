from pathlib import Path
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import json

source = Path("artifacts/saheetrix-homepage-full.png")
destination = Path("artifacts/SAHEETRIX-Website.pdf")
report_path = Path("artifacts/capture-report.json")

if not source.exists():
    raise SystemExit("Full-page screenshot was not created.")

with Image.open(source) as image:
    image = image.convert("RGB")
    pixel_width, pixel_height = image.size

    # Screenshot was captured at 1.5 device pixels per CSS pixel.
    # 96 CSS px = 72 PDF pt, so 1 screenshot pixel = 0.5 pt.
    scale = 0.5
    page_width = pixel_width * scale
    page_height = pixel_height * scale

    pdf = canvas.Canvas(
        str(destination),
        pagesize=(page_width, page_height),
        pageCompression=1,
    )
    pdf.setTitle("SAHEETRIX Website - Full Homepage")
    pdf.setAuthor("SAHEETRIX")
    pdf.setSubject("Full-length visual capture of the live SAHEETRIX homepage")
    pdf.drawImage(
        ImageReader(image),
        0,
        0,
        width=page_width,
        height=page_height,
        preserveAspectRatio=False,
        mask="auto",
    )
    pdf.showPage()
    pdf.save()

summary = {
    "pdf": str(destination),
    "pixelWidth": pixel_width,
    "pixelHeight": pixel_height,
    "pageWidthPt": round(page_width, 2),
    "pageHeightPt": round(page_height, 2),
    "fileBytes": destination.stat().st_size,
}
print(json.dumps(summary, indent=2))
