# Cric Fun

A local-first daily cricket card generator for a cricket group chat. Build a
match-day pack in minutes, then download polished 1080 × 1350 PNG cards to share
on Facebook, Messenger, WhatsApp, or anywhere else.

No login. No database. No backend. No paid services.

## What it does

- Guided eight-step workflow with validation and progress tracking.
- Local player roster with image fallback.
- Captain selection with automatic team assignment.
- Two team rosters with search, move/remove controls, and captain badges.
- Multi-player Best Batter and Best Bowler selections with optional match
  notes, presented in a prestige gold-and-emerald award design.
- Multi-player Ashraful of the Day flop list with an editable roast caption,
  joker seal, comic flop cards, and a crowd-reaction meter.
- Trophy-and-award treatment for the series-winning captain.
- Daily series score entry for 2–3 match days (for example 2–1, 3–0, or a
  tied 1–1), with automatic winning-captain detection.
- No lifetime win/loss totals — each card uses only the selected day's results.
- Native share button on every card — send the PNG straight to Messenger,
  WhatsApp, or another installed app through the device share sheet.
- Five downloadable card types:
  1. Team Photo Card
  2. Best Batter Card
  3. Best Bowler Card
  4. Captain vs Captain Card
  5. Ashraful of the Day Card
- Portrait PNG export at 1080 × 1350, with per-card share, download, and
  Download All.
- Mobile-first responsive layout with sticky step actions, tablet and desktop
  layouts, and safe-area spacing.

## Tech stack

- Next.js 16 (App Router)
- TypeScript (strict)
- React 19
- Tailwind CSS 4
- Lucide React
- `html-to-image`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Add your players and photographs

The current local roster and photo paths live in `src/data/players.ts`. The app
ships with the group's photos from `public/players/`. Update the array whenever
players join, leave, or change their photo.

1. Add square-ish photographs to `public/players/`. JPG, PNG, WebP, and SVG all
   work. A 720 × 720 or larger square image is recommended.
2. Open `src/data/players.ts` and update the player entries:
   - `id`: a unique ID used internally for selections.
   - `name`: the name shown in the app and on cards.
   - `image`: the public path, for example `/players/sakib.jpg`.
   - `nickname`: optional.
3. Add or remove entries in the `players` array to change the roster.

Example:

```ts
{
  id: "sakib",
  name: "Sakib",
  image: "/players/sakib.jpg",
}
```

The live app uses the compressed 900 px JPEG copies in
`public/players/optimized/` so mobile loading stays fast. The original uploads
remain in `public/players/` as source files.

If an image path is wrong or a file cannot load, the UI falls back to an
initials avatar instead of showing a broken image. Placeholder avatars are
marked in the app until all configured players have real photos.

Current photo notes:

- **Sohan** uses a placeholder avatar because there is no matching photo file
  in `public/players/`.
- `sajedul.png` is present but is not currently assigned to a player in the
  supplied roster.

> Player names and photos are local to this project. All series scores and notes
> are entered by you and are not stored as lifetime records.

## How to use

1. **Match date** — defaults to the current local date. Every card and export
   filename uses the selected date.
2. **Captains** — pick Captain A and Captain B. The same player cannot hold both
   roles. Captains are automatically placed on their own team.
3. **Team rosters** — assign unassigned players to Team A or Team B. Each team
   needs at least one additional player before continuing. Moving a player to a
   team removes them from the other team.
4. **Best batter** — choose one or more players from either team. Add optional
   runs/strike-rate notes; blank notes are omitted from the card.
5. **Best bowler** — choose one or more players. Optional figures are shown only
   when you enter them.
6. **Ashraful of the Day** — build the daily flop list by choosing one or more
   players, then add an optional roast caption. Selection order becomes the
   flop ranking. Captions are saved per match date in this browser.
7. **Series result** — enter how many matches each captain won today, for
   example 2–1 or 3–0. A 1–1 series is allowed and produces no winning captain.
   The winning captain is detected automatically and used on the cards. No
   save step is required.
8. **Generate cards** — preview all five cards, regenerate a card, download one
   PNG, or download all five. Use **New match** to clear the form and start the
   next day.

## Daily series detection

The result step accepts a series score for the day. Enter each captain's match
wins — for example **2–1**, **3–0**, or **1–1**. The app detects the daily series
winner automatically:

- More match wins → that captain gets the trophy accent on the Captain vs
  Captain card.
- Equal match wins (including 1–1) → neither captain is highlighted.
- Losses never decide the winner.
- No lifetime win/loss totals are calculated or displayed.

## Local data

The app does not store lifetime records. The only persisted preference is:

- `cric-fun:captions:v1` — Ashraful roast captions keyed by match date.
  Older `funny-cricket:captions:v1` data is migrated automatically.

Important:

- Captions are specific to the current browser and device. They are **not
  synced**.
- The current match form lives in React state and resets on reload. Series
  scores are not saved as historical records.
- If browser storage is unavailable, captions still work for the current
  session and the app warns that they could not be saved.
- Clearing site data removes saved captions.

## Image export

Each card is rendered as a real 1080 × 1350 composition, not a dashboard
screenshot. Exports use only the card node and wait for local images to settle
before generating the PNG.

Filenames follow this pattern:

```text
cric-fun-best-batter-2026-10-25.png
cric-fun-team-photo-2026-10-25.png
cric-fun-best-bowler-2026-10-25.png
cric-fun-captain-vs-captain-2026-10-25.png
cric-fun-ashraful-of-the-day-2026-10-25.png
```

Some browsers may ask for permission the first time **Download all 5** triggers
multiple files. Individual download buttons are always available.

## Project structure

```text
src/
  app/
    globals.css
    icon.svg
    layout.tsx
    page.tsx
  components/
    app-header.tsx
    ashraful-step.tsx
    best-player-selector.tsx
    captain-selector.tsx
    card-gallery.tsx
    cricket-builder.tsx
    match-date-selector.tsx
    match-result-form.tsx
    match-summary.tsx
    player-picker.tsx
    stepper.tsx
    team-builder.tsx
    cards/
      ashraful-of-the-day-card.tsx
      best-batter-card.tsx
      best-bowler-card.tsx
      best-player-card.tsx
      captain-vs-captain-card.tsx
      card-shell.tsx
      team-photo-card.tsx
    ui/
      button.tsx
      modal.tsx
      player-avatar.tsx
  data/
    players.ts
  hooks/
    use-ashraful-captions.ts
    use-hydrated.ts
  lib/
    card-data.ts
    card-export.ts
    date-utils.ts
    match-validation.ts
    steps.ts
    storage.ts
    utils.ts
  types/
    cricket.ts
public/
  players/
```

## Known limitations

- No lifetime player or captain statistics by design.
- The current form is not persisted across reloads; only Ashraful captions are
  kept in the browser.
- Sohan currently uses a local placeholder avatar until a photo is added.
- Card export is PNG only.
- Direct image sharing uses the Web Share API, so it needs a supporting browser
  and HTTPS (localhost is fine). Mobile Safari and Chrome on Android support
  attaching image files; some desktop browsers do not show those targets.
- Player photos should be local files under `public/`; there is no remote image
  upload or hosting.
- Very large rosters are supported by the data model, but the 1080 × 1350 team
  card is optimized for a typical local-group squad (roughly 4–12 players).
