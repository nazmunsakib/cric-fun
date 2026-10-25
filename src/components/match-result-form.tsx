"use client";

import { Handshake, Minus, Plus, Trophy } from "lucide-react";
import { getSeriesOutcomeLabel } from "@/lib/card-data";
import type { Player, TeamSide } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";

interface MatchResultFormProps {
  captainA: Player;
  captainB: Player;
  captainAWins: number;
  captainBWins: number;
  summary: string;
  onSeriesScoreChange: (side: TeamSide, value: number) => void;
  onSummaryChange: (value: string) => void;
}

const MAX_SERIES_WINS = 9;

function SeriesScoreCard({
  side,
  captain,
  wins,
  onWinsChange,
}: {
  side: TeamSide;
  captain: Player;
  wins: number;
  onWinsChange: (value: number) => void;
}) {
  const accent =
    side === "A"
      ? {
          card: "border-field/25 bg-field/[0.04]",
          chip: "border-field/30 bg-field/10 text-field",
          button:
            "border-field/25 bg-field/10 text-field hover:bg-field hover:text-[#04251b]",
        }
      : {
          card: "border-violet/25 bg-violet/[0.045]",
          chip: "border-violet/30 bg-violet/10 text-violet",
          button:
            "border-violet/25 bg-violet/10 text-violet hover:bg-violet hover:text-[#120b22]",
        };

  const clampValue = (value: number) =>
    Math.max(0, Math.min(MAX_SERIES_WINS, Math.floor(value)));

  return (
    <div className={cn("rounded-2xl border p-4", accent.card)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em]",
            accent.chip,
          )}
        >
          Team {side}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
          Captain
        </span>
      </div>

      <div className="flex items-center gap-3">
        <PlayerAvatar
          player={captain}
          className="h-14 w-14"
          showCaptain
          rounded="xl"
          badgeClassName="top-1 right-1 h-4 w-4 text-[8px]"
        />
        <div className="min-w-0">
          <p className="truncate text-base font-black text-white">
            {captain.name}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Matches won today
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onWinsChange(clampValue(wins - 1))}
          disabled={wins === 0}
          aria-label={`Decrease ${captain.name}'s series wins`}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border transition disabled:opacity-30",
            accent.button,
          )}
        >
          <Minus size={17} />
        </button>

        <div>
          <label htmlFor={`series-wins-${captain.id}`} className="sr-only">
            {captain.name} matches won
          </label>
          <input
            id={`series-wins-${captain.id}`}
            type="number"
            min={0}
            max={MAX_SERIES_WINS}
            inputMode="numeric"
            value={wins}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (Number.isFinite(value)) onWinsChange(clampValue(value));
            }}
            aria-label={`${captain.name} matches won`}
            className="h-[72px] w-[92px] rounded-2xl border border-white/15 bg-[#06111b] text-center text-4xl font-black text-white outline-none transition focus:border-field/60 focus:ring-2 focus:ring-field/20"
          />
        </div>

        <button
          type="button"
          onClick={() => onWinsChange(clampValue(wins + 1))}
          disabled={wins === MAX_SERIES_WINS}
          aria-label={`Increase ${captain.name}'s series wins`}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border transition disabled:opacity-30",
            accent.button,
          )}
        >
          <Plus size={17} />
        </button>
      </div>
      <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">
        Match wins · 0 to {MAX_SERIES_WINS}
      </p>
    </div>
  );
}

function SeriesVerdict({
  captainA,
  captainB,
  winsA,
  winsB,
}: {
  captainA: Player;
  captainB: Player;
  winsA: number;
  winsB: number;
}) {
  const total = winsA + winsB;
  const outcome = getSeriesOutcomeLabel(winsA, winsB);
  const winner = outcome === "A" ? captainA : outcome === "B" ? captainB : null;

  if (total === 0) {
    return (
      <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3.5 text-sm text-slate-400">
        Set the match wins above to detect today&apos;s winning captain.
      </div>
    );
  }

  if (outcome === "tied") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-3 flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-3.5"
      >
        <Handshake size={18} className="mt-0.5 shrink-0 text-amber-300" />
        <div>
          <p className="text-sm font-black text-amber-100">
            Series level {winsA}–{winsB}
          </p>
          <p className="mt-0.5 text-[11px] text-amber-200/70">
            No winning captain today. Neither captain gets the highlight.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-3 flex items-start gap-3 rounded-2xl border border-field/20 bg-field/[0.06] p-3.5"
    >
      <Trophy size={18} className="mt-0.5 shrink-0 text-field" />
      <div>
        <p className="text-sm font-black text-field">
          {winner?.name} wins the day {winsA}–{winsB}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-400">
          The captain with more match wins is highlighted automatically.
        </p>
      </div>
    </div>
  );
}

export function MatchResultForm({
  captainA,
  captainB,
  captainAWins,
  captainBWins,
  summary,
  onSeriesScoreChange,
  onSummaryChange,
}: MatchResultFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label mb-0">Today&apos;s series score</p>
            <p className="mt-1 text-[11px] text-slate-500">
              Enter how many matches each captain won. A 1–1 score means no
              winning captain.
            </p>
          </div>
          <span className="chip mt-1 sm:mt-0">
            {captainAWins + captainBWins} match
            {captainAWins + captainBWins === 1 ? "" : "es"} played
          </span>
        </div>

        <div className="mt-3 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <SeriesScoreCard
            side="A"
            captain={captainA}
            wins={captainAWins}
            onWinsChange={(value) => onSeriesScoreChange("A", value)}
          />
          <div className="flex items-center justify-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#071320] text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
              VS
            </span>
          </div>
          <SeriesScoreCard
            side="B"
            captain={captainB}
            wins={captainBWins}
            onWinsChange={(value) => onSeriesScoreChange("B", value)}
          />
        </div>

        <SeriesVerdict
          captainA={captainA}
          captainB={captainB}
          winsA={captainAWins}
          winsB={captainBWins}
        />
      </div>

      <div>
        <label htmlFor="match-summary" className="label">
          Match score / short summary (optional)
        </label>
        <textarea
          id="match-summary"
          value={summary}
          onChange={(event) => onSummaryChange(event.target.value)}
          maxLength={120}
          rows={2}
          placeholder="e.g. 142/6 beat 138/8 · last-over finish"
          className="field resize-none text-sm leading-relaxed sm:text-xs"
        />
        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
          <span>Only appears on the team card when filled.</span>
          <span>{summary.length}/120</span>
        </div>
      </div>
    </div>
  );
}
