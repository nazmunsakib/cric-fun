"use client";

import { useMemo, useState } from "react";
import {
  Check,
  CircleDot,
  Search,
  Target,
  Trash2,
  X,
} from "lucide-react";
import type { Player, TeamSide } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlayerAvatar } from "@/components/ui/player-avatar";

interface BestPlayerSelectorProps {
  kind: "batter" | "bowler";
  players: Player[];
  selectedIds: string[];
  notes: Record<string, string>;
  teamFor: (playerId: string) => TeamSide | null;
  onToggle: (playerId: string) => void;
  onClear: () => void;
  onNoteChange: (playerId: string, note: string) => void;
}

const COPY = {
  batter: {
    noun: "batter",
    noteLabel: "Performance detail (optional)",
    notePlaceholder: "e.g. 64 runs off 38 balls · 7 fours",
    empty: "Select the innings worth bragging about.",
    icon: CircleDot,
    accent: "flame",
  },
  bowler: {
    noun: "bowler",
    noteLabel: "Bowling figures (optional)",
    notePlaceholder: "e.g. 4 overs · 3 wickets · 18 runs",
    empty: "Select the spell that broke the game open.",
    icon: Target,
    accent: "field",
  },
} as const;

export function BestPlayerSelector({
  kind,
  players,
  selectedIds,
  notes,
  teamFor,
  onToggle,
  onClear,
  onNoteChange,
}: BestPlayerSelectorProps) {
  const [query, setQuery] = useState("");
  const copy = COPY[kind];
  const Icon = copy.icon;
  const selected = useMemo(
    () =>
      selectedIds
        .map((id) => players.find((player) => player.id === id))
        .filter((player): player is Player => Boolean(player)),
    [players, selectedIds],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return players;
    return players.filter((player) =>
      `${player.name} ${player.nickname ?? ""}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [players, query]);

  const accentClasses =
    kind === "batter"
      ? {
          box: "border-flame/20 bg-flame/[0.05]",
          icon: "bg-flame/10 text-flame",
          active: "border-flame/40 bg-flame/[0.08]",
          check: "bg-flame text-[#241006]",
        }
      : {
          box: "border-field/20 bg-field/[0.05]",
          icon: "bg-field/10 text-field",
          active: "border-field/40 bg-field/[0.08]",
          check: "bg-field text-[#05241a]",
        };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              accentClasses.icon,
            )}
          >
            <Icon size={15} />
          </span>
          <div>
            <p className="text-sm font-black text-white">
              Selected best {copy.noun}
              {selected.length === 1 ? "" : "s"}
            </p>
            <p className="text-[10px] text-slate-500">
              One or more · either team
            </p>
          </div>
        </div>
        {selected.length > 0 ? (
          <Button size="sm" variant="ghost" onClick={onClear}>
            <Trash2 size={13} />
            Clear all
          </Button>
        ) : null}
      </div>

      {selected.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.015] px-4 py-7 text-center">
          <Icon size={22} className="mx-auto mb-2 text-slate-600" />
          <p className="text-sm font-bold text-slate-300">{copy.empty}</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Tap any player below to add them to the card.
          </p>
        </div>
      ) : (
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {selected.map((player) => {
            const team = teamFor(player.id);
            return (
              <li
                key={player.id}
                className={cn(
                  "rounded-2xl border p-3",
                  accentClasses.box,
                )}
              >
                <div className="flex items-center gap-3">
                  <PlayerAvatar
                    player={player}
                    className="h-14 w-14"
                    rounded="xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-white">
                      {player.name}
                    </p>
                    <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Team {team ?? "?"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggle(player.id)}
                    aria-label={`Remove ${player.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/10 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
                <label
                  htmlFor={`${kind}-note-${player.id}`}
                  className="label mt-2.5 text-[9px]"
                >
                  {copy.noteLabel}
                </label>
                <input
                  id={`${kind}-note-${player.id}`}
                  type="text"
                  value={notes[player.id] ?? ""}
                  onChange={(event) =>
                    onNoteChange(player.id, event.target.value)
                  }
                  maxLength={60}
                  placeholder={copy.notePlaceholder}
                  className="field py-2 text-xs"
                />
              </li>
            );
          })}
        </ul>
      )}

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold text-white">
            Pick from both teams
          </p>
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${copy.noun}s...`}
              aria-label={`Search ${copy.noun}s`}
              className="field py-2 pl-8 text-xs"
            />
          </div>
        </div>

        {players.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-[11px] text-slate-500">
            Assign players to a team first.
          </p>
        ) : filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-[11px] text-slate-500">
            No player matches that search.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((player) => {
              const isSelected = selectedIds.includes(player.id);
              const team = teamFor(player.id);
              return (
                <li key={player.id}>
                  <button
                    type="button"
                    onClick={() => onToggle(player.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl border p-2 text-left transition",
                      isSelected
                        ? accentClasses.active
                        : "border-white/[0.06] bg-[#081522] hover:border-white/15 hover:bg-white/[0.035]",
                    )}
                  >
                    <PlayerAvatar
                      player={player}
                      className="h-9 w-9"
                      rounded="lg"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold text-white">
                        {player.name}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                        Team {team ?? "?"}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border",
                        isSelected
                          ? cn("border-transparent", accentClasses.check)
                          : "border-white/15 text-transparent",
                      )}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-[10px] leading-relaxed text-slate-500">
        Details are optional. Leave the field blank and the card will show only
        the selected player&apos;s photo and name — no invented statistics.
      </p>
    </div>
  );
}
