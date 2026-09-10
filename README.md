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

The existing app icon is from the Loop Logic app repository. The three JPEGs are current Japanese App Store marketing images fetched through Apple's lookup API. Replace them with approved current screenshots when the store artwork is refreshed. The hero is an explicitly labeled rules diagram, not a product screenshot. English currently uses the same Japanese store imagery and labels that limitation in the page.

Shared content: `src/components/Home.astro`. Shared styling: `src/styles/global.css`.
Both store destinations are explicit; there is no automatic platform or language redirect.
`data-store` and `data-placement` identify download links for a future analytics integration. No analytics collector is currently configured, and no download/conversion measurement is claimed.

## Publication

The `.openai/hosting.json` manifest identifies the private Sites review deployment. The production canonical URLs intentionally target the planned domain, not the review origin. The custom production domain and DNS have not been activated by this change. Existing GitHub origin remains unchanged. `dist/` is a static build suitable for GitHub Pages as well as Sites.

Legal links point to existing public Loop Logic policies. No new legal text is invented.
