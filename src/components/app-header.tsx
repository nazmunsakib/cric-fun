import { CalendarDays, CloudOff, Sparkles } from "lucide-react";

function CricketMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-field/30 bg-gradient-to-br from-field/25 via-[#0f2a2a] to-[#0b1a29] shadow-[0_18px_40px_-24px_rgba(53,214,164,0.9)]">
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="12" fill="#f4f1de" />
        <path
          d="M15 9.5c4.5 5.8 5.6 15.2 2.4 21M20 8c4.3 6.7 4.8 16.2 1 24"
          stroke="#7a2e1f"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="2.2 2.2"
        />
        <path
          d="M9 34 31 6"
          stroke="#35d6a4"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-x-3 bottom-0 h-2 rounded-full bg-field/20 blur-md" />
    </div>
  );
}

export function AppHeader() {
  return (
    <header className="relative z-10 border-b border-white/[0.07] bg-[#060e17]/80">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3 sm:gap-3.5">
          <CricketMark />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white sm:text-2xl">
                Cric Fun
              </h1>
              <span className="hidden items-center gap-1 rounded-full border border-field/20 bg-field/[0.08] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-field min-[360px]:inline-flex">
                <Sparkles size={10} />
                Daily cards
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
              Create today&apos;s cricket cards in minutes.
            </p>
          </div>
        </div>

        <div className="hidden flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:flex">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <CalendarDays size={12} className="text-field" />
            Match-day studio
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <CloudOff size={12} className="text-violet" />
            No server needed
          </span>
        </div>
      </div>
    </header>
  );
}
