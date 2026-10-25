"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Images,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { getPlayers } from "@/data/players";
import { getLocalTodayISO, isValidISODate } from "@/lib/date-utils";
import {
  buildCardData,
  getAssignedPlayers,
  getSetupTeamIds,
  getSeriesOutcomeLabel,
  getTeamForPlayer,
} from "@/lib/card-data";
import { validateStep, validateThroughStep } from "@/lib/match-validation";
import { STEPS } from "@/lib/steps";
import type { MatchSetup, TeamSide } from "@/types/cricket";
import { useAshrafulCaptions } from "@/hooks/use-ashraful-captions";
import { useHydrated } from "@/hooks/use-hydrated";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { MatchDateSelector } from "@/components/match-date-selector";
import { CaptainSelector } from "@/components/captain-selector";
import { TeamBuilder } from "@/components/team-builder";
import { BestPlayerSelector } from "@/components/best-player-selector";
import { AshrafulStep } from "@/components/ashraful-step";
import { MatchResultForm } from "@/components/match-result-form";
import { CardGallery } from "@/components/card-gallery";
import { Stepper } from "@/components/stepper";
import { MatchSummary } from "@/components/match-summary";
import { cn } from "@/lib/utils";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function LoadingScreen() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center px-4 py-24">
      <div className="panel flex w-full max-w-md flex-col items-center p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-field/20 bg-field/[0.07] text-field">
          <Loader2 size={24} className="animate-spin" />
        </span>
        <p className="mt-4 text-sm font-black text-white">
          Warming up the match-day studio
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Preparing today&apos;s date and local preferences.
        </p>
      </div>
    </div>
  );
}

export function CricketBuilder() {
  const {
    captions,
    storageError: captionStorageError,
    updateCaption,
  } = useAshrafulCaptions();
  const hydrated = useHydrated();

  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [confirmNewMatch, setConfirmNewMatch] = useState(false);

  const [date, setDate] = useState(() =>
    typeof window === "undefined" ? "" : getLocalTodayISO(),
  );
  const [captainAId, setCaptainAId] = useState<string | null>(null);
  const [captainBId, setCaptainBId] = useState<string | null>(null);
  const [teamAIds, setTeamAIds] = useState<string[]>([]);
  const [teamBIds, setTeamBIds] = useState<string[]>([]);
  const [bestBatterIds, setBestBatterIds] = useState<string[]>([]);
  const [batterNotes, setBatterNotes] = useState<Record<string, string>>({});
  const [bestBowlerIds, setBestBowlerIds] = useState<string[]>([]);
  const [bowlerNotes, setBowlerNotes] = useState<Record<string, string>>({});
  const [ashrafulIds, setAshrafulIds] = useState<string[]>([]);
  const [captainAWins, setCaptainAWins] = useState(0);
  const [captainBWins, setCaptainBWins] = useState(0);
  const [summary, setSummary] = useState("");

  const stepSectionRef = useRef<HTMLElement>(null);
  const ashrafulCaption = date ? (captions[date] ?? "") : "";

  const baseSetup: MatchSetup = {
    date,
    captainAId,
    captainBId,
    teamAIds,
    teamBIds,
    bestBatterIds,
    batterNotes,
    bestBowlerIds,
    bowlerNotes,
    ashrafulIds,
    ashrafulCaption,
    captainAWins,
    captainBWins,
    summary,
  };

  const teamIds = getSetupTeamIds(baseSetup);
  const assignedIdSet = new Set([...teamIds.teamA, ...teamIds.teamB]);

  const setup: MatchSetup = {
    ...baseSetup,
    bestBatterIds: bestBatterIds.filter((id) => assignedIdSet.has(id)),
    bestBowlerIds: bestBowlerIds.filter((id) => assignedIdSet.has(id)),
  };

  const assignedPlayers = getAssignedPlayers(setup);
  const captainA = getPlayers([captainAId ?? ""])[0];
  const captainB = getPlayers([captainBId ?? ""])[0];
  const cardData = buildCardData(setup);

  const teamFor = (playerId: string): TeamSide | null =>
    getTeamForPlayer(setup, playerId);

  function clearError() {
    if (error) setError(null);
  }

  function handleDateChange(nextDate: string) {
    if (!isValidISODate(nextDate)) return;
    setDate(nextDate);
    clearError();
  }

  function handleCaptainSelect(side: TeamSide, playerId: string | null) {
    clearError();

    if (side === "A") {
      if (playerId === captainBId) return;
      if (!playerId) {
        setCaptainAId(null);
        setTeamAIds((previous) =>
          previous.filter((id) => id !== captainAId),
        );
        return;
      }
      setCaptainAId(playerId);
      setTeamAIds((previous) => [
        playerId,
        ...previous.filter(
          (id) => id !== playerId && id !== captainBId,
        ),
      ]);
      setTeamBIds((previous) => previous.filter((id) => id !== playerId));
    } else {
      if (playerId === captainAId) return;
      if (!playerId) {
        setCaptainBId(null);
        setTeamBIds((previous) =>
          previous.filter((id) => id !== captainBId),
        );
        return;
      }
      setCaptainBId(playerId);
      setTeamBIds((previous) => [
        playerId,
        ...previous.filter(
          (id) => id !== playerId && id !== captainAId,
        ),
      ]);
      setTeamAIds((previous) => previous.filter((id) => id !== playerId));
    }
  }

  function handleAssign(playerId: string, side: TeamSide | null) {
    clearError();
    if (
      (playerId === captainAId && side !== "A") ||
      (playerId === captainBId && side !== "B")
    ) {
      return;
    }

    setTeamAIds((previous) => {
      const rest = previous.filter((id) => id !== playerId);
      return side === "A" ? [...rest, playerId] : rest;
    });
    setTeamBIds((previous) => {
      const rest = previous.filter((id) => id !== playerId);
      return side === "B" ? [...rest, playerId] : rest;
    });
  }

  function handleToggleBest(kind: "batter" | "bowler", playerId: string) {
    clearError();
    if (kind === "batter") {
      setBestBatterIds((previous) =>
        previous.includes(playerId)
          ? previous.filter((id) => id !== playerId)
          : [...previous, playerId],
      );
    } else {
      setBestBowlerIds((previous) =>
        previous.includes(playerId)
          ? previous.filter((id) => id !== playerId)
          : [...previous, playerId],
      );
    }
  }

  function handleAshrafulToggle(playerId: string) {
    setAshrafulIds((previous) =>
      previous.includes(playerId)
        ? previous.filter((id) => id !== playerId)
        : [...previous, playerId],
    );
    clearError();
  }

  function handleAshrafulClear() {
    setAshrafulIds([]);
    clearError();
  }

  function handleCaptionChange(value: string) {
    if (date) updateCaption(date, value);
  }

  function findFirstInvalidStep(): number | null {
    for (let index = 0; index < STEPS.length - 1; index += 1) {
      if (validateStep(index, setup)) return index;
    }
    return null;
  }

  function handleNext() {
    const validation =
      step === STEPS.length - 2
        ? validateThroughStep(STEPS.length - 1, setup)
        : validateStep(step, setup);
    if (validation) {
      setError(validation);
      return;
    }
    if (step >= STEPS.length - 1) return;
    const next = step + 1;
    setStep(next);
    setFurthest((previous) => Math.max(previous, next));
    setError(null);
    scrollToTop();
  }

  function handleBack() {
    if (step === 0) return;
    setStep((previous) => previous - 1);
    setError(null);
    scrollToTop();
  }

  function handleStepSelect(next: number) {
    if (next > furthest || next === step) return;
    setStep(next);
    setError(null);
    scrollToTop();
  }

  function startNewMatch() {
    const today = getLocalTodayISO();
    setDate(today);
    setCaptainAId(null);
    setCaptainBId(null);
    setTeamAIds([]);
    setTeamBIds([]);
    setBestBatterIds([]);
    setBatterNotes({});
    setBestBowlerIds([]);
    setBowlerNotes({});
    setAshrafulIds([]);
    setCaptainAWins(0);
    setCaptainBWins(0);
    setSummary("");
    setStep(0);
    setFurthest(0);
    setError(null);
    setConfirmNewMatch(false);
    scrollToTop();
  }

  useEffect(() => {
    if (!hydrated) return;
    stepSectionRef.current?.focus({ preventScroll: true });
  }, [step, hydrated]);

  if (!hydrated || !isValidISODate(date)) return <LoadingScreen />;

  const currentStep = STEPS[step];
  const StepIcon = currentStep.icon;
  const progress = ((step + 1) / STEPS.length) * 100;
  const isCardsStep = step === STEPS.length - 1;

  function renderStep() {
    switch (step) {
      case 0:
        return <MatchDateSelector date={date} onChange={handleDateChange} />;
      case 1:
        return (
          <CaptainSelector
            captainAId={captainAId}
            captainBId={captainBId}
            onSelect={handleCaptainSelect}
          />
        );
      case 2:
        return (
          <TeamBuilder
            captainAId={captainAId}
            captainBId={captainBId}
            teamAIds={teamIds.teamA}
            teamBIds={teamIds.teamB}
            onAssign={handleAssign}
          />
        );
      case 3:
        return (
          <BestPlayerSelector
            kind="batter"
            players={assignedPlayers}
            selectedIds={setup.bestBatterIds}
            notes={batterNotes}
            teamFor={teamFor}
            onToggle={(id) => handleToggleBest("batter", id)}
            onClear={() => {
              setBestBatterIds([]);
              setBatterNotes({});
              clearError();
            }}
            onNoteChange={(id, note) =>
              setBatterNotes((previous) => ({ ...previous, [id]: note }))
            }
          />
        );
      case 4:
        return (
          <BestPlayerSelector
            kind="bowler"
            players={assignedPlayers}
            selectedIds={setup.bestBowlerIds}
            notes={bowlerNotes}
            teamFor={teamFor}
            onToggle={(id) => handleToggleBest("bowler", id)}
            onClear={() => {
              setBestBowlerIds([]);
              setBowlerNotes({});
              clearError();
            }}
            onNoteChange={(id, note) =>
              setBowlerNotes((previous) => ({ ...previous, [id]: note }))
            }
          />
        );
      case 5:
        return (
          <AshrafulStep
            playerIds={ashrafulIds}
            caption={ashrafulCaption}
            teamFor={teamFor}
            onToggle={handleAshrafulToggle}
            onClear={handleAshrafulClear}
            onCaptionChange={handleCaptionChange}
            storageError={captionStorageError}
          />
        );
      case 6:
        if (!captainA || !captainB) {
          return (
            <div className="rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center">
              <p className="text-sm font-black text-white">
                Both captains are required
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Go back to the captains step and complete both selections.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => handleStepSelect(1)}
                disabled={furthest < 1}
              >
                Back to captains
              </Button>
            </div>
          );
        }
        return (
          <MatchResultForm
            captainA={captainA}
            captainB={captainB}
            captainAWins={captainAWins}
            captainBWins={captainBWins}
            summary={summary}
            onSeriesScoreChange={(side, value) => {
              if (side === "A") setCaptainAWins(value);
              else setCaptainBWins(value);
              clearError();
            }}
            onSummaryChange={setSummary}
          />
        );
      case 7:
        const invalidStep = findFirstInvalidStep();
        if (invalidStep !== null) {
          return (
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] px-6 py-12 text-center">
              <p className="text-sm font-black text-white">
                One step needs attention
              </p>
              <p className="mx-auto mt-1 max-w-md text-xs text-slate-400">
                {validateStep(invalidStep, setup)}
              </p>
              <Button
                variant="primary"
                size="sm"
                className="mt-4"
                onClick={() => handleStepSelect(invalidStep)}
              >
                Go to {STEPS[invalidStep].title}
              </Button>
            </div>
          );
        }
        return cardData ? (
          <div className="space-y-5">
            <div className="flex flex-col gap-3 rounded-2xl border border-field/20 bg-field/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-field/10 text-field">
                  <Check size={17} />
                </span>
                <div>
                  <p className="text-sm font-black text-white">
                    Match pack ready
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {cardData.seriesWinsA + cardData.seriesWinsB > 0
                      ? getSeriesOutcomeLabel(
                          cardData.seriesWinsA,
                          cardData.seriesWinsB,
                        ) === "tied"
                        ? `Series level ${cardData.seriesWinsA}–${cardData.seriesWinsB}`
                        : `${cardData.seriesWinner === "A" ? cardData.teamA.captain.name : cardData.teamB.captain.name} wins the day ${cardData.seriesWinsA}–${cardData.seriesWinsB}`
                      : "Series score missing"}{" "}
                    · {cardData.teamA.players.length + cardData.teamB.players.length}{" "}
                    players
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setConfirmNewMatch(true)}
              >
                <RotateCcw size={13} />
                Start new match
              </Button>
            </div>
            <CardGallery data={cardData} />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center">
            <p className="text-sm font-black text-white">
              The match setup is incomplete
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Complete the captains and result steps, then generate again.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => handleStepSelect(1)}
              disabled={furthest < 1}
            >
              Return to setup
            </Button>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden space-y-4 lg:sticky lg:top-5 lg:block lg:self-start">
          <Stepper
            current={step}
            furthest={furthest}
            onSelect={handleStepSelect}
          />
          <MatchSummary setup={setup} />
        </aside>

        <main className="min-w-0">
          <section
            ref={stepSectionRef}
            tabIndex={-1}
            aria-labelledby="current-step-title"
            className="panel overflow-hidden outline-none rise-in"
          >
            <header className="relative border-b border-white/[0.08] p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">
                    Step {String(step + 1).padStart(2, "0")} of{" "}
                    {String(STEPS.length).padStart(2, "0")}
                  </p>
                  <h2
                    id="current-step-title"
                    className="section-title mt-1.5"
                  >
                    {currentStep.title}
                  </h2>
                  <p className="muted mt-1.5 max-w-xl text-xs sm:text-sm">
                    {currentStep.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                    isCardsStep
                      ? "border-amber-300/25 bg-amber-300/10 text-amber-300"
                      : "border-field/20 bg-field/[0.07] text-field",
                  )}
                >
                  <StepIcon size={20} />
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-field to-emerald-300 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                  {Math.round(progress)}%
                </span>
              </div>
            </header>

            <div className="p-5 sm:p-7">{renderStep()}</div>

            <footer className="sticky bottom-0 z-20 border-t border-white/[0.08] bg-[#07131f] px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_40px_rgba(0,0,0,0.28)] sm:px-7 sm:py-4 lg:static lg:shadow-none">
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="min-w-0 flex-1">
                  {error ? (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-lg border border-rose-400/20 bg-rose-500/[0.07] px-3 py-2 text-[11px] font-semibold text-rose-200"
                    >
                      <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                      {error}
                    </p>
                  ) : (
                    <p className="text-[10px] leading-relaxed text-slate-500">
                      {isCardsStep
                        ? "All five cards use the same date and match data."
                        : "Your selections stay in this tab. No account needed."}
                    </p>
                  )}
                </div>

                <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="flex-1 sm:flex-none"
                  >
                    <ArrowLeft size={14} />
                    Back
                  </Button>

                  {!isCardsStep ? (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleNext}
                      className="flex-[1.4] sm:flex-none"
                    >
                      {step === 6 ? (
                        <>
                          <Images size={14} />
                          <span className="sm:hidden">Generate</span>
                          <span className="hidden sm:inline">Generate Cards</span>
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight size={14} />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setConfirmNewMatch(true)}
                      className="flex-[1.4] sm:flex-none"
                    >
                      <Sparkles size={14} />
                      New match
                    </Button>
                  )}
                </div>
              </div>
            </footer>
          </section>

          <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-600">
            Funny Cricket runs entirely in your browser. No account, database,
            or external image service is used.
          </p>
        </main>
      </div>

      <Modal
        open={confirmNewMatch}
        onClose={() => setConfirmNewMatch(false)}
        title="Start a new match?"
        description="This clears the current selections and returns to the date step."
      >
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setConfirmNewMatch(false)}
          >
            Keep this match
          </Button>
          <Button variant="primary" onClick={startNewMatch}>
            <RotateCcw size={14} />
            Start new match
          </Button>
        </div>
      </Modal>
    </div>
  );
}

