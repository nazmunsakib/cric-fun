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

function triggerDownload(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function exportCardAsPng(
  node: HTMLElement,
  kind: CardKind,
  date: string,
): Promise<void> {
  if (!node) throw new Error("The card is not ready yet.");
  await waitForCardAssets(node);

  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(node, {
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

  if (!dataUrl) throw new Error("The image could not be generated.");
  triggerDownload(dataUrl, cardFileName(kind, date));
}
