export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

export function clampNumber(value: number, min = 0): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.floor(value));
}
