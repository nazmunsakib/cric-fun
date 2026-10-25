"use client";

import { Check, Lock } from "lucide-react";
import { STEPS } from "@/lib/steps";
import { cn } from "@/lib/utils";

interface StepperProps {
  current: number;
  furthest: number;
  onSelect: (step: number) => void;
}

export function Stepper({ current, furthest, onSelect }: StepperProps) {
  const progress = ((current + 1) / STEPS.length) * 100;

  return (
    <div className="panel p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-400">
          Match workflow
        </p>
        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-field">
          {current + 1} / {STEPS.length}
        </span>
      </div>

      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-field to-emerald-300 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav aria-label="Match setup steps">
        <ol className="space-y-1">
          {STEPS.map((step, index) => {
            const isCurrent = index === current;
            const isReached = index <= furthest;
            const isComplete = index < furthest && !isCurrent;
            const Icon = step.icon;

            return (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  disabled={!isReached}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition",
                    isCurrent
                      ? "bg-field/[0.09] text-white"
                      : isReached
                        ? "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                        : "text-slate-600",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[11px] font-black transition",
                      isCurrent
                        ? "border-field/40 bg-field text-[#06251b]"
                        : isComplete
                          ? "border-field/20 bg-field/10 text-field"
                          : isReached
                            ? "border-white/10 bg-white/[0.04] text-slate-400"
                            : "border-white/[0.06] bg-transparent text-slate-600",
                    )}
                  >
                    {isComplete ? (
                      <Check size={13} strokeWidth={3} />
                    ) : !isReached ? (
                      <Lock size={11} />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold">
                      {step.title}
                    </span>
                    {isCurrent ? (
                      <span className="mt-0.5 block truncate text-[10px] text-slate-400">
                        {step.description}
                      </span>
                    ) : null}
                  </span>
                  <Icon
                    size={14}
                    className={cn(
                      "shrink-0",
                      isCurrent ? "text-field" : "text-slate-600",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
