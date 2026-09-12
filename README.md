# Loop Logic Web

Bilingual Astro product website for https://looplogic.overpatch.dev/.
The root `/` automatically selects Japanese `/ja/` or English `/en/`. Explicit language URLs never auto-redirect.

## Development

- `pnpm install --frozen-lockfile`
- `pnpm dev`
- `pnpm build`

## Content and assets

Public claims were checked against the official Apple and Google store listings on 2026-09-11:
- https://apps.apple.com/jp/app/loop-logic/id6758883537
- https://play.google.com/store/apps/details?id=ch.overpatch.looplogic

The existing app icon is from the Loop Logic app repository. Gameplay screenshots supplied on 2026-09-13 are stored as original 1206×2622 PNGs under `src/assets/screenshots/{ja,en}/`: `standard.png` (completed Standard puzzle), `adventure.png` (Adventure gameplay), and `buffs.png` (buff selection). The six files were moved from `sozai/` and renamed without modifying their contents. The previous three store-marketing JPEGs were deleted.

`AppScreen.astro` selects the screenshot language using the page locale and shows the entire image at its native aspect ratio. Screenshots are non-interactive; no enlargement dialog is used. Replace the matching locale file to update a screenshot; preserve its dimensions or update the component dimensions and CSS aspect ratio if needed. The visible practice puzzle follows the hero and highlights. The hero’s “Try a puzzle” link starts the challenge directly.

Shared content: `src/components/Home.astro`. Shared styling: `src/styles/global.css`.
Both store destinations are explicit; there is no automatic platform redirect.
The root selects the saved manual choice first, then the first supported browser language, falling back to English. Detection runs in the head before content rendering and uses location.replace, preserving query parameters and section anchors. Without JavaScript the root shows English with working language links. Manual language switches use localStorage key `looplogic-language-choice`; the old banner preference is ignored because it also recorded dismissals. Language-specific URLs always stay in the requested language. Legal pages live under `/en/` and `/ja/`; previous `/privacy/` and `/terms/` URLs remain available as English aliases with canonical links to `/en/`.
`data-store` and `data-placement` identify download links for a future analytics integration. No analytics collector is currently configured, and no download/conversion measurement is claimed.

## Publication

The `.openai/hosting.json` manifest identifies the private Sites review deployment. The production canonical URLs intentionally target the planned domain, not the review origin. The custom production domain and DNS have not been activated by this change. Existing GitHub origin remains unchanged. `dist/` is a static build suitable for GitHub Pages as well as Sites.

Legal pages live at `/privacy/`, `/terms/`, `/ja/privacy/`, and `/ja/terms/`, following Owlaria's locale convention. Home-page footer links use these local routes.

The four original HTML documents in `src/data/legal/` are byte-for-byte copies from https://github.com/over-patch/overpatch-legal/tree/0ee155d7e088af5f2ee7c6bb955fae95ca1d0910/looplogic (imported 2026-09-12). `LegalPage.astro` renders the original document from its first heading through its footer, preserving all policy wording, dates, and contact details. Only the surrounding site navigation and presentation change; privacy heading levels are normalized without changing their text. Language switches stay on the same document.

The original GitHub Pages site and app/store links are unchanged. After the production domain is activated, app/store legal URLs can be updated separately; existing users can continue opening the old URLs.

## UI refinement (2026-09-12)

- Shared StoreLinks uses official black store badges with equal visual height; copy applies to phones and tablets. Google Play uses the official English badge on both locales because the legacy Japanese asset endpoints are unavailable. Apple badges are localized.
- Badge sources: https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg ; https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ja-jp ; https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png . Artwork is preserved without modification.
- The hero's direct practice link starts the optional puzzle. The existing pause, reset, hints and two puzzles are preserved.
- Adventure introduction consolidates the repeated bridge and journey explanation. Store badges appear in both the hero and final download section; the sticky header provides access from anywhere on the page.
- Screenshots are now non-interactive; the former enlargement dialog and its script have been removed.
- Global and Adventure styles are consolidated; practice edge targets have a 44px minimum short side. The main page was checked at 320, 390, 768 and 1280px widths across both locales.

## App-first redesign (2026-09-13)

- Japanese and English home pages lead with explicit iOS/Android app positioning, store badges, and two gameplay screens. Localized screenshots are displayed without cropping and remain non-interactive.
- Standard and Adventure modes are presented together near the top, each with gameplay imagery. Adventure introduces buffs in plain language alongside the localized buff selection screen.
- Detailed buff combinations, the four-stage example, and challenge limits remain available in a native disclosure. The repeated three-step tutorial is replaced by a visible playable demo near the top, preserving both puzzles, hints, pause, reset, and direct `#try-puzzle` links.
- Presentation changes are scoped to `src/styles/home.css`. Legal documents, store destinations, and language selection are preserved. Each language displays its own screenshots.

## Phone handoff

Desktop download sections (900px and wider) include separate App Store and Google Play QR codes in `public/images/qr/`. They encode the same direct store URLs as the badges, with Japanese/US App Store destinations selected by page language. They never point to the private review site. Mobile retains the store badges without QR codes. Regenerate with `scripts/generate-store-qr.py` using Python `qrcode==8.2`; generated SVG files are committed, so the app has no QR runtime dependency.

The shared `LanguageSwitcher.astro` shows a globe and localized Language label (icon-only on small screens). Its expandable list uses each language’s native name and marks the current language. Add menu options in its `languages` array alongside the corresponding localized routes and entry-point detection support. It preserves the current legal page, query, anchor, and remembered manual choice. Native details and links remain usable without JavaScript.

## Technical SEO (2026-09-13)

- The visible home-page text, CSS, gameplay and language redirects are preserved.
- Original screenshot PNGs now live in `src/assets/screenshots/{ja,en}/`. Astro generates WebP variants at 240, 480, 720 and 960px widths (quality 90), with responsive selection and unchanged aspect ratios. Only the main hero screenshot has high fetch priority; both hero screenshots remain eager. Replace the original assets to regenerate all sizes on build.
- Home pages include localized Open Graph and X metadata using the existing app icon, plus MobileApplication JSON-LD grounded in the visible app information. No ratings or reviews are invented; Google software-app rich-result eligibility is not claimed without a qualifying review/rating.
- The sitemap lists the six canonical locale pages. The neutral `/` entry still selects a language and declares `/en/` canonical; it remains the hreflang x-default destination but is excluded from the sitemap.
- Production URLs remain `https://looplogic.overpatch.dev`. The Sites review deployment is owner-private, so publishing it does not enable Google indexing. Activate the public domain and verify HTTPS, 200 responses, robots headers, canonical/hreflang and sitemap before submitting to Search Console. Confirm nonexistent URLs return 404.
- Search Console ownership verification and analytics are not configured by this change. Once the public site is active, submit `/sitemap.xml` and inspect `/ja/` and `/en/`. For analytics, select a collector and account first; existing store-link attributes identify store and placement. Store clicks are not installations.
