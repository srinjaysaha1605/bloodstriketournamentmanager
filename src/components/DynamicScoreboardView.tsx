import React, { useState } from 'react';
import { Trophy, Plus, Minus, Trash2, UserPlus, RefreshCw, Undo2, Redo2 } from 'lucide-react';
import { PlayerScore, TournamentConfig, RoundInfo } from '../types';

interface DynamicScoreboardViewProps {
  players: PlayerScore[];
  rounds: RoundInfo[];
  config: TournamentConfig;
  onUpdatePlayerScore: (playerId: string, roundIndex: number, delta: number) => void;
  onAddPlayer: (gamerTag: string) => void;
  onAddRound: () => void;
  onRemoveRound: (roundIndex?: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onResetScores: () => void;
}

export const DynamicScoreboardView: React.FC<DynamicScoreboardViewProps> = ({
  players,
  rounds,
  config,
  onUpdatePlayerScore,
  onAddPlayer,
  onAddRound,
  onRemoveRound,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onResetScores
}) => {
  const [newPlayerTag, setNewPlayerTag] = useState('');
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  // Sort players by total score descending
  const sortedPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);
  const leader = sortedPlayers[0];

  const handleAddPlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerTag.trim()) return;
    onAddPlayer(newPlayerTag.trim());
    setNewPlayerTag('');
    setShowAddPlayerModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Leader Highlight Card */}
        <div className="bg-[#121212] border border-[#FF003C] p-4 relative overflow-hidden glow-red">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-[#FF003C] uppercase font-bold tracking-widest flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>TOURNAMENT LEADER</span>
            </span>
            <span className="bg-[#FF003C] text-white font-mono text-[10px] px-2 py-0.5 font-black uppercase tracking-widest">RANK #1</span>
          </div>
          <div className="font-extrabold italic text-2xl text-white tracking-tighter uppercase truncate mt-1">
            {leader ? leader.gamerTag : 'NO LEADER'}
          </div>
          <div className="text-xs font-mono text-gray-400 mt-2 flex items-center justify-between">
            <span>Score: <strong className="text-[#FF003C] font-black text-sm">{leader ? leader.totalScore : 0}</strong> pts</span>
            <span>Status: <strong className="text-white font-bold">{leader ? 'ACTIVE LEADER' : 'NO ENTRY'}</strong></span>
          </div>
        </div>

        {/* Current Map & Mode */}
        <div className="bg-[#121212] border border-[#1A1A1A] p-4">
          <div className="text-[10px] font-mono text-gray-500 uppercase font-bold tracking-widest mb-1">
            SELECTED MAP
          </div>
          <div className="font-bold text-lg text-white tracking-tight uppercase truncate">
            {config.mapName || 'NONE SELECTED'}
          </div>
          <div className="text-xs font-mono text-gray-400 mt-2 flex items-center justify-between">
            <span>Mode: <strong className="text-[#E6FF00] uppercase font-bold">{config.gameMode || 'NONE'}</strong></span>
            <span>Rounds: <strong className="text-gray-200">{rounds.length}</strong></span>
          </div>
        </div>

        {/* Player Count */}
        <div className="bg-[#121212] border border-[#1A1A1A] p-4">
          <div className="text-[10px] font-mono text-gray-500 uppercase font-bold tracking-widest mb-1">
            REGISTERED PLAYERS
          </div>
          <div className="font-bold text-lg text-white tracking-tight uppercase">
            {players.length} PLAYER{players.length !== 1 ? 'S' : ''}
          </div>
          <div className="text-xs font-mono text-gray-400 mt-2">
            Rounds Active: <strong className="text-gray-200">{rounds.length}</strong>
          </div>
        </div>
      </div>

      {/* Main Scoreboard Controls & Table */}
      <div className="bg-[#121212] border border-[#1A1A1A] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A] pb-4">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight italic text-white">
                TOURNAMENT SCOREBOARD
              </h2>
              <span className="px-2 py-1 bg-[#FF003C] text-white text-[10px] font-bold uppercase tracking-widest">
                LIVE
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Round scores updated live. Adjust scores manually with instant undo/redo actions anytime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Undo & Redo Buttons */}
            <button
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo last action"
              className={`px-2.5 py-1.5 border font-mono text-xs font-bold uppercase transition flex items-center space-x-1 ${
                canUndo
                  ? 'bg-[#1A1A1A] border-[#333] hover:border-[#E6FF00] text-gray-200 hover:text-[#E6FF00]'
                  : 'bg-[#0E0E0E] border-[#1C1C1C] text-gray-600 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>UNDO</span>
            </button>

            <button
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo action"
              className={`px-2.5 py-1.5 border font-mono text-xs font-bold uppercase transition flex items-center space-x-1 ${
                canRedo
                  ? 'bg-[#1A1A1A] border-[#333] hover:border-[#E6FF00] text-gray-200 hover:text-[#E6FF00]'
                  : 'bg-[#0E0E0E] border-[#1C1C1C] text-gray-600 cursor-not-allowed'
              }`}
            >
              <Redo2 className="w-3.5 h-3.5" />
              <span>REDO</span>
            </button>

            <button
              onClick={() => setShowAddPlayerModal(true)}
              className="px-3 py-1.5 bg-[#1A1A1A] border border-[#333] hover:border-[#E6FF00] hover:text-[#E6FF00] text-gray-200 font-mono text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#E6FF00]" />
              <span>ADD PLAYER</span>
            </button>

            <button
              onClick={onAddRound}
              className="px-3 py-1.5 bg-[#1A1A1A] border border-[#333] hover:border-[#E6FF00] hover:text-[#E6FF00] text-gray-200 font-mono text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#E6FF00]" />
              <span>ADD ROUND</span>
            </button>

            <button
              onClick={() => onRemoveRound()}
              disabled={rounds.length === 0}
              className={`px-3 py-1.5 border font-mono text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1 ${
                rounds.length > 0
                  ? 'bg-[#1A1A1A] border-[#333] hover:border-[#FF003C] hover:text-[#FF003C] text-gray-200'
                  : 'bg-[#0E0E0E] border-[#1C1C1C] text-gray-600 cursor-not-allowed'
              }`}
            >
              <Minus className="w-3.5 h-3.5 text-[#FF003C]" />
              <span>REMOVE ROUND</span>
            </button>

            <button
              onClick={onResetScores}
              title="Reset all scores"
              className="px-2.5 py-1.5 bg-[#1A1A1A] border border-[#333] hover:border-[#FF003C] text-gray-400 hover:text-[#FF003C] font-mono text-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Score Grid Table */}
        <div className="overflow-x-auto">
          {sortedPlayers.length === 0 ? (
            <div className="text-center py-12 px-4 border border-dashed border-[#222] bg-[#0B0B0B]">
              <Trophy className="w-10 h-10 mx-auto text-gray-600 mb-2" />
              <p className="text-sm font-bold text-gray-300 font-mono uppercase">NO PLAYERS ADDED YET</p>
              <p className="text-xs text-gray-500 font-mono mt-1">
                Click "ADD PLAYER" above to register tournament participants.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-[#1A1A1A] bg-[#0F0F0F]">
                  <th className="p-4 text-[10px] uppercase font-bold text-gray-500 w-16 text-center">RANK</th>
                  <th className="p-4 text-[10px] uppercase font-bold text-gray-500">PLAYER</th>
                  {rounds.map((r, i) => (
                    <th key={i} className="p-3 text-center w-28 border-x border-[#1A1A1A]/50 relative group">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase font-black text-[#E6FF00] tracking-wider truncate max-w-[100px]">
                          {r.mode || config.gameMode || `ROUND ${r.roundNumber}`}
                        </span>
                        <span className="text-[10px] text-gray-300 font-mono font-bold uppercase truncate max-w-[100px] mt-0.5">
                          {r.map || config.mapName || 'MAP'}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveRound(i)}
                        title={`Remove Round ${i + 1}`}
                        className="absolute top-1 right-1 p-0.5 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-[#FF003C] transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </th>
                  ))}
                  <th className="p-4 text-[10px] uppercase font-bold text-gray-500 text-right w-28">SCORE</th>
                </tr>
              </thead>
              <tbody className="text-sm font-mono divide-y divide-[#1A1A1A]">
                {sortedPlayers.map((player, idx) => {
                  const isFirst = idx === 0;

                  return (
                    <tr
                      key={player.id}
                      className={`transition-colors border-b border-[#1A1A1A] ${
                        isFirst
                          ? 'bg-gradient-to-r from-[#1A1012] to-transparent'
                          : 'hover:bg-[#151515]'
                      }`}
                    >
                      {/* Rank */}
                      <td className="p-4 font-black italic text-center">
                        <span className={isFirst ? 'text-[#FF003C] text-lg' : 'text-gray-500'}>
                          {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </span>
                      </td>

                      {/* Gamertag & Details */}
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-7 h-7 flex items-center justify-center font-black text-xs border ${
                            isFirst
                              ? 'bg-[#FF003C] text-white border-[#FF003C]'
                              : 'bg-[#1A1A1A] text-gray-300 border-[#222]'
                          }`}>
                            {player.gamerTag.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-bold tracking-tighter uppercase ${
                                isFirst ? 'text-white text-base' : 'text-gray-300'
                              }`}>
                                {player.gamerTag}
                              </span>
                              {isFirst && (
                                <span className="px-1.5 py-0.5 bg-[#FF003C] text-white text-[9px] font-black uppercase tracking-widest">
                                  LEADER
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-0.5">
                              TOTAL: <span className="text-gray-300 font-bold">{player.totalScore} PTS</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Scores Per Round */}
                      {rounds.map((_, rIdx) => {
                        const score = player.roundScores[rIdx] ?? 0;
                        return (
                          <td key={rIdx} className="p-2 text-center border-x border-[#1A1A1A]/30">
                            <div className="inline-flex items-center space-x-1 bg-[#0B0B0B] p-1 border border-[#222]">
                              <button
                                onClick={() => onUpdatePlayerScore(player.id, rIdx, -1)}
                                className="w-5 h-5 bg-[#1A1A1A] hover:bg-[#333] text-gray-400 hover:text-white flex items-center justify-center text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-mono font-bold text-gray-200 text-xs">
                                {score}
                              </span>
                              <button
                                onClick={() => onUpdatePlayerScore(player.id, rIdx, 1)}
                                className="w-5 h-5 bg-[#1A1A1A] hover:bg-[#E6FF00] hover:text-black text-gray-400 font-bold flex items-center justify-center text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        );
                      })}

                      {/* Total Cumulative Score */}
                      <td className="p-4 text-right font-black text-xl">
                        <span className={isFirst ? 'text-[#FF003C]' : 'text-gray-300'}>
                          {player.totalScore}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Player Modal */}
      {showAddPlayerModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#FF003C] p-6 max-w-md w-full space-y-4 shadow-2xl glow-red">
            <h3 className="font-extrabold italic uppercase text-2xl text-white tracking-tight">
              REGISTER NEW PLAYER
            </h3>
            <form onSubmit={handleAddPlayerSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                  PLAYER GAMERTAG / NAME
                </label>
                <input
                  type="text"
                  value={newPlayerTag}
                  onChange={(e) => setNewPlayerTag(e.target.value)}
                  placeholder="e.g. PlayerOne"
                  className="w-full bg-[#0B0B0B] border border-[#222] focus:border-[#E6FF00] p-3 text-white font-mono text-sm outline-none uppercase"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlayerModal(false)}
                  className="px-4 py-2 bg-[#1A1A1A] text-gray-300 font-mono text-xs font-bold uppercase hover:bg-[#262626]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E6FF00] text-black font-mono text-xs font-black uppercase hover:bg-[#cbe600]"
                >
                  CONFIRM ENTRY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
