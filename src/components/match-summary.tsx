"use client";

import {
  CalendarDays,
  CircleDot,
  Crown,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { getPlayers } from "@/data/players";
import { getSeriesOutcomeLabel, getSetupTeamIds } from "@/lib/card-data";
import { formatShortDate } from "@/lib/date-utils";
import type { MatchSetup } from "@/types/cricket";
import { PlayerAvatar } from "@/components/ui/player-avatar";

interface MatchSummaryProps {
  setup: MatchSetup;
}

function SummaryRow({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-slate-500">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        <p
          className={
            accent
              ? "truncate text-xs font-bold text-field"
              : "truncate text-xs font-semibold text-slate-200"
          }
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function MatchSummary({ setup }: MatchSummaryProps) {
  const captainA = getPlayers([setup.captainAId ?? ""])[0];
  const captainB = getPlayers([setup.captainBId ?? ""])[0];
  const teamIds = getSetupTeamIds(setup);
  const ashrafuls = getPlayers(setup.ashrafulIds);
  const seriesTotal = setup.captainAWins + setup.captainBWins;
  const seriesOutcome = getSeriesOutcomeLabel(
    setup.captainAWins,
    setup.captainBWins,
  );

  return (
    <div className="panel p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-400">
          Today&apos;s series
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-field/10 px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-field">
          <span className="h-1.5 w-1.5 rounded-full bg-field" />
          Live setup
        </span>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#071320] p-3">
        <SummaryRow
          icon={<CalendarDays size={14} />}
          label="Match date"
          value={formatShortDate(setup.date)}
          accent
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { captain: captainA, side: "A", count: teamIds.teamA.length },
          { captain: captainB, side: "B", count: teamIds.teamB.length },
        ].map(({ captain, side, count }) => (
          <div
            key={side}
            className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
                Team {side}
              </span>
              <Crown size={11} className="text-amber-300" />
            </div>
            {captain ? (
              <>
                <PlayerAvatar
                  player={captain}
                  className="mb-2 h-8 w-8"
                  rounded="full"
                  showCaptain
                  badgeClassName="top-0.5 right-0.5 h-3 w-3 text-[6px]"
                />
                <p className="truncate text-[11px] font-bold text-white">
                  {captain.name}
                </p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {count} player{count === 1 ? "" : "s"}
                </p>
              </>
            ) : (
              <p className="py-3 text-[10px] text-slate-500">Not selected</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
        <SummaryRow
          icon={<Trophy size={14} />}
          label="Series"
          value={
            seriesTotal === 0
              ? "No series score"
              : seriesOutcome === "tied"
                ? `Level ${setup.captainAWins}–${setup.captainBWins} · no winning captain`
                : `${setup.captainAWins}–${setup.captainBWins} · ${
                    seriesOutcome === "A"
                      ? captainA?.name
                      : captainB?.name
                  } leads`
          }
          accent={seriesTotal > 0 && seriesOutcome !== "tied"}
        />
        <SummaryRow
          icon={<UsersRound size={14} />}
          label="Teams"
          value={
            captainA && captainB
              ? `${teamIds.teamA.length} v ${teamIds.teamB.length}`
              : "Waiting for captains"
          }
        />
        <SummaryRow
          icon={<CircleDot size={14} />}
          label="Best players"
          value={
            setup.bestBatterIds.length || setup.bestBowlerIds.length
              ? `${setup.bestBatterIds.length} bat · ${setup.bestBowlerIds.length} bowl`
              : "Not selected"
          }
        />
        <SummaryRow
          icon={<Sparkles size={14} />}
          label="Ashraful"
          value={
            ashrafuls.length === 0
              ? "Not selected"
              : ashrafuls.length === 1
                ? ashrafuls[0].name
                : `${ashrafuls.length} flops · ${ashrafuls.map((player) => player.name).join(", ")}`
          }
          accent={ashrafuls.length > 0}
        />
      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
        Card exports include only the card artwork, never this dashboard.
      </p>
    </div>
  );
}
