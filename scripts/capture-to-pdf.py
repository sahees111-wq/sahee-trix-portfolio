from pathlib import Path
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import json
import math

artifact_dir = Path("artifacts")
destination = artifact_dir / "SAHEETRIX-Website.pdf"
report_path = artifact_dir / "capture-report.json"
segments_dir = artifact_dir / "segments"

if not report_path.exists():
    raise SystemExit("Capture report was not created.")

report = json.loads(report_path.read_text(encoding="utf-8"))
viewport_height = int(report["viewport"]["height"])
document_height = int(report["screenshotCssDimensions"]["height"])
segment_positions = report.get("segmentPositionsCss", [])

segment_files = sorted(segments_dir.glob("segment-*.png"))
if segment_files and len(segment_files) == len(segment_positions):
    first = Image.open(segment_files[0]).convert("RGB")
    pixel_width, pixel_height = first.size
    scale = pixel_height / viewport_height
    full_height = math.ceil(document_height * scale)
    stitched = Image.new("RGB", (pixel_width, full_height), (8, 8, 10))

    # Paste each viewport capture at its recorded scroll coordinate. The captures
    # intentionally overlap; later captures replace the overlap with the later
    # viewport's fully settled visual state, avoiding seams or missing strips.
    for top_css, segment_path in zip(segment_positions, segment_files):
        with Image.open(segment_path) as opened:
            image = opened.convert("RGB")
            top_px = round(float(top_css) * scale)
            bottom_px = min(full_height, top_px + image.height)
            if bottom_px > top_px:
                stitched.paste(image.crop((0, 0, pixel_width, bottom_px - top_px)), (0, top_px))

    source_image = stitched
    report["stitchedPixelDimensions"] = {
        "width": pixel_width,
        "height": full_height,
    }
else:
    # Backward-compatible single full-page capture.
    source = artifact_dir / "saheetrix-homepage-full.png"
    if not source.exists():
        raise SystemExit("No viewport segments or full-page screenshot were created.")
    source_image = Image.open(source).convert("RGB")
    pixel_width, pixel_height = source_image.size
    scale = pixel_height / document_height

with source_image:
    # 96 CSS pixels = 72 PDF points. Preserve the capture scale and aspect ratio.
    point_scale = 72 / 96 / scale
    page_width = pixel_width * point_scale
    page_height = source_image.height * point_scale

    pdf = canvas.Canvas(
        str(destination),
        pagesize=(page_width, page_height),
        pageCompression=1,
    )
    pdf.setTitle("SAHEETRIX Website - Full Homepage")
    pdf.setAuthor("SAHEETRIX")
    pdf.setSubject("Full-length visual capture of the live SAHEETRIX homepage")
    pdf.drawImage(
        ImageReader(source_image),
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
    "pixelHeight": source_image.height,
    "pageWidthPt": round(page_width, 2),
    "pageHeightPt": round(page_height, 2),
    "segmentCount": len(segment_files),
    "fileBytes": destination.stat().st_size,
}
report["pdf"] = summary
report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(summary, indent=2))
