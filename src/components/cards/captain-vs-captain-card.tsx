import { Award, Crown, Handshake, Sparkles, Trophy } from "lucide-react";
import type { CardData, Player, TeamSide } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";
import {
  ACCENTS,
  CardContent,
  CardFooter,
  CardShell,
  CardTopBar,
} from "@/components/cards/card-shell";

const GOLD = {
  bright: "#fff4c7",
  light: "#f2d47e",
  mid: "#e2bd5f",
  dark: "#a97a2d",
};

function TrophyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="championTrophyGold"
          x1="20"
          y1="8"
          x2="80"
          y2="94"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff8d9" />
          <stop offset="0.38" stopColor="#f4d989" />
          <stop offset="0.7" stopColor="#d6a747" />
          <stop offset="1" stopColor="#9b6a20" />
        </linearGradient>
      </defs>
      <path
        d="M30 13h40v20c0 16-8.4 27.1-20 30.5C38.4 60.1 30 49 30 33V13Z"
        fill="url(#championTrophyGold)"
      />
      <path
        d="M30 20H17v6.5C17 36 23.5 42 32.5 42M70 20h13v6.5C83 36 76.5 42 67.5 42"
        stroke="url(#championTrophyGold)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M50 62V79M37 88h26"
        stroke="url(#championTrophyGold)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="m50 25.5 2.9 6.3 6.9.8-5.1 4.8 1.4 6.8-6.1-3.3-6.1 3.3 1.4-6.8-5.1-4.8 6.9-.8 2.9-6.3Z"
        fill="#6d4710"
      />
      <rect
        x="31"
        y="11"
        width="38"
        height="4.5"
        rx="2.25"
        fill="#fff8d9"
        fillOpacity=".65"
      />
    </svg>
  );
}

function ChampionPlaque({
  name,
  winsA,
  winsB,
}: {
  name: string;
  winsA: number;
  winsB: number;
}) {
  return (
    <div
      className="relative mt-[18px] overflow-hidden rounded-[22px] border border-[#e7c56a]/45 px-[22px] py-[13px]"
      style={{
        background:
          "linear-gradient(105deg, #120e06 0%, #2a1f0c 48%, #120e06 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,244,199,0.06) inset, 0 22px 60px -34px rgba(231,197,106,0.55)",
      }}
    >
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fff4c7]/50 to-transparent" />
      <div className="flex items-center gap-[15px]">
        <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-[#e7c56a]/35 bg-[#0b100b]">
          <TrophyMark className="h-[43px] w-[43px]" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-[6px] text-[9px] font-black uppercase tracking-[0.26em] text-[#d8b45a]">
            <Crown size={11} fill="currentColor" />
            Series champion award
          </p>
          <p className="mt-[4px] truncate font-serif text-[29px] font-semibold leading-none text-[#fff3c4]">
            {name}
          </p>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-[18px]">
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#9c895c]">
              Final score
            </p>
            <p className="text-[29px] font-black leading-none text-white">
              {winsA}–{winsB}
            </p>
          </div>
          <Award size={35} strokeWidth={1.3} className="text-[#e7c56a]/80" />
        </div>
      </div>
    </div>
  );
}

function LevelPlaque({ winsA, winsB }: { winsA: number; winsB: number }) {
  return (
    <div className="mt-[18px] flex items-center justify-center gap-[12px] rounded-[22px] border border-white/15 bg-white/[0.03] px-[22px] py-[15px]">
      <Handshake size={25} className="text-slate-400" />
      <p className="text-[14px] font-black uppercase tracking-[0.18em] text-slate-300">
        Series level {winsA}–{winsB} · honours shared
      </p>
    </div>
  );
}

function CaptainPanel({
  side,
  captain,
  seriesWins,
  seriesLosses,
  highlighted,
  tied,
}: {
  side: TeamSide;
  captain: Player;
  seriesWins: number;
  seriesLosses: number;
  highlighted: boolean;
  tied: boolean;
}) {
  const accent = side === "A" ? "field" : "violet";
  const colors = ACCENTS[accent];

  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col items-center rounded-[30px] border px-[24px] pb-[24px] pt-[22px]",
        highlighted
          ? "border-[#e7c56a]/60 text-[#f8e7b0]"
          : "border-white/10 bg-white/[0.025]",
      )}
      style={
        highlighted
          ? {
              background:
                "radial-gradient(circle at 50% 0%, rgba(231,197,106,0.2), transparent 60%), linear-gradient(180deg, #101c16 0%, #07110e 100%)",
              boxShadow:
                "0 0 0 2px rgba(231,197,106,0.12), 0 28px 80px -38px rgba(231,197,106,0.6)",
            }
          : undefined
      }
    >
      <div className="mb-[16px] flex w-full items-center justify-between">
        <span
          className="rounded-full border px-[13px] py-[5px] text-[11px] font-black uppercase tracking-[0.2em]"
          style={{
            borderColor: highlighted ? "rgba(231,197,106,0.4)" : colors.soft,
            backgroundColor: highlighted
              ? "rgba(231,197,106,0.1)"
              : colors.faint,
            color: highlighted ? "#f2d47e" : colors.color,
          }}
        >
          Team {side}
        </span>
        {highlighted ? (
          <span className="flex items-center gap-[6px] rounded-full border border-[#e7c56a]/45 bg-[#e7c56a]/15 px-[11px] py-[5px] text-[10px] font-black uppercase tracking-[0.14em] text-[#f7e6ad]">
            <Trophy size={12} fill="currentColor" fillOpacity={0.25} />
            Series winner
          </span>
        ) : tied ? (
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-[11px] py-[5px] text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
            Level
          </span>
        ) : null}
      </div>

      <div className="relative w-full max-w-[292px]">
        <div className="relative">
          <PlayerAvatar
            player={captain}
            className={cn(
              "aspect-square w-full border",
              highlighted
                ? "border-[#e7c56a]/55"
                : "border-white/15",
            )}
            showCaptain
            priority
            rounded="2xl"
            badgeClassName="top-[11px] right-[11px] h-[30px] w-[30px] text-[15px]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] rounded-b-2xl bg-gradient-to-t from-[#04101a]/70 to-transparent" />
        </div>

        {highlighted ? (
          <>
            <div
              className="absolute -bottom-[19px] -left-[12px] flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[#fff4c7]/35 bg-[#0a120e]"
              style={{
                boxShadow:
                  "0 20px 45px -20px rgba(231,197,106,0.55), 0 0 0 7px rgba(231,197,106,0.06)",
              }}
            >
              <TrophyMark className="h-[60px] w-[60px]" />
            </div>
            <Sparkles
              size={23}
              className="absolute -right-[13px] top-[8px] text-[#f2d47e]"
            />
            <Sparkles
              size={15}
              className="absolute -right-[20px] top-[42px] text-[#f2d47e]/55"
            />
          </>
        ) : null}
      </div>

      <h2 className="mt-[17px] max-w-full truncate text-[38px] font-black leading-none tracking-[-0.035em] text-white">
        {captain.name}
      </h2>
      <p
        className={cn(
          "mt-[8px] flex items-center gap-[6px] text-[10px] font-bold uppercase tracking-[0.24em]",
          highlighted ? "text-[#d8b45a]" : "text-slate-500",
        )}
      >
        {highlighted ? <Crown size={11} fill="currentColor" /> : null}
        {highlighted ? "Champion" : tied ? "Honours shared" : "Finalist"}
      </p>

      <div className="mt-[18px] grid w-full grid-cols-2 overflow-hidden rounded-[18px] border border-white/10 bg-[#071320]">
        <div className="border-r border-white/10 px-[12px] py-[14px] text-center">
          <p
            className="text-[48px] font-black leading-none"
            style={{ color: highlighted ? GOLD.light : "#35d6a4" }}
          >
            {seriesWins}
          </p>
          <p className="mt-[6px] text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
            Wins
          </p>
        </div>
        <div className="px-[12px] py-[14px] text-center">
          <p className="text-[48px] font-black leading-none text-rose-300">
            {seriesLosses}
          </p>
          <p className="mt-[6px] text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
            Losses
          </p>
        </div>
      </div>
    </div>
  );
}

export function CaptainVsCaptainCard({ data }: { data: CardData }) {
  const { seriesWinsA, seriesWinsB, seriesWinner } = data;
  const hasSeries = seriesWinsA + seriesWinsB > 0;
  const tied = hasSeries && seriesWinner === null;
  const aLeads = seriesWinner === "A";
  const bLeads = seriesWinner === "B";
  const winner =
    seriesWinner === "A"
      ? data.teamA.captain
      : seriesWinner === "B"
        ? data.teamB.captain
        : null;

  return (
    <CardShell accent="amber">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(620px 430px at 78% 5%, rgba(231,197,106,0.11), transparent 70%), radial-gradient(520px 430px at 8% 96%, rgba(53,214,164,0.05), transparent 72%)",
          }}
        />
        {winner ? (
          <>
            <Sparkles
              size={30}
              className="absolute right-[100px] top-[150px] text-[#e7c56a]/40"
            />
            <Sparkles
              size={17}
              className="absolute left-[96px] top-[320px] text-[#e7c56a]/25"
            />
            <Award
              size={300}
              strokeWidth={0.7}
              className="absolute -bottom-[90px] -left-[90px] text-[#e7c56a]/[0.035]"
            />
          </>
        ) : null}
      </div>
      <CardTopBar date={data.date} />

      <CardContent className="relative pt-[34px]">
        <div className="text-center">
          <p className="flex items-center justify-center gap-[8px] text-[12px] font-black uppercase tracking-[0.3em] text-[#f2d47e]">
            <Trophy size={14} />
            The trophy match
          </p>
          <h1 className="mt-[8px] text-[64px] font-black uppercase leading-[0.92] tracking-[-0.045em] text-white">
            Captain vs Captain
          </h1>
          <p className="mt-[10px] text-[18px] font-semibold text-slate-400">
            Most match wins takes the day
          </p>
        </div>

        <div className="relative mt-[30px] flex flex-1 items-center gap-[20px]">
          <CaptainPanel
            side="A"
            captain={data.teamA.captain}
            seriesWins={seriesWinsA}
            seriesLosses={seriesWinsB}
            highlighted={aLeads}
            tied={tied}
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#07111d] text-[15px] font-black uppercase tracking-[0.08em] text-slate-300 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
            VS
          </div>
          <CaptainPanel
            side="B"
            captain={data.teamB.captain}
            seriesWins={seriesWinsB}
            seriesLosses={seriesWinsA}
            highlighted={bLeads}
            tied={tied}
          />
        </div>

        {winner ? (
          <ChampionPlaque
            name={winner.name}
            winsA={seriesWinsA}
            winsB={seriesWinsB}
          />
        ) : tied ? (
          <LevelPlaque winsA={seriesWinsA} winsB={seriesWinsB} />
        ) : (
          <div className="mt-[18px] flex items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.03] px-[22px] py-[12px]">
            <p className="text-[14px] font-black uppercase tracking-[0.18em] text-slate-300">
              No series result
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter date={data.date} />
    </CardShell>
  );
}
