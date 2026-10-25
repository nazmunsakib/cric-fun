"use client";

import { useMemo, useState } from "react";
import { Check, Search, UserRound, X } from "lucide-react";
import type { Player } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";

interface PlayerPickerProps {
  players: Player[];
  selectedId: string | null;
  onSelect: (playerId: string) => void;
  disabledIds?: string[];
  disabledReason?: string;
  searchPlaceholder?: string;
  emptyLabel?: string;
}

export function PlayerPicker({
  players,
  selectedId,
  onSelect,
  disabledIds = [],
  disabledReason = "Already selected",
  searchPlaceholder = "Search players...",
  emptyLabel = "No players match that search.",
}: PlayerPickerProps) {
  const [query, setQuery] = useState("");
  const disabled = useMemo(() => new Set(disabledIds), [disabledIds]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return players;
    return players.filter((player) =>
      `${player.name} ${player.nickname ?? ""}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [players, query]);

  return (
    <div>
      <div className="relative">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="field pl-9 pr-9"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-white/10 hover:text-white"
          >
            <X size={13} />
          </button>
        ) : null}
      </div>

      <div className="scroll-area mt-2 grid max-h-64 gap-1.5 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 px-4 py-7 text-center">
            <UserRound size={20} className="text-slate-600" />
            <p className="text-xs text-slate-500">{emptyLabel}</p>
          </div>
        ) : (
          filtered.map((player) => {
            const isSelected = player.id === selectedId;
            const isDisabled = disabled.has(player.id);

            return (
              <button
                key={player.id}
                type="button"
                aria-pressed={isSelected}
                disabled={isDisabled}
                onClick={() => onSelect(player.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-2.5 py-2 text-left transition",
                  isSelected
                    ? "border-field/40 bg-field/[0.09]"
                    : "border-transparent hover:border-white/10 hover:bg-white/[0.04]",
                  isDisabled && "cursor-not-allowed opacity-40",
                )}
              >
                <PlayerAvatar
                  player={player}
                  className="h-9 w-9"
                  rounded="full"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-bold text-white">
                    {player.name}
                  </span>
                  {isDisabled ? (
                    <span className="block truncate text-[10px] text-slate-500">
                      {disabledReason}
                    </span>
                  ) : player.nickname ? (
                    <span className="block truncate text-[10px] text-slate-500">
                      {player.nickname}
                    </span>
                  ) : null}
                </span>
                {isSelected ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-field text-[#05241a]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                ) : (
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">
                    Pick
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
