import type { Player } from "@/types/cricket";

/**
 * Local group roster.
 *
 * Photos live in public/players. Player IDs are used internally for selections.
 *
 * Unmatched photo file currently in public/players:
 * - sajedul.png
 *
 * Sohan has no matching photo yet, so they use a local placeholder avatar
 * until an image is added.
 */
export const players: Player[] = [
  { id: "sakib", name: "Sakib", image: "/players/optimized/sakib.jpg" },
  { id: "rakib", name: "Rakib", image: "/players/optimized/rakib.jpg" },
  { id: "rabby", name: "Rabby", image: "/players/optimized/rabby.jpg" },
  { id: "suhad", name: "Suhad", image: "/players/optimized/suhad.jpg" },
  { id: "sadat", name: "Sadat", image: "/players/optimized/sadat.jpg" },
  {
    id: "don-forid",
    name: "Don Forid",
    image: "/players/optimized/don-forid.jpg",
  },
  { id: "rad", name: "Rad", image: "/players/optimized/rad.jpg" },
  {
    id: "nahid-desh",
    name: "Nahid Desh",
    image: "/players/optimized/nahid-desh.jpg",
  },
  {
    id: "nahid-islam",
    name: "Nahid Islam",
    image: "/players/optimized/nahid-islam.jpg",
  },
  { id: "maruf", name: "Maruf", image: "/players/optimized/maruf.jpg" },
  { id: "priam", name: "Priam", image: "/players/optimized/priam.jpg" },
  { id: "imran", name: "Imran", image: "/players/optimized/imran.jpg" },
  { id: "mubarak", name: "Mubarak", image: "/players/optimized/mubarak.jpg" },
  { id: "polash", name: "Polash", image: "/players/optimized/polash.jpg" },
  { id: "wasikul", name: "Wasikul", image: "/players/optimized/wasikul.jpg" },
  { id: "tamim", name: "Tamim", image: "/players/optimized/tamim.jpg" },
  { id: "imad", name: "Imad", image: "/players/optimized/imad.jpg" },
  { id: "safayet", name: "Safayet", image: "/players/optimized/safayet.jpg" },
  { id: "sagor", name: "Sagor", image: "/players/optimized/sagor.jpg" },
  {
    id: "shafin",
    name: "Shafin",
    image: "/players/optimized/shafin.jpg",
  },
  {
    id: "sohan",
    name: "Sohan",
    image: "/players/placeholder-sohan.svg",
  },
];

export const playersById = new Map(players.map((player) => [player.id, player]));

export function getPlayer(id: string | null | undefined): Player | undefined {
  if (!id) return undefined;
  return playersById.get(id);
}

export function getPlayers(ids: string[]): Player[] {
  return ids
    .map((id) => playersById.get(id))
    .filter((player): player is Player => Boolean(player));
}
