export interface ModeWithMaps {
  id: string;
  name: string;
  maps: string[];
}

export interface TournamentConfig {
  id: string;
  name: string;
  gameMode: string;
  mapName: string;
}

export interface PlayerScore {
  id: string;
  gamerTag: string;
  realName?: string;
  avatarSeed: string;
  roundScores: number[]; // Index aligns with round index (0 = Round 1)
  totalScore: number;
  wins: number;
  rank: number;
  isLeader: boolean;
}

export interface RoundInfo {
  roundNumber: number;
  map: string;
  mode: string;
  winnerGamerTag?: string;
  completedAt?: string;
}

export interface HallOfFameEntry {
  id: string;
  occurrence: number; // 1, 2, 3...
  tournamentName: string;
  winnerName: string;
  dateAdded?: string;
}

