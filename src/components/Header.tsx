import React, { useState } from 'react';
import { Target, Trophy, Settings, Crown, RotateCcw, AlertTriangle } from 'lucide-react';
import { TournamentConfig, PlayerScore } from '../types';

interface HeaderProps {
  activeTab: 'scoreboard' | 'hall-of-fame' | 'config';
  setActiveTab: (tab: 'scoreboard' | 'hall-of-fame' | 'config') => void;
  config: TournamentConfig;
  leader?: PlayerScore;
  onResetAllData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  config,
  leader,
  onResetAllData
}) => {
  const [showResetModal, setShowResetModal] = useState(false);

  const handleConfirmReset = () => {
    onResetAllData();
    setShowResetModal(false);
  };

  return (
    <>
      <header className="border-b border-[#1A1A1A] bg-[#0B0B0B]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Ticker / Status Bar */}
      <div className="bg-[#121212] border-b border-[#1A1A1A] px-4 py-1.5 text-xs text-gray-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-[#E6FF00] font-mono text-[11px] font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6FF00]"></span>
            </span>
            <span>SYSTEM ONLINE</span>
          </span>
          <span className="text-gray-700">|</span>
          <span className="font-mono text-gray-400 text-xs">
            MAP: <span className="text-white font-semibold uppercase">{config.mapName || 'NONE'}</span> (<span className="text-[#E6FF00] font-semibold">{config.gameMode || 'NONE'}</span>)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {leader && (
            <div className="flex items-center space-x-2 bg-[#1A1A1A] px-2.5 py-0.5 border border-[#222]">
              <Trophy className="w-3.5 h-3.5 text-[#E6FF00]" />
              <span className="text-gray-400 font-mono text-[11px] uppercase">LEADER:</span>
              <span className="font-mono font-bold text-sm text-[#FF003C] uppercase tracking-tighter">{leader.gamerTag}</span>
              <span className="text-gray-500 text-[11px] font-mono">({leader.totalScore} pts)</span>
            </div>
          )}

          {/* Reset All Data Button */}
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center space-x-1.5 bg-[#FF003C]/10 hover:bg-[#FF003C] text-[#FF003C] hover:text-white px-2.5 py-0.5 border border-[#FF003C]/40 transition-all font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer"
            title="Wipe mid-tournament state and reset app"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET DATA</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#121212] border border-[#FF003C] glow-red flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-[#FF003C]" />
          </div>
          <div>
            <div className="text-[#E6FF00] font-mono text-xs font-bold uppercase tracking-widest mb-1">
              {config.name || 'UNNAMED TOURNAMENT'}
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter italic uppercase leading-none glitch-text text-white">
                BLOOD<span className="text-[#FF003C]">STRIKE</span>
              </h1>
              <span className="bg-[#1A1A1A] text-[10px] font-mono text-[#E6FF00] px-1.5 py-0.5 border border-[#333] uppercase font-bold tracking-widest">
                MANAGER
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 bg-[#121212] p-1 border border-[#1A1A1A] overflow-x-auto">
          <button
            onClick={() => setActiveTab('scoreboard')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
              activeTab === 'scoreboard'
                ? 'bg-[#E6FF00] text-black neon-border-yellow'
                : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>SCOREBOARD</span>
          </button>

          <button
            onClick={() => setActiveTab('hall-of-fame')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
              activeTab === 'hall-of-fame'
                ? 'bg-[#E6FF00] text-black neon-border-yellow'
                : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <Crown className="w-4 h-4 text-[#FF003C]" />
            <span>HALL OF FAME</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
              activeTab === 'config'
                ? 'bg-[#E6FF00] text-black neon-border-yellow'
                : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>CONFIG</span>
          </button>
        </nav>
      </div>
    </header>

    {/* Reset Confirmation Modal */}
    {showResetModal && (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
        <div className="bg-[#121212] border border-[#FF003C] max-w-md w-full p-6 space-y-5 glow-red shadow-2xl relative z-[101]">
          <div className="flex items-center space-x-3 text-[#FF003C] border-b border-[#1A1A1A] pb-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              RESET ALL TOURNAMENT DATA?
            </h3>
          </div>

          <p className="text-xs text-gray-300 font-mono leading-relaxed">
            This will clear all active players, round scores, custom game modes, and configurations stored in your browser's local cache. This action cannot be undone.
          </p>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              onClick={() => setShowResetModal(false)}
              className="px-4 py-2 bg-[#1A1A1A] text-gray-300 font-mono text-xs font-bold uppercase hover:bg-[#222] transition cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirmReset}
              className="px-4 py-2 bg-[#FF003C] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#cc0030] transition cursor-pointer"
            >
              CONFIRM RESET
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
};
