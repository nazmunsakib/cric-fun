"use client";

import { useCallback, useRef, useState } from "react";
import { loadCaptions, saveCaptions } from "@/lib/storage";

const CAPTION_STORAGE_ERROR =
  "Caption could not be saved in this browser. It will still appear on the cards.";

export function useAshrafulCaptions() {
  const [captions, setCaptions] = useState<Record<string, string>>(() =>
    loadCaptions(),
  );
  const captionsRef = useRef(captions);
  const [storageError, setStorageError] = useState<string | null>(null);

  const updateCaption = useCallback((date: string, caption: string) => {
    const next = { ...captionsRef.current, [date]: caption };
    captionsRef.current = next;
    setCaptions(next);
    setStorageError(saveCaptions(next) ? null : CAPTION_STORAGE_ERROR);
  }, []);

  return {
    captions,
    loaded: true,
    storageError,
    updateCaption,
  };
}
