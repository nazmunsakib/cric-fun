# Player photographs

Put your player photographs in this directory.

Recommended:

- Square images, at least 720 × 720 px.
- JPG, PNG, WebP, or SVG.
- Simple filenames such as `sakib.jpg`, `rakib.jpg`, `suhad.jpg`.

Then open `src/data/players.ts` and point each player's `image` field at the
new file:

```ts
{ id: "sakib", name: "Sakib", image: "/players/sakib.jpg" }
```

Each player's `id` should stay unique. It is used internally for team, best
player, and flop-list selections.

## Current roster notes

The player list is defined in `src/data/players.ts`.

The app loads optimized 900 px JPEGs from `optimized/` for faster mobile
loading. The original PNG uploads remain in this directory as source files. If
you add a new photo, add the original here, create an optimized copy, and point
the player's `image` path at the optimized file.

- `placeholder-sohan.svg` is a generated placeholder because no matching photo
  file was found for that name.
- `sajedul.png` is currently not mapped to a player in the supplied roster.
  Confirm the name or add it to `src/data/players.ts` if it should be
  selectable.

To replace a placeholder, add a real photo and update the player's `image` path
in `src/data/players.ts`.
