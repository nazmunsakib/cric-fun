import {
  CalendarDays,
  Crown,
  Images,
  Shield,
  Sparkles,
  Target,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export interface StepDefinition {
  title: string;
  mobileTitle: string;
  description: string;
  icon: LucideIcon;
}

export const STEPS: StepDefinition[] = [
  {
    title: "Match date",
    mobileTitle: "Date",
    description: "Every card will carry this date.",
    icon: CalendarDays,
  },
  {
    title: "Captains",
    mobileTitle: "Captains",
    description: "Pick one captain for each side.",
    icon: Crown,
  },
  {
    title: "Team rosters",
    mobileTitle: "Teams",
    description: "Build both squads without overlap.",
    icon: UsersRound,
  },
  {
    title: "Best batter",
    mobileTitle: "Batting",
    description: "Celebrate the innings of the day.",
    icon: Shield,
  },
  {
    title: "Best bowler",
    mobileTitle: "Bowling",
    description: "Give the bowling figures their flowers.",
    icon: Target,
  },
  {
    title: "Ashraful of the Day",
    mobileTitle: "Ashraful",
    description: "Build the flop list nobody wants to top.",
    icon: Sparkles,
  },
  {
    title: "Series result",
    mobileTitle: "Result",
    description: "Enter the day's match wins and auto-detect the winner.",
    icon: Trophy,
  },
  {
    title: "Generate cards",
    mobileTitle: "Cards",
    description: "Preview, regenerate, and download.",
    icon: Images,
  },
];
