export const CAPTIONS_STORAGE_KEY = "cric-fun:captions:v1";
const LEGACY_CAPTIONS_STORAGE_KEY = "funny-cricket:captions:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseCaptions(raw: string | null): Record<string, string> {
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
}

export function loadCaptions(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const current = window.localStorage.getItem(CAPTIONS_STORAGE_KEY);
    const legacy =
      current === null
        ? window.localStorage.getItem(LEGACY_CAPTIONS_STORAGE_KEY)
        : null;
    const captions = parseCaptions(current ?? legacy);
    if (current === null && legacy) {
      window.localStorage.setItem(
        CAPTIONS_STORAGE_KEY,
        JSON.stringify(captions),
      );
      window.localStorage.removeItem(LEGACY_CAPTIONS_STORAGE_KEY);
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
    window.localStorage.removeItem(LEGACY_CAPTIONS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
