import { Award, CircleDot, Crown, Sparkles, Target, Trophy } from "lucide-react";
import type { CardData } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";
import {
  ACCENTS,
  CardContent,
  CardFooter,
  CardShell,
  CardTopBar,
  type CardAccent,
} from "@/components/cards/card-shell";

type BestKind = "batter" | "bowler";

const CONFIG: Record<
  BestKind,
  {
    title: string;
    eyebrow: string;
    subtitle: string;
    accent: CardAccent;
  }
> = {
  batter: {
    title: "Best Batter",
    eyebrow: "The golden bat",
    subtitle: "Innings of the day",
    accent: "amber",
  },
  bowler: {
    title: "Best Bowler",
    eyebrow: "The golden spell",
    subtitle: "Spell of the day",
    accent: "field",
  },
};

const GOLD = {
  bright: "#fff4c7",
  light: "#f2d47e",
  mid: "#e2bd5f",
  dark: "#a97a2d",
};

function LuxuryDecor({ accent }: { accent: CardAccent }) {
  const colors = ACCENTS[accent];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px 450px at 84% 6%, rgba(231,197,106,0.16), transparent 68%), radial-gradient(540px 420px at 7% 98%, ${colors.faint}, transparent 72%)`,
        }}
      />
      <div className="absolute inset-[26px] rounded-[32px] border border-[#e7c56a]/20" />
      <div className="absolute inset-[34px] rounded-[26px] border border-white/[0.055]" />
      <span className="absolute left-[26px] top-[26px] h-[66px] w-[66px] rounded-tl-[32px] border-l-2 border-t-2 border-[#e7c56a]/55" />
      <span className="absolute right-[26px] top-[26px] h-[66px] w-[66px] rounded-tr-[32px] border-r-2 border-t-2 border-[#e7c56a]/55" />
      <span className="absolute bottom-[26px] left-[26px] h-[66px] w-[66px] rounded-bl-[32px] border-b-2 border-l-2 border-[#e7c56a]/55" />
      <span className="absolute bottom-[26px] right-[26px] h-[66px] w-[66px] rounded-br-[32px] border-b-2 border-r-2 border-[#e7c56a]/55" />
      <div className="absolute right-[34px] top-[148px] h-[310px] w-[310px] rounded-full border border-[#e7c56a]/[0.08]" />
      <div className="absolute right-[78px] top-[192px] h-[222px] w-[222px] rounded-full border border-[#e7c56a]/[0.06]" />
      <Award
        size={350}
        strokeWidth={0.65}
        className="absolute -bottom-[95px] -left-[105px] text-[#e7c56a]/[0.035]"
      />
      <Trophy
        size={108}
        strokeWidth={0.9}
        className="absolute bottom-[160px] right-[52px] rotate-12 text-[#e7c56a]/[0.05]"
      />
    </div>
  );
}

function NumberMedal({ value }: { value: string }) {
  return (
    <span
      className="absolute -left-[10px] -top-[10px] z-10 flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#fff4c7]/50 font-serif text-[20px] font-bold text-[#201604] shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
      style={{
        background: `linear-gradient(145deg, ${GOLD.bright}, ${GOLD.mid} 58%, ${GOLD.dark})`,
      }}
    >
      {value}
    </span>
  );
}

function GoldNote({ note, compact }: { note?: string; compact?: boolean }) {
  if (!note) return null;
  return (
    <span
      className={cn(
        "mt-[10px] max-w-full rounded-full border border-[#e7c56a]/30 bg-[#e7c56a]/[0.08] text-center font-semibold leading-tight text-[#f2d47e]",
        compact
          ? "px-[12px] py-[5px] text-[14px]"
          : "px-[15px] py-[6px] text-[17px]",
      )}
    >
      {note}
    </span>
  );
}

function TeamLabel({ team }: { team: string }) {
  return (
    <span className="mt-[10px] text-[10px] font-black uppercase tracking-[0.24em] text-[#a99468]">
      Team {team}
    </span>
  );
}

export function BestPlayerCard({
  data,
  kind,
}: {
  data: CardData;
  kind: BestKind;
}) {
  const players = kind === "batter" ? data.bestBatters : data.bestBowlers;
  const config = CONFIG[kind];
  const colors = ACCENTS[config.accent];
  const Icon = kind === "batter" ? CircleDot : Target;

  const isHero = players.length === 1;
  const columns =
    players.length <= 4 ? players.length : players.length <= 6 ? 3 : 4;
  const nameSize =
    players.length === 2
      ? "text-[36px]"
      : players.length === 3
        ? "text-[30px]"
        : players.length === 4
          ? "text-[24px]"
          : players.length <= 6
            ? "text-[26px]"
            : "text-[20px]";

  return (
    <CardShell accent={config.accent}>
      <CardTopBar date={data.date} />

      <CardContent className="pt-[40px]">
        <LuxuryDecor accent={config.accent} />

        <div className="relative flex items-start justify-between gap-8">
          <div>
            <p className="flex items-center gap-[9px] text-[12px] font-black uppercase tracking-[0.36em] text-[#e7c56a]">
              <Award size={15} />
              Prestige award
            </p>
            <h1
              className="mt-[10px] bg-clip-text font-serif text-[88px] font-semibold leading-[0.88] tracking-[-0.045em] text-transparent"
              style={{
                backgroundImage: `linear-gradient(180deg, ${GOLD.bright} 0%, ${GOLD.light} 42%, ${GOLD.mid} 62%, ${GOLD.dark} 100%)`,
              }}
            >
              {config.title}
            </h1>
            <p className="mt-[14px] flex items-center gap-[14px] text-[20px] font-medium text-[#cdbd97]">
              <span className="h-px w-[42px] bg-[#e7c56a]/45" />
              {config.eyebrow}
              <span className="text-[#6f613f]">·</span>
              {config.subtitle}
            </p>
          </div>

          <div
            className="relative flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-full border border-[#e7c56a]/45"
            style={{
              background:
                "radial-gradient(circle at 35% 24%, rgba(255,248,219,0.2), rgba(231,197,106,0.06) 58%, transparent 75%)",
              boxShadow:
                "0 0 0 7px rgba(231,197,106,0.045), 0 24px 60px -28px rgba(231,197,106,0.5)",
            }}
          >
            <Crown
              size={39}
              strokeWidth={1.3}
              className="text-[#f4df9a]"
              fill="currentColor"
              fillOpacity={0.14}
            />
            <span className="absolute -bottom-[9px] rounded-full border border-[#e7c56a]/40 bg-[#0b1210] px-[13px] py-[5px] text-[8px] font-black uppercase tracking-[0.22em] text-[#e7c56a]">
              Prestige
            </span>
          </div>
        </div>

        <div className="relative mt-[22px] h-px bg-gradient-to-r from-transparent via-[#e7c56a]/50 to-transparent" />

        <div
          className={cn(
            "relative mt-[28px] flex flex-1 items-center",
            isHero && "justify-center",
          )}
        >
          {players.length === 0 ? (
            <div className="w-full rounded-[28px] border border-dashed border-[#e7c56a]/25 bg-[#e7c56a]/[0.025] px-10 py-16 text-center">
              <Award
                size={46}
                strokeWidth={1.1}
                className="mx-auto text-[#e7c56a]/60"
              />
              <p className="mt-4 font-serif text-[32px] font-semibold text-[#f4e8c5]">
                No {kind} selected yet
              </p>
              <p className="mt-2 text-[16px] text-[#8f8061]">
                Return to the builder and make a pick for the award.
              </p>
            </div>
          ) : isHero ? (
            <div className="relative flex w-full max-w-[485px] flex-col items-center">
              <div className="relative">
                <div className="pointer-events-none absolute -inset-[16px] rounded-[42px] border border-[#e7c56a]/15" />
                <div className="pointer-events-none absolute -inset-[7px] rounded-[34px] border border-[#e7c56a]/30" />
                <div
                  className="relative rounded-[28px] border border-[#fff4c7]/35 bg-[#0a1411] p-[9px]"
                  style={{
                    boxShadow:
                      "0 28px 80px -36px rgba(231,197,106,0.55), 0 0 0 1px rgba(255,244,199,0.08) inset",
                  }}
                >
                  <PlayerAvatar
                    player={players[0].player}
                    className="aspect-square w-[420px] rounded-[21px]"
                    showCaptain={
                      players[0].player.id === data.teamA.captain.id ||
                      players[0].player.id === data.teamB.captain.id
                    }
                    priority
                    badgeClassName="top-[14px] right-[14px] h-[32px] w-[32px] text-[16px]"
                  />
                  <div className="pointer-events-none absolute inset-x-[9px] bottom-[9px] h-[38%] rounded-b-[21px] bg-gradient-to-t from-[#04100c]/65 to-transparent" />
                </div>
                <NumberMedal value="01" />
                <Sparkles
                  size={26}
                  className="absolute -right-[22px] top-[20px] text-[#f2d47e]/80"
                />
                <Sparkles
                  size={17}
                  className="absolute -left-[18px] bottom-[74px] text-[#f2d47e]/55"
                />
                <span
                  className="absolute -bottom-[16px] left-1/2 flex -translate-x-1/2 items-center gap-[7px] whitespace-nowrap rounded-full border border-[#fff4c7]/40 px-[17px] py-[7px] text-[9px] font-black uppercase tracking-[0.24em] text-[#1e1404]"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD.dark}, ${GOLD.bright} 50%, ${GOLD.dark})`,
                  }}
                >
                  <Crown size={12} fill="currentColor" />
                  Player of the day
                </span>
              </div>

              <h2 className="mt-[38px] max-w-full text-center font-serif text-[54px] font-semibold leading-none tracking-[-0.03em] text-[#fff8e1]">
                {players[0].player.name}
              </h2>
              <GoldNote note={players[0].note} />
              <TeamLabel team={players[0].team} />
            </div>
          ) : (
            <div
              className="grid w-full items-start"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gap: players.length <= 2 ? 34 : 22,
                rowGap: 26,
              }}
            >
              {players.map((entry, index) => (
                <div
                  key={entry.player.id}
                  className="mx-auto flex min-w-0 flex-col items-center"
                  style={
                    players.length >= 5
                      ? { maxWidth: 240, width: "100%" }
                      : undefined
                  }
                >
                  <div className="relative w-full">
                    <div
                      className="rounded-[24px] border border-[#e7c56a]/28 bg-[#081310] p-[6px]"
                      style={{
                        boxShadow:
                          "0 18px 50px -30px rgba(231,197,106,0.5), 0 0 0 1px rgba(255,244,199,0.05) inset",
                      }}
                    >
                      <PlayerAvatar
                        player={entry.player}
                        className="aspect-square w-full rounded-[18px]"
                        showCaptain={
                          entry.player.id === data.teamA.captain.id ||
                          entry.player.id === data.teamB.captain.id
                        }
                        badgeClassName="top-[10px] right-[10px] h-[28px] w-[28px] text-[14px]"
                      />
                    </div>
                    <NumberMedal value={String(index + 1).padStart(2, "0")} />
                  </div>
                  <h2
                    className={cn(
                      "mt-[16px] max-w-full text-center font-serif font-semibold leading-[1.02] tracking-[-0.02em] text-[#fff8e1]",
                      nameSize,
                    )}
                  >
                    {entry.player.name}
                  </h2>
                  <GoldNote
                    note={entry.note}
                    compact={players.length >= 4}
                  />
                  <TeamLabel team={entry.team} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-[22px] flex items-center justify-between gap-4 border-t border-[#e7c56a]/20 pt-[15px]">
          <div className="flex items-center gap-[10px]">
            <Award size={17} className="text-[#e7c56a]" />
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#cdbd97]">
              Certificate of excellence
            </p>
          </div>
          <div className="flex items-center gap-[9px]">
            <Icon size={14} style={{ color: colors.color }} />
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7e6a3b]">
              {players.length} honouree{players.length === 1 ? "" : "s"} ·{" "}
              {kind === "batter" ? "batting" : "bowling"}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter date={data.date} />
    </CardShell>
  );
}
