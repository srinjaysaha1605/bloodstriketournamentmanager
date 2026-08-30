import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DynamicScoreboardView } from './components/DynamicScoreboardView';
import { HallOfFameView } from './components/HallOfFameView';
import { TournamentConfigView } from './components/TournamentConfigView';
import {
  INITIAL_TOURNAMENT_CONFIG,
  INITIAL_MODES,
  INITIAL_PLAYERS,
  INITIAL_ROUNDS,
  INITIAL_HALL_OF_FAME
} from './data/presetData';
import { TournamentConfig, PlayerScore, RoundInfo, ModeWithMaps, HallOfFameEntry } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scoreboard' | 'hall-of-fame' | 'config'>('scoreboard');

  // Load initial states from localStorage if available
  const [config, setConfig] = useState<TournamentConfig>(() => {
    try {
      const saved = localStorage.getItem('bloodstrike_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load config from storage', e);
    }
    return INITIAL_TOURNAMENT_CONFIG;
  });

  const [modes, setModes] = useState<ModeWithMaps[]>(() => {
    try {
      const saved = localStorage.getItem('bloodstrike_modes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load modes from storage', e);
    }
    return INITIAL_MODES;
  });

  const [players, setPlayers] = useState<PlayerScore[]>(() => {
    try {
      const saved = localStorage.getItem('bloodstrike_players');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load players from storage', e);
    }
    return INITIAL_PLAYERS;
  });

  const [rounds, setRounds] = useState<RoundInfo[]>(() => {
    try {
      const saved = localStorage.getItem('bloodstrike_rounds');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load rounds from storage', e);
    }
    return INITIAL_ROUNDS;
  });

  const [hallOfFame] = useState<HallOfFameEntry[]>(INITIAL_HALL_OF_FAME);

  const [history, setHistory] = useState<{ players: PlayerScore[]; rounds: RoundInfo[] }[]>(() => {
    try {
      const saved = localStorage.getItem('bloodstrike_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load history from storage', e);
    }
    return [{ players: INITIAL_PLAYERS, rounds: INITIAL_ROUNDS }];
  });

  const [historyIndex, setHistoryIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bloodstrike_history_index');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // default 0
    }
    return 0;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('bloodstrike_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('bloodstrike_modes', JSON.stringify(modes));
  }, [modes]);

  useEffect(() => {
    localStorage.setItem('bloodstrike_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('bloodstrike_rounds', JSON.stringify(rounds));
  }, [rounds]);

  useEffect(() => {
    localStorage.setItem('bloodstrike_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('bloodstrike_history_index', JSON.stringify(historyIndex));
  }, [historyIndex]);

  // Reset all local cache and reset state to defaults
  const handleResetAllData = () => {
    localStorage.removeItem('bloodstrike_config');
    localStorage.removeItem('bloodstrike_modes');
    localStorage.removeItem('bloodstrike_players');
    localStorage.removeItem('bloodstrike_rounds');
    localStorage.removeItem('bloodstrike_history');
    localStorage.removeItem('bloodstrike_history_index');

    setConfig(INITIAL_TOURNAMENT_CONFIG);
    setModes(INITIAL_MODES);
    setPlayers(INITIAL_PLAYERS);
    setRounds(INITIAL_ROUNDS);
    setHistory([{ players: INITIAL_PLAYERS, rounds: INITIAL_ROUNDS }]);
    setHistoryIndex(0);
  };


  // Helper to commit new scoreboard state to history stack
  const updateScoreboardState = (newPlayers: PlayerScore[], newRounds: RoundInfo[]) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push({ players: newPlayers, rounds: newRounds });
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setPlayers(newPlayers);
    setRounds(newRounds);
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = () => {
    if (canUndo) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setPlayers(prev.players);
      setRounds(prev.rounds);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setPlayers(next.players);
      setRounds(next.rounds);
    }
  };

  // Helper to add a new game mode
  const handleAddMode = (modeName: string) => {
    if (modes.some((m) => m.name.toLowerCase() === modeName.toLowerCase())) return;
    const newMode: ModeWithMaps = {
      id: `mode-${Date.now()}`,
      name: modeName,
      maps: []
    };
    setModes((prev) => [...prev, newMode]);
  };

  // Helper to delete a game mode
  const handleDeleteMode = (modeId: string) => {
    setModes((prev) => prev.filter((m) => m.id !== modeId));
  };

  // Helper to add a map to a specific mode
  const handleAddMapToMode = (modeId: string, mapName: string) => {
    setModes((prev) =>
      prev.map((m) => {
        if (m.id !== modeId) return m;
        if (m.maps.some((map) => map.toLowerCase() === mapName.toLowerCase())) return m;
        return {
          ...m,
          maps: [...m.maps, mapName]
        };
      })
    );
  };

  // Helper to delete a map from a specific mode
  const handleDeleteMapFromMode = (modeId: string, mapName: string) => {
    setModes((prev) =>
      prev.map((m) => {
        if (m.id !== modeId) return m;
        return {
          ...m,
          maps: m.maps.filter((map) => map !== mapName)
        };
      })
    );
  };

  // Helper to update player score in a specific round
  const handleUpdatePlayerScore = (playerId: string, roundIndex: number, delta: number) => {
    const newPlayers = players.map((p) => {
      if (p.id !== playerId) return p;
      const newRoundScores = [...p.roundScores];
      const currentScore = newRoundScores[roundIndex] ?? 0;
      newRoundScores[roundIndex] = Math.max(0, currentScore + delta);

      const newTotal = newRoundScores.reduce((sum, val) => sum + val, 0);
      return {
        ...p,
        roundScores: newRoundScores,
        totalScore: newTotal
      };
    });
    updateScoreboardState(newPlayers, rounds);
  };

  // Helper to add player
  const handleAddPlayer = (gamerTag: string) => {
    const newP: PlayerScore = {
      id: `p-${Date.now()}`,
      gamerTag,
      avatarSeed: gamerTag,
      roundScores: new Array(rounds.length).fill(0),
      totalScore: 0,
      wins: 0,
      rank: players.length + 1,
      isLeader: false
    };
    updateScoreboardState([...players, newP], rounds);
  };

  // Helper to add round
  const handleAddRound = () => {
    const nextRoundNum = rounds.length + 1;
    const newRound: RoundInfo = {
      roundNumber: nextRoundNum,
      map: config.mapName,
      mode: config.gameMode
    };

    const newRounds = [...rounds, newRound];
    const newPlayers = players.map((p) => ({
      ...p,
      roundScores: [...p.roundScores, 0]
    }));
    updateScoreboardState(newPlayers, newRounds);
  };

  // Helper to remove a round (by index or last round)
  const handleRemoveRound = (roundIndex?: number) => {
    if (rounds.length === 0) return;
    const targetIndex = roundIndex !== undefined ? roundIndex : rounds.length - 1;

    const newRounds = rounds
      .filter((_, idx) => idx !== targetIndex)
      .map((r, idx) => ({ ...r, roundNumber: idx + 1 }));

    const newPlayers = players.map((p) => {
      const updatedScores = p.roundScores.filter((_, idx) => idx !== targetIndex);
      const updatedTotal = updatedScores.reduce((sum, v) => sum + v, 0);
      return {
        ...p,
        roundScores: updatedScores,
        totalScore: updatedTotal
      };
    });

    updateScoreboardState(newPlayers, newRounds);
  };

  // Reset scores
  const handleResetScores = () => {
    const newPlayers = players.map((p) => ({
      ...p,
      roundScores: p.roundScores.map(() => 0),
      totalScore: 0,
      wins: 0
    }));
    updateScoreboardState(newPlayers, rounds);
  };

  // Save Config
  const handleSaveConfig = (updatedConfig: TournamentConfig) => {
    setConfig(updatedConfig);
  };

  // Current leader
  const currentLeader = [...players].sort((a, b) => b.totalScore - a.totalScore)[0];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-gray-100 flex flex-col font-sans selection:bg-[#E5FF00] selection:text-black">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        config={config}
        leader={currentLeader}
        onResetAllData={handleResetAllData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'scoreboard' && (
          <DynamicScoreboardView
            players={players}
            rounds={rounds}
            config={config}
            onUpdatePlayerScore={handleUpdatePlayerScore}
            onAddPlayer={handleAddPlayer}
            onAddRound={handleAddRound}
            onRemoveRound={handleRemoveRound}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
            onResetScores={handleResetScores}
          />
        )}

        {activeTab === 'hall-of-fame' && (
          <HallOfFameView
            entries={hallOfFame}
          />
        )}

        {activeTab === 'config' && (
          <TournamentConfigView
            config={config}
            modes={modes}
            onSaveConfig={handleSaveConfig}
            onAddMode={handleAddMode}
            onDeleteMode={handleDeleteMode}
            onAddMapToMode={handleAddMapToMode}
            onDeleteMapFromMode={handleDeleteMapFromMode}
          />
        )}
      </main>

      {/* Tactical Footer */}
      <footer className="border-t border-[#1C1C1C] bg-[#0A0A0A] py-6 px-4 text-center text-xs font-mono text-gray-500 space-y-2">
        <div className="flex items-center justify-center space-x-3 text-gray-400">
          <span>BLOODSTRIKE TOURNAMENT ENGINE</span>
        </div>
        <p className="text-[11px] text-gray-600">
          Tactical FPS Tournament Management Platform.
        </p>
      </footer>
    </div>
  );
}

