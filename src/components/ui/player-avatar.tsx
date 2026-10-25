/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { Player } from "@/types/cricket";
import { cn } from "@/lib/utils";

interface PlayerAvatarProps {
  player: Player;
  className?: string;
  imageClassName?: string;
  showCaptain?: boolean;
  badgeClassName?: string;
  rounded?: "full" | "2xl" | "xl" | "lg";
  priority?: boolean;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function PlayerAvatar({
  player,
  className,
  imageClassName,
  showCaptain = false,
  badgeClassName,
  rounded = "2xl",
  priority = false,
}: PlayerAvatarProps) {
  const [failed, setFailed] = useState(false);
  const radius =
    rounded === "full"
      ? "rounded-full"
      : rounded === "xl"
        ? "rounded-xl"
        : rounded === "lg"
          ? "rounded-lg"
          : "rounded-2xl";

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-[#102738]",
        radius,
        className,
      )}
    >
      {failed ? (
        <div
          className={cn("card-initials h-full w-full", radius)}
          role="img"
          aria-label={`${player.name} avatar placeholder`}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="28"
              fontWeight="900"
              fill="rgba(255,255,255,0.9)"
            >
              {initials(player.name)}
            </text>
          </svg>
        </div>
      ) : (
        <img
          src={player.image}
          alt={`${player.name}${player.nickname ? ` (${player.nickname})` : ""}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", radius, imageClassName)}
        />
      )}
      {showCaptain ? (
        <span
          className={cn(
            "captain-badge h-5 w-5 text-[10px]",
            badgeClassName,
          )}
          aria-label="Captain"
        >
          C
        </span>
      ) : null}
    </div>
  );
}
