"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-field text-[#04251b] hover:bg-field-bright border border-transparent shadow-[0_14px_30px_-16px_rgba(53,214,164,0.8)]",
  secondary:
    "border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]",
  ghost:
    "border border-transparent bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white",
  danger:
    "border border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20",
  subtle:
    "border border-field/25 bg-field/10 text-field hover:bg-field/15",
};

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-lg px-3 text-xs gap-1.5",
  md: "h-11 rounded-xl px-4 text-sm gap-2",
  lg: "h-12 rounded-xl px-5 text-sm gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "secondary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-bold transition disabled:pointer-events-none disabled:opacity-45",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {children}
      </button>
    );
  },
);
