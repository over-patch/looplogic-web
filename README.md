# Loop Logic Web

Bilingual Astro product website for https://looplogic.overpatch.dev/.
English lives at `/`; Japanese at `/ja/`, following Owlaria's URL convention.

## Development

- `pnpm install --frozen-lockfile`
- `pnpm dev`
- `pnpm build`

## Content and assets

Public claims were checked against the official Apple and Google store listings on 2026-09-11:
- https://apps.apple.com/jp/app/loop-logic/id6758883537
- https://play.google.com/store/apps/details?id=ch.overpatch.looplogic

The existing app icon is from the Loop Logic app repository. The three JPEGs are current Japanese App Store marketing images fetched through Apple's lookup API, updated to 1242×2688 on 2026-09-12. Replace them with approved current screenshots when the store artwork is refreshed. The hero displays the phone portions of the existing store images using CSS; clicking opens the complete, unmodified artwork. The optional practice puzzle lives under How to play. English currently uses the same Japanese store imagery and labels that limitation in the page.

Shared content: `src/components/Home.astro`. Shared styling: `src/styles/global.css`.
Both store destinations are explicit; there is no automatic platform or language redirect.
When the displayed language differs from the visitor's saved choice or first supported browser language, a dismissible banner offers the other language. Unsupported browser languages fall back to English. Language selection and dismissal are remembered in localStorage on this browser; dismissal keeps the current language. Explicit URLs always remain accessible without redirects, and the header links work without JavaScript or browser storage. Switching preserves query parameters and the current section.
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
- Store screenshots open a native dialog, support Escape, restore focus and remain ordinary image links without JavaScript. Mobile screenshots use horizontal scroll snap.
- Global and Adventure styles are consolidated; practice edge targets have a 44px minimum short side. The main page was checked at 320, 390, 768 and 1280px widths across both locales.

## App-first redesign (2026-09-13)

- Japanese and English home pages lead with explicit iOS/Android app positioning, store badges, and two gameplay screens. Existing store artwork is displayed through CSS cropping; the original files are unchanged and can be enlarged.
- Standard and Adventure modes are presented together near the top, each with gameplay imagery. Adventure introduces buffs in plain language alongside the actual store selection screen.
- Detailed buff combinations, the four-stage example, and challenge limits remain available in a native disclosure. The repeated three-step tutorial is replaced by one diagram and an optional playable demo, preserving both puzzles, hints, pause, reset, and direct `#try-puzzle` links.
- Presentation changes are scoped to `src/styles/home.css`. Legal documents, store destinations, and language selection are preserved. English identifies the Japanese screenshot language.
