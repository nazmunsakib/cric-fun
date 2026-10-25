export type TeamSide = "A" | "B";

export interface Player {
  id: string;
  name: string;
  image: string;
  nickname?: string;
}

export interface CardTeam {
  side: TeamSide;
  name: string;
  captain: Player;
  players: Player[];
}

export interface BestPlayerEntry {
  player: Player;
  team: TeamSide;
  note?: string;
}

export interface CardData {
  date: string;
  teamA: CardTeam;
  teamB: CardTeam;
  bestBatters: BestPlayerEntry[];
  bestBowlers: BestPlayerEntry[];
  ashrafuls: Player[];
  ashrafulCaption: string;
  seriesWinsA: number;
  seriesWinsB: number;
  seriesWinner: TeamSide | null;
  summary: string;
}

export type CardKind =
  | "team-photo"
  | "best-batter"
  | "best-bowler"
  | "captain-vs-captain"
  | "ashraful";

export interface MatchSetup {
  date: string;
  captainAId: string | null;
  captainBId: string | null;
  teamAIds: string[];
  teamBIds: string[];
  bestBatterIds: string[];
  batterNotes: Record<string, string>;
  bestBowlerIds: string[];
  bowlerNotes: Record<string, string>;
  ashrafulIds: string[];
  ashrafulCaption: string;
  captainAWins: number;
  captainBWins: number;
  summary: string;
}
