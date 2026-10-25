import { getPlayers } from "@/data/players";
import type {
  CardData,
  MatchSetup,
  Player,
  TeamSide,
} from "@/types/cricket";

export function makeTeamName(captain: Player | undefined, side: TeamSide) {
  return captain ? `${captain.name}'s XI` : `Team ${side}`;
}

function uniqueIds(ids: string[]): string[] {
  return Array.from(new Set(ids));
}

export function getSetupTeamIds(
  setup: MatchSetup,
): { teamA: string[]; teamB: string[] } {
  const teamA = uniqueIds(
    setup.teamAIds.filter(
      (id) => id !== setup.captainBId && id !== setup.captainAId,
    ),
  );
  const teamB = uniqueIds(
    setup.teamBIds.filter(
      (id) => id !== setup.captainAId && id !== setup.captainBId,
    ),
  );

  return {
    teamA: setup.captainAId
      ? [setup.captainAId, ...teamA]
      : teamA,
    teamB: setup.captainBId
      ? [setup.captainBId, ...teamB]
      : teamB,
  };
}

export function getAssignedPlayers(setup: MatchSetup): Player[] {
  const ids = getSetupTeamIds(setup);
  return getPlayers(uniqueIds([...ids.teamA, ...ids.teamB]));
}

export function getTeamForPlayer(
  setup: MatchSetup,
  playerId: string,
): TeamSide | null {
  if (playerId === setup.captainAId) return "A";
  if (playerId === setup.captainBId) return "B";
  const ids = getSetupTeamIds(setup);
  if (ids.teamA.includes(playerId)) return "A";
  if (ids.teamB.includes(playerId)) return "B";
  return null;
}

export function getSeriesWinner(
  winsA: number,
  winsB: number,
): TeamSide | null {
  if (winsA > winsB) return "A";
  if (winsB > winsA) return "B";
  return null;
}

export function getSeriesOutcomeLabel(
  winsA: number,
  winsB: number,
): "A" | "B" | "tied" | "none" {
  if (winsA + winsB === 0) return "none";
  return getSeriesWinner(winsA, winsB) ?? "tied";
}

export function buildCardData(setup: MatchSetup): CardData | null {
  const captainA = getPlayers([setup.captainAId ?? ""])[0];
  const captainB = getPlayers([setup.captainBId ?? ""])[0];
  if (!captainA || !captainB) return null;

  const ids = getSetupTeamIds(setup);
  const teamAPlayers = getPlayers(ids.teamA);
  const teamBPlayers = getPlayers(ids.teamB);
  const teamAById = new Map(teamAPlayers.map((player) => [player.id, player]));
  const teamBById = new Map(teamBPlayers.map((player) => [player.id, player]));

  const toEntries = (playerIds: string[], notes: Record<string, string>) =>
    uniqueIds(playerIds).flatMap((id) => {
      const teamA = teamAById.get(id);
      const teamB = teamBById.get(id);
      const player = teamA ?? teamB;
      if (!player) return [];
      const note = notes[id]?.trim();
      return [
        {
          player,
          team: (teamA ? "A" : "B") as TeamSide,
          ...(note ? { note } : {}),
        },
      ];
    });

  return {
    date: setup.date,
    teamA: {
      side: "A",
      name: makeTeamName(captainA, "A"),
      captain: captainA,
      players: teamAPlayers,
    },
    teamB: {
      side: "B",
      name: makeTeamName(captainB, "B"),
      captain: captainB,
      players: teamBPlayers,
    },
    bestBatters: toEntries(setup.bestBatterIds, setup.batterNotes),
    bestBowlers: toEntries(setup.bestBowlerIds, setup.bowlerNotes),
    ashrafuls: getPlayers(uniqueIds(setup.ashrafulIds)),
    ashrafulCaption: setup.ashrafulCaption.trim(),
    seriesWinsA: setup.captainAWins,
    seriesWinsB: setup.captainBWins,
    seriesWinner: getSeriesWinner(setup.captainAWins, setup.captainBWins),
    summary: setup.summary.trim(),
  };
}
