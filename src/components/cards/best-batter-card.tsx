import type { CardData } from "@/types/cricket";
import { BestPlayerCard } from "@/components/cards/best-player-card";

export function BestBatterCard({ data }: { data: CardData }) {
  return <BestPlayerCard data={data} kind="batter" />;
}
