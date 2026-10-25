"use client";

import { useMemo, useState } from "react";
import {
  Flame,
  MessageSquareQuote,
  Search,
  Sparkles,
  Star,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { getPlayers, players } from "@/data/players";
import type { TeamSide } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";

interface AshrafulStepProps {
  playerIds: string[];
  caption: string;
  teamFor: (playerId: string) => TeamSide | null;
  onToggle: (playerId: string) => void;
  onClear: () => void;
  onCaptionChange: (caption: string) => void;
  storageError?: string | null;
}

export function AshrafulStep({
  playerIds,
  caption,
  teamFor,
  onToggle,
  onClear,
  onCaptionChange,
  storageError,
}: AshrafulStepProps) {
  const [query, setQuery] = useState("");
  const selected = getPlayers(playerIds);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return players;
    return players.filter((player) =>
      `${player.name} ${player.nickname ?? ""}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
      <div className="relative overflow-hidden rounded-2xl border border-flame/25 bg-gradient-to-br from-flame/[0.11] via-violet/[0.06] to-[#081420] p-5">
        <div className="pointer-events-none absolute -right-10 top-2 h-40 w-40 rounded-full border border-flame/10" />
        <div className="pointer-events-none absolute -right-2 top-10 h-24 w-24 rounded-full border border-violet/15" />

        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-flame">
              <Sparkles size={13} />
              The infamous daily flop award
            </div>
            <span className="rounded-full border border-flame/25 bg-flame/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-flame">
              {selected.length} on the list
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-black tracking-tight text-white">
                Today&apos;s flop list
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                Certified for services to comedy cricket. Select one or more
                legends — nobody is safe.
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 -rotate-6 items-center justify-center rounded-lg border-2 border-flame/40 bg-flame/[0.08] text-flame">
              <Flame size={18} />
            </span>
          </div>

          <div className="mt-4">
            {selected.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#07131f]/50 px-5 py-9 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-600">
                  <UserRound size={24} />
                </span>
                <p className="mt-3 text-sm font-black text-white">
                  No flops named yet
                </p>
                <p className="mt-1 max-w-[240px] text-[11px] leading-relaxed text-slate-500">
                  Somebody definitely deserves this. Pick one or more players
                  from the squad.
                </p>
              </div>
            ) : (
              <>
                <ul className="scroll-area max-h-[252px] space-y-1.5 overflow-y-auto pr-1">
                  {selected.map((player, index) => {
                    const team = teamFor(player.id);
                    return (
                      <li
                        key={player.id}
                        className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#07131f]/75 p-2"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-flame text-[10px] font-black text-[#241006]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <PlayerAvatar
                          player={player}
                          className="h-10 w-10"
                          rounded="full"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-black text-white">
                            {player.name}
                          </p>
                          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                            {team ? `Team ${team}` : "Unassigned player"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggle(player.id)}
                          aria-label={`Remove ${player.name} from the flop list`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/10 hover:text-white"
                        >
                          <X size={13} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.13em] text-flame/80">
                    <Star size={11} fill="currentColor" />
                    Flop order is ranked
                  </span>
                  <button
                    type="button"
                    onClick={onClear}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 transition hover:text-white"
                  >
                    <Trash2 size={11} />
                    Clear all
                  </button>
                </div>
              </>
            )}
          </div>

          <label htmlFor="ashraful-caption" className="label mt-5">
            Roast caption (optional)
          </label>
          <div className="relative">
            <MessageSquareQuote
              size={15}
              className="pointer-events-none absolute left-3 top-3 text-slate-500"
            />
            <textarea
              id="ashraful-caption"
              value={caption}
              onChange={(event) => onCaptionChange(event.target.value)}
              maxLength={120}
              rows={3}
              placeholder='e.g. "A masterclass in doing the absolute most."'
              className="field resize-none pl-9 text-xs leading-relaxed"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
            <span>Editable before export.</span>
            <span>{caption.length}/120</span>
          </div>

          {storageError ? (
            <p className="mt-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-3 py-2 text-[10px] leading-relaxed text-amber-200">
              {storageError}
            </p>
          ) : null}

          <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2.5">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-flame/80">
              Flop list rules
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
              1. No one is safe. 2. Captains count. 3. Appeals go straight to
              the group chat.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="mb-3">
          <p className="text-sm font-black text-white">
            Choose today&apos;s flops
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
            Tap to add or remove. Captains are absolutely eligible — the
            armband offers no protection here.
          </p>
        </div>

        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the whole squad..."
            aria-label="Search the whole squad for the flop list"
            className="field pl-9"
          />
        </div>

        <div className="scroll-area mt-2 grid max-h-[360px] gap-1.5 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 px-4 py-7 text-center">
              <p className="text-xs text-slate-500">
                No player matches that search.
              </p>
            </div>
          ) : (
            filtered.map((player) => {
              const selectedIndex = playerIds.indexOf(player.id);
              const isSelected = selectedIndex >= 0;
              const team = teamFor(player.id);
              return (
                <button
                  key={player.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onToggle(player.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border p-2 text-left transition",
                    isSelected
                      ? "border-flame/40 bg-flame/[0.08]"
                      : "border-transparent hover:border-white/10 hover:bg-white/[0.04]",
                  )}
                >
                  <PlayerAvatar
                    player={player}
                    className="h-9 w-9"
                    rounded="full"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-white">
                      {player.name}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      {team ? `Team ${team}` : "Unassigned"}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-[9px] font-black",
                      isSelected
                        ? "border-transparent bg-flame text-[#241006]"
                        : "border-white/15 text-slate-500",
                    )}
                  >
                    {isSelected ? selectedIndex + 1 : "+"}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="mt-3 rounded-xl border border-violet/15 bg-violet/[0.06] px-3 py-2.5">
          <p className="text-[10px] leading-relaxed text-slate-400">
            Keep it funny, not personal. The caption is stored in this browser
            by match date, so you can come back to it later.
          </p>
        </div>
      </div>
    </div>
  );
}
