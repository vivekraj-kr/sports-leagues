## Repository

[vivekraj-kr/sports-leagues](https://github.com/vivekraj-kr/sports-leagues)

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- TanStack React Query
- Vitest and React Testing Library
- Playwright

## AI Usage

- Google Stitch was used for high-level wireframe generation.
- Codex was used to reason through design decisions, including whether the badge preview should use a modal or a side panel.
- Codex was used to add unit and component test cases with Vitest and React Testing Library.
- Codex was used to configure Playwright and add end-to-end tests.

## Design Decisions

- League cards are rendered as buttons because clicking a card opens an in-page badge modal rather than navigating to a new route.
- Badge responses are cached with TanStack React Query using the league ID in the query key to avoid repeat API calls for the same league.
- The badge modal selects the first available non-null `strBadge` because some seasons return `null` badge values.
- Empty states are shown when filters return no leagues or when a selected league has no badge image.

## Testing Notes

- Unit and component tests are written with Vitest and React Testing Library.
- End-to-end tests are written with Playwright.
- End-to-end tests mock the public API responses so the suite is deterministic and does not depend on live network data.

## API Notes

The assignment asks to display `strLeagueAlternate`, but the provided `all_leagues.php` endpoint does not include that field in its response. The app displays the available fields from that endpoint: `strLeague` and `strSport`.

## How To Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run unit tests:

```bash
npm run test
```

Run unit test coverage:

```bash
npm run test:coverage
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```
