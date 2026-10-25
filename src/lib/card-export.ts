import { dateForFilename } from "@/lib/date-utils";
import type { CardKind } from "@/types/cricket";

const CARD_SLUGS: Record<CardKind, string> = {
  "team-photo": "team-photo",
  "best-batter": "best-batter",
  "best-bowler": "best-bowler",
  "captain-vs-captain": "captain-vs-captain",
  ashraful: "ashraful-of-the-day",
};

export function cardFileName(kind: CardKind, date: string): string {
  return `funny-cricket-${CARD_SLUGS[kind]}-${dateForFilename(date)}.png`;
}

export class CardShareUnsupportedError extends Error {
  constructor() {
    super(
      "This browser cannot attach image files to the share sheet. Open the app on your phone or use Download PNG.",
    );
    this.name = "CardShareUnsupportedError";
  }
}

function waitForImage(image: HTMLImageElement): Promise<void> {
  if (image.complete) {
    if (image.naturalWidth === 0) return Promise.resolve();
    if (typeof image.decode === "function") {
      return image.decode().catch(() => undefined);
    }
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
    window.setTimeout(finish, 4000);
  });
}

async function waitForCardAssets(node: HTMLElement): Promise<void> {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(images.map((image) => waitForImage(image)));
}

async function renderCardBlob(node: HTMLElement): Promise<Blob> {
  if (!node) throw new Error("The card is not ready yet.");
  await waitForCardAssets(node);

  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(node, {
    width: 1080,
    height: 1350,
    canvasWidth: 1080,
    canvasHeight: 1350,
    pixelRatio: 1,
    cacheBust: true,
    backgroundColor: "#07111d",
    style: {
      transform: "none",
      margin: "0",
    },
  });

  if (!blob) throw new Error("The image could not be generated.");
  return blob;
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function exportCardAsPng(
  node: HTMLElement,
  kind: CardKind,
  date: string,
): Promise<void> {
  const blob = await renderCardBlob(node);
  triggerDownload(blob, cardFileName(kind, date));
}

export async function shareCardAsPng(
  node: HTMLElement,
  kind: CardKind,
  date: string,
  metadata: { title: string; text?: string },
): Promise<void> {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.share !== "function"
  ) {
    throw new CardShareUnsupportedError();
  }

  const blob = await renderCardBlob(node);
  const file = new File([blob], cardFileName(kind, date), {
    type: "image/png",
  });

  if (
    typeof navigator.canShare === "function" &&
    !navigator.canShare({ files: [file] })
  ) {
    throw new CardShareUnsupportedError();
  }

  try {
    await navigator.share({
      files: [file],
      title: metadata.title,
      text: metadata.text,
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new CardShareUnsupportedError();
    }
    throw error;
  }
}
