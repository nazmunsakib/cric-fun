import type { CardData } from "@/types/cricket";
import { BestPlayerCard } from "@/components/cards/best-player-card";

export function BestBowlerCard({ data }: { data: CardData }) {
  return <BestPlayerCard data={data} kind="bowler" />;
}
