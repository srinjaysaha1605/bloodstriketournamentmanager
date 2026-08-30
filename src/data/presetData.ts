import { TournamentConfig, PlayerScore, RoundInfo, ModeWithMaps, HallOfFameEntry } from '../types';

export const INITIAL_MODES: ModeWithMaps[] = [];

export const INITIAL_TOURNAMENT_CONFIG: TournamentConfig = {
  id: 'tourney-1',
  name: '',
  gameMode: '',
  mapName: ''
};

export const INITIAL_PLAYERS: PlayerScore[] = [];

export const INITIAL_ROUNDS: RoundInfo[] = [];

export const INITIAL_HALL_OF_FAME: HallOfFameEntry[] = [
  {
    id: 'hof-1',
    occurrence: 1,
    tournamentName: 'Genesis',
    winnerName: 'Toji (formerly Regaltos)'
  },
  {
    id: 'hof-2',
    occurrence: 2,
    tournamentName: 'Thousand-Year Blood War',
    winnerName: 'Akuma'
  },
  {
    id: 'hof-3',
    occurrence: 3,
    tournamentName: 'Loose Ends',
    winnerName: 'Revenge'
  },
  {
    id: 'hof-4',
    occurrence: 4,
    tournamentName: 'The High Table',
    winnerName: 'Akuma'
  },
  {
    id: 'hof-5',
    occurrence: 5,
    tournamentName: 'Incursion',
    winnerName: 'Reaper'
  }
];



