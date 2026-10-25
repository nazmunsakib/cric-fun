"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CheckCircle2,
  Download,
  Eye,
  Info,
  Loader2,
  RefreshCw,
  Share2,
  Sparkles,
} from "lucide-react";
import { players } from "@/data/players";
import type { CardData, CardKind } from "@/types/cricket";
import {
  CardShareUnsupportedError,
  exportCardAsPng,
  shareCardAsPng,
} from "@/lib/card-export";
import { formatCardDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TeamPhotoCard } from "@/components/cards/team-photo-card";
import { BestBatterCard } from "@/components/cards/best-batter-card";
import { BestBowlerCard } from "@/components/cards/best-bowler-card";
import { CaptainVsCaptainCard } from "@/components/cards/captain-vs-captain-card";
import { AshrafulOfTheDayCard } from "@/components/cards/ashraful-of-the-day-card";

interface CardItem {
  kind: CardKind;
  title: string;
  subtitle: string;
  render: (data: CardData) => ReactNode;
}

const CARD_ITEMS: CardItem[] = [
  {
    kind: "team-photo",
    title: "Team Photo Card",
    subtitle: "Both squads, captain badges, and the daily series score.",
    render: (data) => <TeamPhotoCard data={data} />,
  },
  {
    kind: "best-batter",
    title: "Best Batter Card",
    subtitle: "The innings of the day, with any performance notes.",
    render: (data) => <BestBatterCard data={data} />,
  },
  {
    kind: "best-bowler",
    title: "Best Bowler Card",
    subtitle: "The spell of the day, with optional figures.",
    render: (data) => <BestBowlerCard data={data} />,
  },
  {
    kind: "captain-vs-captain",
    title: "Captain vs Captain",
    subtitle: "Today's series score with a most-wins highlight.",
    render: (data) => <CaptainVsCaptainCard data={data} />,
  },
  {
    kind: "ashraful",
    title: "Ashraful of the Day",
    subtitle: "The multi-player flop list. Handle with care.",
    render: (data) => <AshrafulOfTheDayCard data={data} />,
  },
];

interface Feedback {
  tone: "success" | "error" | "info";
  message: string;
}

function CardStage({
  children,
  cardRef,
}: {
  children: ReactNode;
  cardRef?: (node: HTMLDivElement | null) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const update = () => {
      setScale(element.clientWidth / 1080);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="card-stage">
      <div
        className="card-canvas"
        style={{
          transform: `scale(${scale || 0.001})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        <div ref={cardRef} style={{ width: 1080, height: 1350 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function CardPreview({
  item,
  data,
  registerRef,
  onPreview,
}: {
  item: CardItem;
  data: CardData;
  registerRef: (kind: CardKind, node: HTMLDivElement | null) => void;
  onPreview: (item: CardItem) => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [revision, setRevision] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      registerRef(item.kind, node);
    },
    [item.kind, registerRef],
  );

  async function handleDownload() {
    if (!nodeRef.current) {
      setFeedback({ tone: "error", message: "The card is still loading." });
      return;
    }
    setDownloading(true);
    setFeedback(null);
    try {
      await exportCardAsPng(nodeRef.current, item.kind, data.date);
      setFeedback({
        tone: "success",
        message: "PNG downloaded at 1080 × 1350.",
      });
    } catch {
      setFeedback({
        tone: "error",
        message: "Export failed. Check that player images are available and try again.",
      });
    } finally {
      setDownloading(false);
    }
  }

  async function handleShare() {
    if (!nodeRef.current) {
      setFeedback({ tone: "error", message: "The card is still loading." });
      return;
    }
    setSharing(true);
    setFeedback(null);
    try {
      await shareCardAsPng(nodeRef.current, item.kind, data.date, {
        title: `${item.title} · Cric Fun`,
        text: `${data.teamA.name} vs ${data.teamB.name} · ${formatCardDate(data.date)}`,
      });
      setFeedback({
        tone: "success",
        message: "Card shared successfully.",
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setFeedback({ tone: "info", message: "Share cancelled." });
      } else if (error instanceof CardShareUnsupportedError) {
        setFeedback({ tone: "error", message: error.message });
      } else {
        setFeedback({
          tone: "error",
          message:
            "Sharing failed. If the share sheet did not open, use Download PNG.",
        });
      }
    } finally {
      setSharing(false);
    }
  }

  function handleRegenerate() {
    setRevision((value) => value + 1);
    setFeedback({
      tone: "info",
      message: "Preview regenerated from the latest selections.",
    });
  }

  return (
    <article className="panel flex flex-col p-4">
      <header className="mb-3 flex items-start justify-between gap-3 px-0.5">
        <div>
          <h3 className="text-sm font-black text-white">{item.title}</h3>
          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
            {item.subtitle}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
          1080 × 1350
        </span>
      </header>

      <CardStage cardRef={setRef}>
        <div key={revision}>{item.render(data)}</div>
      </CardStage>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button
          size="sm"
          variant="primary"
          onClick={handleShare}
          loading={sharing}
          className="min-h-11 px-2"
          aria-label={`Share ${item.title}`}
        >
          <Share2 size={13} />
          Share
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleDownload}
          loading={downloading}
          className="min-h-11 px-2"
          aria-label={`Download ${item.title}`}
        >
          <Download size={13} />
          Download
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onPreview(item)}
          className="min-h-11 px-2"
          aria-label={`Open a large preview of ${item.title}`}
        >
          <Eye size={13} />
          Preview
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleRegenerate}
          className="min-h-11 px-2"
          aria-label={`Regenerate ${item.title}`}
        >
          <RefreshCw size={13} />
          Regenerate
        </Button>
      </div>

      {feedback ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mt-2.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold",
            feedback.tone === "success"
              ? "border-field/20 bg-field/[0.06] text-field"
              : feedback.tone === "error"
                ? "border-rose-400/20 bg-rose-500/[0.07] text-rose-300"
                : "border-white/10 bg-white/[0.03] text-slate-400",
          )}
        >
          {feedback.message}
        </p>
      ) : null}
    </article>
  );
}

export function CardGallery({ data }: { data: CardData }) {
  const nodes = useRef<Partial<Record<CardKind, HTMLDivElement | null>>>({});
  const [preview, setPreview] = useState<CardItem | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [allFeedback, setAllFeedback] = useState<Feedback | null>(null);
  const placeholderPlayers = players.filter((player) =>
    player.image.includes("placeholder"),
  );

  const registerRef = useCallback(
    (kind: CardKind, node: HTMLDivElement | null) => {
      nodes.current[kind] = node;
    },
    [],
  );

  async function handleDownloadAll() {
    setDownloadingAll(true);
    setAllFeedback(null);
    let success = 0;
    let failed = 0;

    for (const item of CARD_ITEMS) {
      const node = nodes.current[item.kind];
      if (!node) {
        failed += 1;
        continue;
      }
      try {
        await exportCardAsPng(node, item.kind, data.date);
        success += 1;
      } catch {
        failed += 1;
      }
    }

    setDownloadingAll(false);
    setAllFeedback(
      failed === 0
        ? {
            tone: "success",
            message: `All ${success} PNG cards downloaded.`,
          }
        : {
            tone: "error",
            message: `${success} card${success === 1 ? "" : "s"} downloaded, ${failed} failed. Try the individual buttons.`,
          },
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-field">
            <Sparkles size={12} />
            Ready to share
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
            Your five match-day cards
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Share straight to Messenger, WhatsApp, or another app with your
            device&apos;s share sheet. Every card uses {formatCardDate(data.date)}.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <Button
            variant="secondary"
            onClick={handleDownloadAll}
            loading={downloadingAll}
          >
            <Download size={15} />
            Download all 5
          </Button>
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Portrait PNG · 4:5
          </span>
        </div>
      </div>

      {allFeedback ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mb-4 flex items-start gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold",
            allFeedback.tone === "success"
              ? "border-field/20 bg-field/[0.06] text-field"
              : "border-rose-400/20 bg-rose-500/[0.07] text-rose-300",
          )}
        >
          {allFeedback.tone === "success" ? (
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
          ) : (
            <Loader2 size={14} className="mt-0.5 shrink-0" />
          )}
          {allFeedback.message}
        </p>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {CARD_ITEMS.map((item) => (
          <CardPreview
            key={item.kind}
            item={item}
            data={data}
            registerRef={registerRef}
            onPreview={setPreview}
          />
        ))}
      </div>

      {placeholderPlayers.length > 0 ? (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-[10px] leading-relaxed text-slate-500">
          <Info size={13} className="mt-0.5 shrink-0 text-slate-500" />
          Placeholder photos are in use for{" "}
          {placeholderPlayers.map((player) => player.name).join(", ")}. Add
          their images to{" "}
          <code className="rounded bg-white/[0.06] px-1 py-0.5 text-slate-400">
            public/players/
          </code>{" "}
          and update the paths in{" "}
          <code className="rounded bg-white/[0.06] px-1 py-0.5 text-slate-400">
            src/data/players.ts
          </code>
          . This note disappears when no player uses a placeholder.
        </p>
      ) : null}

      <Modal
        open={preview !== null}
        onClose={() => setPreview(null)}
        title={preview?.title ?? "Card preview"}
        description="This is the artwork that will be exported."
        className="max-w-[600px]"
      >
        {preview ? (
          <div>
            <CardStage>{preview.render(data)}</CardStage>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] text-slate-500">
                Export dimensions: 1080 × 1350 px
              </p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setPreview(null)}
              >
                Close preview
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
