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

The existing app icon is from the Loop Logic app repository. The three JPEGs are current Japanese App Store marketing images fetched through Apple's lookup API, updated to 1242×2688 on 2026-09-12. Replace them with approved current screenshots when the store artwork is refreshed. The hero is an interactive website practice puzzle, not a product screenshot. English currently uses the same Japanese store imagery and labels that limitation in the page.

Shared content: `src/components/Home.astro`. Shared styling: `src/styles/global.css`.
Both store destinations are explicit; there is no automatic platform or language redirect.
`data-store` and `data-placement` identify download links for a future analytics integration. No analytics collector is currently configured, and no download/conversion measurement is claimed.

## Publication

The `.openai/hosting.json` manifest identifies the private Sites review deployment. The production canonical URLs intentionally target the planned domain, not the review origin. The custom production domain and DNS have not been activated by this change. Existing GitHub origin remains unchanged. `dist/` is a static build suitable for GitHub Pages as well as Sites.

Legal links point to existing public Loop Logic policies. No new legal text is invented.

## UI refinement (2026-09-12)

- Shared StoreLinks uses official black store badges with equal visual height; copy applies to phones and tablets. Google Play uses the official English badge on both locales because the legacy Japanese asset endpoints are unavailable. Apple badges are localized.
- Badge sources: https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg ; https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ja-jp ; https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png . Artwork is preserved without modification.
- The hero's direct practice link starts the optional puzzle. The existing pause, reset, hints and two puzzles are preserved.
- Adventure introduction consolidates the repeated bridge and journey explanation. Store badges appear once in the final download section; the sticky header provides access from anywhere on the page.
- Store screenshots open a native dialog, support Escape, restore focus and remain ordinary image links without JavaScript. Mobile screenshots use horizontal scroll snap.
- Global and Adventure styles are consolidated; practice edge targets have a 44px minimum short side. The main page was checked at 320, 390, 768 and 1280px widths across both locales.
