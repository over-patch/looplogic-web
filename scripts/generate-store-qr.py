"""Generate static store QR codes. Requires qrcode==8.2."""
from pathlib import Path
import qrcode
from qrcode.image.svg import SvgPathFillImage

DESTINATIONS = {
    "app-store-ja": "https://apps.apple.com/jp/app/loop-logic/id6758883537",
    "app-store-en": "https://apps.apple.com/us/app/loop-logic/id6758883537",
    "google-play": "https://play.google.com/store/apps/details?id=ch.overpatch.looplogic",
}

def main():
    output = Path(__file__).resolve().parents[1] / "public/images/qr"
    output.mkdir(parents=True, exist_ok=True)
    for name, url in DESTINATIONS.items():
        code = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=4)
        code.add_data(url)
        code.make(fit=True)
        code.make_image(image_factory=SvgPathFillImage).save(output / f"{name}.svg")

if __name__ == "__main__":
    main()
