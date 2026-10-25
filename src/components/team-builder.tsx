"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search, UsersRound, X } from "lucide-react";
import { getPlayers, players } from "@/data/players";
import type { Player, TeamSide } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";

interface TeamBuilderProps {
  captainAId: string | null;
  captainBId: string | null;
  teamAIds: string[];
  teamBIds: string[];
  onAssign: (playerId: string, side: TeamSide | null) => void;
}

function TeamPanel({
  side,
  captainId,
  playerIds,
  onAssign,
}: {
  side: TeamSide;
  captainId: string | null;
  playerIds: string[];
  onAssign: (playerId: string, side: TeamSide | null) => void;
}) {
  const roster = getPlayers(playerIds);
  const captain = roster.find((player) => player.id === captainId);
  const accent =
    side === "A"
      ? {
          panel: "border-field/20",
          header: "text-field",
          badge: "border-field/30 bg-field/10 text-field",
        }
      : {
          panel: "border-violet/20",
          header: "text-violet",
          badge: "border-violet/30 bg-violet/10 text-violet",
        };

  return (
    <section
      className={cn(
        "rounded-2xl border bg-[#07131f]/70 p-3.5",
        accent.panel,
      )}
      aria-label={`Team ${side} roster`}
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-7 min-w-7 items-center justify-center rounded-md border px-1.5 text-[10px] font-black uppercase tracking-[0.1em]",
              accent.badge,
            )}
          >
            {side}
          </span>
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-white">
              {captain ? `${captain.name}'s XI` : `Team ${side}`}
            </h3>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              {roster.length} player{roster.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">
          <UsersRound size={11} />
          Squad
        </span>
      </header>

      {roster.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 px-3 py-8 text-center text-[11px] text-slate-500">
          Captain {side} will appear here.
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-2">
          {roster.map((player) => {
            const isCaptain = player.id === captainId;
            return (
              <li key={player.id}>
                <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.025] p-1.5">
                  <PlayerAvatar
                    player={player}
                    className="aspect-square w-full"
                    rounded="xl"
                    showCaptain={isCaptain}
                    badgeClassName="top-1 right-1 h-4 w-4 text-[8px]"
                  />
                  <p className="mt-1.5 truncate text-center text-[10px] font-bold text-slate-200">
                    {player.name}
                  </p>
                  {!isCaptain ? (
                    <button
                      type="button"
                      onClick={() => onAssign(player.id, null)}
                      aria-label={`Remove ${player.name} from Team ${side}`}
                      className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-[#0b1927] text-slate-400 opacity-100 shadow-md transition hover:bg-rose-500/20 hover:text-rose-300 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {roster.length < 2 ? (
        <p className="mt-3 rounded-lg border border-amber-300/15 bg-amber-300/[0.06] px-2.5 py-1.5 text-[10px] font-semibold text-amber-200/90">
          Add at least one more player to this team.
        </p>
      ) : null}
    </section>
  );
}

export function TeamBuilder({
  captainAId,
  captainBId,
  teamAIds,
  teamBIds,
  onAssign,
}: TeamBuilderProps) {
  const [query, setQuery] = useState("");

  const assigned = useMemo(
    () => new Set([...teamAIds, ...teamBIds]),
    [teamAIds, teamBIds],
  );

  const unassigned = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return players.filter((player) => {
      if (assigned.has(player.id)) return false;
      if (!normalized) return true;
      return `${player.name} ${player.nickname ?? ""}`
        .toLowerCase()
        .includes(normalized);
    });
  }, [assigned, query]);

  const totalUnassigned = players.filter(
    (player) => !assigned.has(player.id),
  ).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-2">
        <TeamPanel
          side="A"
          captainId={captainAId}
          playerIds={teamAIds}
          onAssign={onAssign}
        />
        <TeamPanel
          side="B"
          captainId={captainBId}
          playerIds={teamBIds}
          onAssign={onAssign}
        />
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black text-white">
              Available players
              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                {totalUnassigned} unassigned
              </span>
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Send each player to Team A or Team B. Captains stay on their own
              side.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search available players..."
              aria-label="Search available players"
              className="field py-2 pl-8 text-xs"
            />
          </div>
        </div>

        {totalUnassigned === 0 ? (
          <div className="rounded-xl border border-field/15 bg-field/[0.04] px-4 py-5 text-center">
            <p className="text-sm font-bold text-field">Every player is assigned.</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Remove a player from a roster to send them back here.
            </p>
          </div>
        ) : unassigned.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 px-4 py-5 text-center text-[11px] text-slate-500">
            No unassigned player matches that search.
          </div>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {unassigned.map((player) => (
              <li key={player.id}>
                <UnassignedPlayer
                  player={player}
                  onAssign={onAssign}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3 rounded-2xl border border-field/10 bg-field/[0.04] p-4">
        <ArrowRight size={15} className="mt-0.5 shrink-0 text-field" />
        <p className="text-[11px] leading-relaxed text-slate-400">
          A player can only be on one roster. Assigning someone to a new team
          automatically removes them from the other side. Captains are immutable
          while they hold the armband.
        </p>
      </div>
    </div>
  );
}

function UnassignedPlayer({
  player,
  onAssign,
}: {
  player: Player;
  onAssign: (playerId: string, side: TeamSide | null) => void;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#0a1826] p-2">
      <PlayerAvatar
        player={player}
        className="h-10 w-10"
        rounded="lg"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-white">{player.name}</p>
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500">
          Ready to assign
        </p>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={() => onAssign(player.id, "A")}
          aria-label={`Assign ${player.name} to Team A`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-field/25 bg-field/10 text-[11px] font-black text-field transition hover:bg-field hover:text-[#04251b]"
        >
          A
        </button>
        <button
          type="button"
          onClick={() => onAssign(player.id, "B")}
          aria-label={`Assign ${player.name} to Team B`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet/25 bg-violet/10 text-[11px] font-black text-violet transition hover:bg-violet hover:text-[#120b22]"
        >
          B
        </button>
      </div>
    </div>
  );
}
