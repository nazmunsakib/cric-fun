import {
  Crown,
  Dices,
  Laugh,
  Sparkles,
  Star,
  Theater,
  VenetianMask,
} from "lucide-react";
import type { CardData, Player } from "@/types/cricket";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "@/components/ui/player-avatar";
import {
  CardContent,
  CardFooter,
  CardShell,
  CardTopBar,
} from "@/components/cards/card-shell";

function Confetti() {
  const bits = [
    { left: "4%", top: "28%", color: "#fb923c", size: 10, rotate: 20, round: false },
    { left: "91%", top: "17%", color: "#a78bfa", size: 8, rotate: -18, round: true },
    { left: "95%", top: "58%", color: "#35d6a4", size: 7, rotate: 30, round: false },
    { left: "7%", top: "71%", color: "#fbbf24", size: 7, rotate: -30, round: true },
    { left: "85%", top: "82%", color: "#fb923c", size: 6, rotate: 0, round: false },
    { left: "14%", top: "45%", color: "#a78bfa", size: 5, rotate: 45, round: true },
    { left: "73%", top: "25%", color: "#fbbf24", size: 5, rotate: 12, round: false },
    { left: "27%", top: "88%", color: "#a78bfa", size: 6, rotate: -42, round: false },
    { left: "48%", top: "8%", color: "#35d6a4", size: 4, rotate: 16, round: true },
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {bits.map((bit, index) => (
        <span
          key={index}
          className={cn("absolute opacity-60", bit.round ? "rounded-full" : "rounded-[2px]")}
          style={{
            left: bit.left,
            top: bit.top,
            width: bit.size,
            height: bit.size,
            backgroundColor: bit.color,
            transform: `rotate(${bit.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function JokerDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#fb923c 0% 25%, transparent 0% 50%)",
          backgroundSize: "110px 110px",
        }}
      />
      <div className="absolute -left-[92px] top-[265px] h-[370px] w-[370px] rounded-full border-[30px] border-[#a78bfa]/[0.075]" />
      <div className="absolute -right-[80px] top-[120px] h-[300px] w-[300px] rotate-12 rounded-[54px] border-2 border-dashed border-[#fb923c]/20" />
      <div className="absolute -bottom-[110px] right-[40px] h-[320px] w-[320px] rotate-6 rounded-full border-[22px] border-[#fb923c]/[0.05]" />
      <VenetianMask
        size={390}
        strokeWidth={0.55}
        className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 -rotate-6 text-[#fb923c]/[0.045]"
      />
      <span className="absolute left-[26px] top-[350px] -rotate-12 text-[155px] font-black leading-none tracking-[-0.08em] text-white/[0.04]">
        HA
      </span>
      <span className="absolute bottom-[255px] right-[22px] rotate-12 text-[112px] font-black leading-none tracking-[-0.08em] text-white/[0.04]">
        HA
      </span>
      <Dices
        size={108}
        strokeWidth={1.1}
        className="absolute bottom-[180px] right-[72px] rotate-12 text-[#a78bfa]/[0.08]"
      />
      <Sparkles
        size={34}
        className="absolute right-[118px] top-[284px] -rotate-12 text-[#fb923c]/30"
      />
    </div>
  );
}

function FlopTile({
  player,
  rank,
  photoMax,
  wrapperMax,
  nameSize,
  compact,
  portrait,
  rotation,
}: {
  player: Player;
  rank: number;
  photoMax: number;
  wrapperMax: number;
  nameSize: string;
  compact: boolean;
  portrait: boolean;
  rotation: number;
}) {
  return (
    <div
      className={cn("min-w-0", !compact && "mx-auto w-full")}
      style={
        compact
          ? undefined
          : { maxWidth: wrapperMax, transform: `rotate(${rotation}deg)` }
      }
    >
      <div
        className={cn(
          !compact &&
            "rounded-[22px] border-2 border-[#fb923c]/35 bg-[#150d27] p-[8px] pb-[12px]",
        )}
        style={
          compact
            ? undefined
            : {
                boxShadow:
                  "7px 7px 0 rgba(167,139,250,0.16), 0 18px 42px -28px rgba(0,0,0,0.8)",
              }
        }
      >
        <div
          className="relative mx-auto w-full"
          style={{ maxWidth: photoMax }}
        >
          {rank === 1 ? (
            <span className="absolute -right-3 -top-3 z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full border-[4px] border-[#150d27] bg-[#fbbf24] text-[#2b1704] shadow-lg">
              <Crown size={16} fill="currentColor" />
            </span>
          ) : null}
          <span className="absolute -left-2 top-2 z-10 rounded-full bg-[#fb923c] px-[10px] py-[5px] text-[10px] font-black uppercase tracking-[0.12em] text-[#241006] shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
            Flop {String(rank).padStart(2, "0")}
          </span>
          <PlayerAvatar
            player={player}
            className={cn(
              "w-full border-2 border-[#fb923c]/55",
              portrait && !compact ? "aspect-[4/5]" : "aspect-square",
            )}
            rounded={compact ? "full" : "xl"}
            priority={rank === 1}
          />
          {rank === 1 ? (
            <span className="absolute -bottom-2 right-2 z-10 rotate-[-5deg] rounded-[5px] border border-[#1c102a] bg-[#a78bfa] px-[9px] py-[4px] text-[9px] font-black uppercase tracking-[0.12em] text-[#180d2c] shadow-md">
              Top flop
            </span>
          ) : null}
        </div>
        <p
          className={cn(
            "line-clamp-2 max-w-full text-center font-black leading-[1.02] tracking-[-0.03em] text-white",
            nameSize,
            compact ? "mt-[12px]" : "mt-[13px]",
          )}
        >
          {player.name}
        </p>
        <p className="mt-[7px] flex items-center justify-center gap-[5px] text-[9px] font-black uppercase tracking-[0.18em] text-[#fb923c]/75">
          <Laugh size={10} />
          Certified flop
        </p>
      </div>
    </div>
  );
}

export function AshrafulOfTheDayCard({ data }: { data: CardData }) {
  const flops = data.ashrafuls;
  const count = flops.length;
  const columns =
    count <= 3 ? Math.max(count, 1) : count === 4 ? 2 : count <= 6 ? 3 : 4;
  const photoMax =
    count === 1
      ? 348
      : count === 2
        ? 316
        : count <= 3
          ? 272
          : count === 4
            ? 220
            : count <= 6
              ? 222
              : 180;
  const wrapperMax = photoMax + 24;
  const nameSize =
    count === 1
      ? "text-[47px]"
      : count === 2
        ? "text-[38px]"
        : count <= 3
          ? "text-[27px]"
          : count === 4
            ? "text-[22px]"
            : count <= 6
              ? "text-[25px]"
              : "text-[17px]";
  const compact = count > 6;
  const rotations = [-1.1, 0.9, -0.7, 1.0, -0.5, 0.6];

  return (
    <CardShell accent="flame">
      <JokerDecor />
      <Confetti />
      <CardTopBar date={data.date} />

      <CardContent className="pt-[28px]">
        <div className="relative flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-[9px] text-[12px] font-black uppercase tracking-[0.3em] text-[#fb923c]">
              <Theater size={16} />
              The daily joker award
            </p>
            <h1 className="mt-[8px] text-[86px] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white">
              Ashraful
            </h1>
            <div className="mt-[7px] flex flex-wrap items-center gap-x-[14px] gap-y-2">
              <p className="text-[48px] font-black uppercase leading-none tracking-[-0.035em] text-[#fb923c]">
                of the day
              </p>
              <span className="flex h-[35px] -rotate-3 items-center rounded-[5px] border border-[#140b24] bg-[#a78bfa] px-[13px] text-[10px] font-black uppercase tracking-[0.16em] text-[#180d2c] shadow-[4px_4px_0_rgba(251,146,60,0.26)]">
                Flop club
              </span>
            </div>
            <p className="mt-[11px] text-[19px] font-semibold text-slate-400">
              For services to comedy cricket.
            </p>
          </div>

          <div className="relative h-[116px] w-[116px] shrink-0 -rotate-6">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#fb923c]/55 bg-[#fb923c]/[0.07]" />
            <div className="absolute inset-[7px] rounded-full border border-[#a78bfa]/40 bg-[#190f2e]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <VenetianMask
                size={33}
                strokeWidth={1.6}
                className="text-[#fb923c]"
              />
              <span className="mt-[3px] text-[7px] font-black uppercase tracking-[0.18em] text-[#c4b5fd]">
                Certified
              </span>
              <span className="text-[19px] font-black uppercase leading-none tracking-[-0.02em] text-[#fff2d0]">
                Joker
              </span>
            </div>
            <span className="absolute -right-2 -top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#a78bfa] text-[#180d2c] shadow-lg">
              <Star size={15} fill="currentColor" />
            </span>
            <span className="absolute -bottom-3 left-2 rotate-[5deg] rounded-[4px] bg-[#fb923c] px-[7px] py-[3px] text-[7px] font-black uppercase tracking-[0.12em] text-[#241006]">
              No refunds
            </span>
          </div>
        </div>

        <div
          className="relative mt-[18px] -rotate-[0.6deg] rounded-[11px] border-2 border-[#150d22] bg-[#fb923c] px-[20px] py-[9px]"
          style={{ boxShadow: "7px 7px 0 rgba(167,139,250,0.23)" }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="flex items-center gap-[8px] text-[11px] font-black uppercase tracking-[0.16em] text-[#211006]">
              <Laugh size={14} />
              {count === 0
                ? "The group chat is waiting"
                : `${count} legend${count === 1 ? "" : "s"} on today's flop list`}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3a1b08]">
              No appeals
            </p>
          </div>
        </div>

        {count > 0 && count <= 3 ? (
          <div className="relative mt-[17px] flex items-center gap-3">
            <div className="h-px flex-1 bg-[#fb923c]/20" />
            <span className="flex items-center gap-[7px] text-[10px] font-black uppercase tracking-[0.24em] text-[#c4b5fd]">
              <Theater size={13} />
              The walk of shame
            </span>
            <div className="h-px flex-1 bg-[#fb923c]/20" />
          </div>
        ) : null}

        <div className="relative flex w-full flex-1 items-center pt-[16px]">
          {count === 0 ? (
            <div className="w-full rounded-[28px] border-2 border-dashed border-[#fb923c]/30 bg-[#fb923c]/[0.035] px-10 py-16 text-center">
              <VenetianMask
                size={52}
                strokeWidth={1.2}
                className="mx-auto text-[#fb923c]/70"
              />
              <p className="mt-4 text-[30px] font-black text-white">
                Nobody flopped hard enough
              </p>
              <p className="mt-3 text-[17px] text-slate-500">
                Return to the builder and name at least one legend.
              </p>
            </div>
          ) : (
            <div
              className={cn(
                "grid w-full items-start",
                count === 1 && "mx-auto max-w-[390px]",
                count === 2 && "mx-auto max-w-[790px]",
              )}
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                columnGap: compact ? 18 : count > 3 ? 16 : 26,
                rowGap: compact ? 28 : count > 3 ? 26 : 30,
              }}
            >
              {flops.map((player, index) => (
                <FlopTile
                  key={player.id}
                  player={player}
                  rank={index + 1}
                  photoMax={photoMax}
                  wrapperMax={wrapperMax}
                  nameSize={nameSize}
                  compact={compact}
                  portrait={count <= 3}
                  rotation={count === 1 ? 0 : rotations[index % rotations.length]}
                />
              ))}
            </div>
          )}
        </div>

        {count > 0 && count <= 3 ? (
          <div className="relative mt-[16px] flex items-center gap-[10px] rounded-full border border-[#a78bfa]/25 bg-[#140d27] px-[18px] py-[9px]">
            <Laugh size={15} className="text-[#fb923c]" />
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#c4b5fd]">
              Crowd reaction
            </span>
            <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#fb923c] via-[#a78bfa] to-[#35d6a4]" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#fb923c]">
              Elite
            </span>
          </div>
        ) : null}

        {count > 0 ? (
          <div
            className={cn(
              "relative rounded-[20px] border-2 border-[#22132d] bg-[#fff1cd] px-[28px] py-[15px]",
              count <= 3 ? "mt-[28px]" : "mt-[18px]",
            )}
            style={{ boxShadow: "8px 8px 0 rgba(167,139,250,0.22)" }}
          >
            <span className="absolute -top-[13px] left-[24px] flex items-center gap-[6px] rounded-full bg-[#a78bfa] px-[11px] py-[5px] text-[9px] font-black uppercase tracking-[0.18em] text-[#170d2a]">
              <Laugh size={12} />
              Official roast
            </span>
            <p className="mt-[5px] text-center text-[22px] font-bold leading-[1.25] text-[#23152c]">
              {data.ashrafulCaption ? (
                <>&ldquo;{data.ashrafulCaption}&rdquo;</>
              ) : (
                "No caption needed. The scorecard is already laughing."
              )}
            </p>
            <span className="absolute -bottom-[10px] right-[58px] h-[22px] w-[22px] rotate-45 border-b-2 border-r-2 border-[#22132d] bg-[#fff1cd]" />
          </div>
        ) : null}
      </CardContent>

      <CardFooter date={data.date} />
    </CardShell>
  );
}
