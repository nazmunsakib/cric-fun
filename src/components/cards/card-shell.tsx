import { CalendarDays } from "lucide-react";
import { formatCardDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";
import type { Player } from "@/types/cricket";

export type CardAccent = "field" | "flame" | "violet" | "amber";

export const ACCENTS: Record<
  CardAccent,
  { color: string; soft: string; faint: string }
> = {
  field: {
    color: "#35d6a4",
    soft: "rgba(53,214,164,0.16)",
    faint: "rgba(53,214,164,0.06)",
  },
  flame: {
    color: "#fb923c",
    soft: "rgba(251,146,60,0.16)",
    faint: "rgba(251,146,60,0.06)",
  },
  violet: {
    color: "#a78bfa",
    soft: "rgba(167,139,250,0.16)",
    faint: "rgba(167,139,250,0.06)",
  },
  amber: {
    color: "#fbbf24",
    soft: "rgba(251,191,36,0.16)",
    faint: "rgba(251,191,36,0.06)",
  },
};

function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-[42px] w-[42px]" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="12" fill="#0e2730" stroke="rgba(53,214,164,0.35)" />
      <circle cx="20" cy="20" r="11.5" fill="#f4f1de" />
      <path
        d="M15.5 10c4.1 5.6 5.1 14.3 2.2 20M20 8.5c4 6.4 4.4 15.2.9 23"
        stroke="#7a2e1f"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <path d="M10 32 30 8" stroke="#35d6a4" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

export function CardTopBar({ date }: { date: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[14px]">
        <BrandMark />
        <div>
          <p className="text-[19px] font-black uppercase leading-none tracking-[0.12em] text-white">
            Funny Cricket
          </p>
          <p className="mt-[7px] text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
            Daily cricket cards
          </p>
        </div>
      </div>
      <div className="flex items-center gap-[10px] rounded-full border border-white/10 bg-white/[0.035] px-[20px] py-[12px]">
        <CalendarDays size={18} className="text-[#35d6a4]" />
        <span className="text-[17px] font-black uppercase tracking-[0.12em] text-slate-200">
          {formatCardDate(date)}
        </span>
      </div>
    </div>
  );
}

export function CardFooter({ date }: { date: string }) {
  return (
    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-[22px]">
      <div className="flex items-center gap-[10px]">
        <span className="h-[7px] w-[7px] rounded-full bg-[#35d6a4]" />
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Made for the group chat
        </p>
      </div>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
        {formatCardDate(date)}
      </p>
    </div>
  );
}

export function CardShell({
  children,
  accent = "field",
  className,
}: {
  children: React.ReactNode;
  accent?: CardAccent;
  className?: string;
}) {
  const colors = ACCENTS[accent];

  return (
    <div className={cn("card-surface", className)}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(650px 500px at 88% 0%, ${colors.soft}, transparent 68%), radial-gradient(520px 440px at 4% 100%, ${colors.faint}, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -right-[165px] -top-[150px] h-[520px] w-[520px] rounded-full border"
        style={{ borderColor: colors.soft }}
      />
      <div
        className="pointer-events-none absolute -right-[60px] -top-[50px] h-[310px] w-[310px] rounded-full border"
        style={{ borderColor: colors.faint }}
      />
      <div
        className="pointer-events-none absolute -bottom-[170px] -left-[190px] h-[500px] w-[500px] rounded-full border"
        style={{ borderColor: "rgba(255,255,255,0.045)" }}
      />
      <div className="card-grid-line pointer-events-none absolute inset-x-0 bottom-0 h-[450px] opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="relative z-10 flex h-full flex-col px-[64px] pb-[42px] pt-[54px]">
        {children}
      </div>
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-1 flex-col", className)}>{children}</div>;
}

export function CardPlayerTile({
  player,
  showCaptain = false,
  note,
  accent = "field",
  nameClassName,
  photoClassName,
  captionClassName,
}: {
  player: Player;
  showCaptain?: boolean;
  note?: string;
  accent?: CardAccent;
  nameClassName?: string;
  photoClassName?: string;
  captionClassName?: string;
}) {
  const colors = ACCENTS[accent];

  return (
    <div className="flex min-w-0 flex-col items-center">
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-[26px] border bg-[#102738]",
          photoClassName,
        )}
        style={{ borderColor: "rgba(255,255,255,0.13)" }}
      >
        <PlayerAvatar
          player={player}
          className="h-full w-full rounded-[25px]"
          showCaptain={showCaptain}
          badgeClassName="top-[10px] right-[10px] h-[28px] w-[28px] text-[14px]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#04101a]/70 to-transparent" />
      </div>
      <p
        className={cn(
          "mt-[12px] line-clamp-2 text-center font-black leading-[1.05] tracking-[-0.01em] text-white",
          nameClassName,
        )}
      >
        {player.name}
      </p>
      {note ? (
        <p
          className={cn(
            "mt-[8px] max-w-full rounded-full border px-[13px] py-[5px] text-center text-[15px] font-bold leading-tight",
            captionClassName,
          )}
          style={{
            borderColor: colors.soft,
            backgroundColor: colors.faint,
            color: colors.color,
          }}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function CardBallDecoration({
  accent = "field",
  className,
}: {
  accent?: CardAccent;
  className?: string;
}) {
  const colors = ACCENTS[accent];
  return (
    <svg
      viewBox="0 0 220 220"
      className={cn("pointer-events-none absolute opacity-[0.12]", className)}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="110" cy="110" r="92" stroke={colors.color} strokeWidth="3" />
      <path
        d="M47 77c30 10 48 30 58 63M74 42c21 25 42 39 82 47M94 27c20 31 38 54 76 71M130 26c-3 38 4 70 22 99"
        stroke={colors.color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 8"
      />
    </svg>
  );
}
