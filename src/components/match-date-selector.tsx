"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatCardDate,
  formatLongDate,
  getLocalTodayISO,
  shiftISODate,
} from "@/lib/date-utils";

interface MatchDateSelectorProps {
  date: string;
  onChange: (date: string) => void;
}

export function MatchDateSelector({ date, onChange }: MatchDateSelectorProps) {
  const today = getLocalTodayISO();
  const yesterday = shiftISODate(today, -1);

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-field/20 bg-gradient-to-br from-field/[0.11] via-[#0a1c27] to-[#0a1725] p-5 sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full border border-field/10" />
        <div className="pointer-events-none absolute -right-4 -top-8 h-32 w-32 rounded-full border border-field/10" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-field">
              <CalendarDays size={13} />
              Selected match day
            </p>
            <p className="text-3xl font-black leading-none tracking-[-0.03em] text-white sm:text-5xl">
              {formatCardDate(date)}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-400">
              <Clock3 size={14} />
              {formatLongDate(date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              aria-label="Previous day"
              onClick={() => onChange(shiftISODate(date, -1))}
            >
              <ChevronLeft size={15} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              aria-label="Next day"
              onClick={() => onChange(shiftISODate(date, 1))}
            >
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="match-date" className="label">
            Choose the date
          </label>
          <input
            id="match-date"
            type="date"
            value={date}
            onChange={(event) => {
              if (event.target.value) onChange(event.target.value);
            }}
            className="field h-12 text-base font-semibold"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button
            variant={date === today ? "primary" : "secondary"}
            onClick={() => onChange(today)}
          >
            Today
          </Button>
          <Button
            variant={date === yesterday ? "primary" : "secondary"}
            onClick={() => onChange(yesterday)}
          >
            Yesterday
          </Button>
        </div>
      </div>

      <div className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-flame/10 text-flame">
          <CalendarDays size={15} />
        </span>
        <div>
          <p className="text-sm font-bold text-white">One date, all five cards</p>
          <p className="muted mt-0.5 text-xs">
            This date is printed on every card and included in every PNG
            filename. Change it once and every card follows.
          </p>
        </div>
      </div>
    </div>
  );
}
