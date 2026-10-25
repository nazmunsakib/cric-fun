export const CAPTIONS_STORAGE_KEY = "funny-cricket:captions:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function loadCaptions(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CAPTIONS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return {};
    const captions: Record<string, string> = {};
    for (const [date, caption] of Object.entries(parsed)) {
      if (typeof caption === "string" && caption.trim()) {
        captions[date] = caption;
      }
    }
    return captions;
  } catch {
    return {};
  }
}

export function saveCaptions(captions: Record<string, string>): boolean {
  if (typeof window === "undefined") return false;
  try {
    const clean: Record<string, string> = {};
    for (const [date, caption] of Object.entries(captions)) {
      if (caption.trim()) clean[date] = caption;
    }
    window.localStorage.setItem(
      CAPTIONS_STORAGE_KEY,
      JSON.stringify(clean),
    );
    return true;
  } catch {
    return false;
  }
}
