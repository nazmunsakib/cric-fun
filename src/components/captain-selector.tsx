"use client";

import { useState } from "react";
import { ArrowLeftRight, Crown, UserRound, X } from "lucide-react";
import { players, getPlayers } from "@/data/players";
import type { TeamSide } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlayerAvatar } from "@/components/ui/player-avatar";
import { PlayerPicker } from "@/components/player-picker";

interface CaptainSelectorProps {
  captainAId: string | null;
  captainBId: string | null;
  onSelect: (side: TeamSide, playerId: string | null) => void;
}

function CaptainPanel({
  side,
  playerId,
  otherCaptainId,
  onSelect,
}: {
  side: TeamSide;
  playerId: string | null;
  otherCaptainId: string | null;
  onSelect: (side: TeamSide, playerId: string | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const player = getPlayers([playerId ?? ""])[0];
  const isOpen = editing || !player;
  const accent =
    side === "A"
      ? "border-field/25 bg-field/[0.055]"
      : "border-violet/25 bg-violet/[0.06]";

  return (
    <div
      className={cn("rounded-2xl border p-4", accent)}
      role="region"
      aria-label={`Captain ${side} selection`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg border",
              side === "A"
                ? "border-field/30 bg-field/10 text-field"
                : "border-violet/30 bg-violet/10 text-violet",
            )}
          >
            <Crown size={15} />
          </span>
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
              Team {side}
            </p>
            <p className="text-sm font-black text-white">Captain {side}</p>
          </div>
        </div>
        {player ? (
          <button
            type="button"
            onClick={() => {
              onSelect(side, null);
              setEditing(true);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/10 hover:text-white"
            aria-label={`Clear Captain ${side}`}
          >
            <X size={14} />
          </button>
        ) : null}
      </div>

      {player ? (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#06111b]/70 p-3">
          <PlayerAvatar
            player={player}
            className="h-16 w-16"
            showCaptain
            priority
            badgeClassName="top-1 right-1 h-5 w-5 text-[10px]"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-black text-white">
              {player.name}
            </p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Captain {side} · locked into Team {side}
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditing((value) => !value)}
          >
            {editing ? (
              "Done"
            ) : (
              <>
                <ArrowLeftRight size={13} />
                Change
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-dashed border-white/15 bg-[#06111b]/50 p-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-600">
            <UserRound size={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-white">No captain yet</p>
            <p className="text-[11px] text-slate-500">
              Search below to choose Captain {side}.
            </p>
          </div>
        </div>
      )}

      {isOpen ? (
        <PlayerPicker
          players={players}
          selectedId={playerId}
          onSelect={(id) => {
            onSelect(side, id);
            setEditing(false);
          }}
          disabledIds={otherCaptainId ? [otherCaptainId] : []}
          disabledReason="Already the other captain"
          searchPlaceholder={`Search Captain ${side}...`}
        />
      ) : null}
    </div>
  );
}

export function CaptainSelector({
  captainAId,
  captainBId,
  onSelect,
}: CaptainSelectorProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <CaptainPanel
        side="A"
        playerId={captainAId}
        otherCaptainId={captainBId}
        onSelect={onSelect}
      />
      <CaptainPanel
        side="B"
        playerId={captainBId}
        otherCaptainId={captainAId}
        onSelect={onSelect}
      />
    </div>
  );
}
