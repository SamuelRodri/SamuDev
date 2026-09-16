# Samuel Rodriguez Portfolio

Bilingual portfolio for Samuel Rodriguez, split into two modes:

- `.NET Developer`
- `Game Developer`

The site is built with React, Vite and TypeScript, and is configured to be published at:

```text
https://samuelrodri.github.io/SamuDev/
```

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Routes

- `/SamuDev/:locale` - mode selection hub
- `/SamuDev/:locale/dotnet` - .NET Developer mode
- `/SamuDev/:locale/game` - Game Developer mode
- `/SamuDev/:locale/game/projects` - all GameDev projects and game jams
- `/SamuDev/:locale/game/projects/:slug` - individual project
- `/SamuDev/:locale/game/projects/jams/:slug` - individual game jam project

`:locale` is `es` or `en`. The URL determines the language, including on refresh and browser history navigation. Switching language keeps the current page, query string and fragment. Legacy URLs without a locale redirect to English.

## Content editing

Projects and game jams are stored as JSON under `content/` and edited with Pages CMS using `.pages.yml`. See [the editing and setup guide](docs/content-editing.md). Build validation excludes drafts and checks published content before deployment. Run `npm test` for content and locale routing checks.

## Deployment workflow

The project includes a GitHub Actions workflow for GitHub Pages. In the GitHub repository settings, configure Pages to use **GitHub Actions** as the source.
