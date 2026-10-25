import type { CardData, CardTeam } from "@/types/cricket";
import { cn } from "@/lib/utils";
import {
  ACCENTS,
  CardContent,
  CardFooter,
  CardPlayerTile,
  CardShell,
  CardTopBar,
} from "@/components/cards/card-shell";

function TeamResultChip({
  team,
  winner,
  hasSeries,
}: {
  team: CardTeam;
  winner: CardData["seriesWinner"];
  hasSeries: boolean;
}) {
  if (!hasSeries) return null;

  const won = winner === team.side;
  return (
    <span
      className={cn(
        "rounded-full border px-[14px] py-[6px] text-[12px] font-black uppercase tracking-[0.16em]",
        !winner
          ? "border-[#fbbf24]/30 bg-[#fbbf24]/10 text-[#fbbf24]"
          : won
            ? "border-[#35d6a4]/40 bg-[#35d6a4]/10 text-[#6ee7b7]"
            : "border-rose-300/25 bg-rose-400/[0.07] text-rose-300/80",
      )}
    >
      {!winner ? "Series tied" : won ? "Series win" : "Series loss"}
    </span>
  );
}

function TeamBlock({
  team,
  winner,
  hasSeries,
  columns,
}: {
  team: CardTeam;
  winner: CardData["seriesWinner"];
  hasSeries: boolean;
  columns: number;
}) {
  const accent = team.side === "A" ? "field" : "violet";
  const colors = ACCENTS[accent];

  return (
    <section className="min-w-0">
      <header className="mb-[16px] flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-[14px]">
          <span
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[13px] border text-[16px] font-black"
            style={{
              borderColor: colors.soft,
              backgroundColor: colors.faint,
              color: colors.color,
            }}
          >
            {team.side}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-[27px] font-black leading-none tracking-[-0.02em] text-white">
              {team.name}
            </h2>
            <p className="mt-[7px] text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {team.players.length} players · Captain{" "}
              {team.captain.name}
            </p>
          </div>
        </div>
        <TeamResultChip team={team} winner={winner} hasSeries={hasSeries} />
      </header>

      <div
        className="grid gap-[13px]"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {team.players.map((player) => (
          <CardPlayerTile
            key={player.id}
            player={player}
            showCaptain={player.id === team.captain.id}
            accent={accent}
            nameClassName="text-[18px]"
          />
        ))}
      </div>
    </section>
  );
}

export function TeamPhotoCard({ data }: { data: CardData }) {
  const maxPlayers = Math.max(
    data.teamA.players.length,
    data.teamB.players.length,
    1,
  );
  const columns = Math.min(6, Math.max(3, maxPlayers));
  const hasSeries = data.seriesWinsA + data.seriesWinsB > 0;

  return (
    <CardShell accent="field">
      <CardTopBar date={data.date} />

      <CardContent className="pt-[34px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-[#35d6a4]">
              Match day squads
            </p>
            <h1 className="mt-[8px] text-[72px] font-black uppercase leading-[0.9] tracking-[-0.045em] text-white">
              Team Photo
            </h1>
          </div>
          <div className="mb-[7px] flex flex-col items-end gap-[6px]">
            {hasSeries ? (
              <span className="rounded-full border border-[#fbbf24]/25 bg-[#fbbf24]/10 px-[16px] py-[7px] text-[12px] font-black uppercase tracking-[0.16em] text-[#fbbf24]">
                Series {data.seriesWinsA}–{data.seriesWinsB}
              </span>
            ) : null}
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-[16px] py-[7px] text-[11px] font-black uppercase tracking-[0.16em] text-slate-300">
              {data.teamA.players.length + data.teamB.players.length} players
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              {data.teamA.name} vs {data.teamB.name}
            </span>
          </div>
        </div>

        {data.summary ? (
          <div className="mt-[18px] rounded-[16px] border border-white/10 bg-white/[0.035] px-[20px] py-[12px] text-center">
            <p className="line-clamp-2 text-[18px] font-bold tracking-[0.01em] text-slate-200">
              {data.summary}
            </p>
          </div>
        ) : null}

        <div className="mt-[30px] flex flex-1 flex-col justify-center gap-[30px]">
          <TeamBlock
            team={data.teamA}
            winner={data.seriesWinner}
            hasSeries={hasSeries}
            columns={columns}
          />
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="rounded-full border border-white/10 bg-[#081420] px-[16px] py-[6px] text-[12px] font-black uppercase tracking-[0.24em] text-slate-400">
              {hasSeries ? `${data.seriesWinsA} – ${data.seriesWinsB}` : "Versus"}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <TeamBlock
            team={data.teamB}
            winner={data.seriesWinner}
            hasSeries={hasSeries}
            columns={columns}
          />
        </div>
      </CardContent>

      <CardFooter date={data.date} />
    </CardShell>
  );
}
