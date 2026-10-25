import { getPlayers } from "@/data/players";
import { isValidISODate } from "@/lib/date-utils";
import { getSetupTeamIds } from "@/lib/card-data";
import type { MatchSetup } from "@/types/cricket";

export function validateStep(
  step: number,
  setup: MatchSetup,
): string | null {
  if (step === 0 && !isValidISODate(setup.date)) {
    return "Choose a valid match date before continuing.";
  }

  if (step === 1) {
    if (!setup.captainAId || !setup.captainBId) {
      return "Select Captain A and Captain B before continuing.";
    }
    if (setup.captainAId === setup.captainBId) {
      return "A player cannot captain both teams.";
    }
  }

  if (step === 2) {
    const teamIds = getSetupTeamIds(setup);
    if (teamIds.teamA.length < 2) {
      return "Add at least one more player to Team A.";
    }
    if (teamIds.teamB.length < 2) {
      return "Add at least one more player to Team B.";
    }
  }

  if (step === 3 && setup.bestBatterIds.length === 0) {
    return "Select at least one Best Batter.";
  }

  if (step === 4 && setup.bestBowlerIds.length === 0) {
    return "Select at least one Best Bowler.";
  }

  if (step === 5 && setup.ashrafulIds.length === 0) {
    return "Select at least one player for the Ashraful of the Day flop list.";
  }

  if (step === 6 && setup.captainAWins + setup.captainBWins === 0) {
    return "Enter today's series score (for example 2–1 or 3–0).";
  }

  if (step === 7) {
    const captainA = getPlayers([setup.captainAId ?? ""])[0];
    const captainB = getPlayers([setup.captainBId ?? ""])[0];
    if (!captainA || !captainB) {
      return "Both captains are needed to generate the cards.";
    }
  }

  return null;
}

export function validateThroughStep(
  step: number,
  setup: MatchSetup,
): string | null {
  for (let index = 0; index < step; index += 1) {
    const error = validateStep(index, setup);
    if (error) return error;
  }
  return null;
}
