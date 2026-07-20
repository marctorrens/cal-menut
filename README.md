# Cal Menut

Cal Menut is a static TypeScript application for the Milestone 2 home experience. The user interface uses Catalan text while project documentation and code remain in English.

## Milestone 2 scope

- Warm, neutral home page with five large entry points: Masia, Infraestructures, Equips, Gestions, and Arxiu.
- Accessible local search modal opened from the `Cerca` button.
- Search is limited to the current static sections and pages.
- Discreet footer with the package version and an automatically generated build/deployment date formatted in Catalan.
- GitHub Pages deployment is configured for the `/cal-menut/` base path.

The home page intentionally does not include dashboard data, status indicators, timelines, KPIs, or home-automation features.

## Development

```bash
npm install
npm run build
npm run dev
```

The build emits the static site to `dist/`.
