import React from 'react';
import { Crown, Trophy, Award, Sparkles } from 'lucide-react';
import { HallOfFameEntry } from '../types';

interface HallOfFameViewProps {
  entries: HallOfFameEntry[];
}

export const HallOfFameView: React.FC<HallOfFameViewProps> = ({
  entries
}) => {
  // Sort by occurrence order (1, 2, 3...)
  const sortedEntries = [...entries].sort((a, b) => a.occurrence - b.occurrence);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#121212] border border-[#1A1A1A] p-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-4 z-10">
          <div className="w-12 h-12 bg-[#1A1A1A] border border-[#E6FF00] glow-yellow flex items-center justify-center flex-shrink-0">
            <Crown className="w-6 h-6 text-[#E6FF00]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono text-[#E6FF00] uppercase font-bold tracking-widest bg-[#1A1A1A] px-2 py-0.5 border border-[#333]">
                VICTORY WALL
              </span>
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mt-1">
              HALL OF <span className="text-[#E6FF00]">CHAMPIONS</span>
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Honoring the champions and iconic winners of past tournaments.
            </p>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#E6FF00]/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Hall of Fame List */}
      <div className="bg-[#121212] border border-[#1A1A1A]">
        <div className="p-4 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0E0E0E]">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#E6FF00]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-200">
              PAST CHAMPIONS ({sortedEntries.length})
            </h3>
          </div>
          <span className="text-[10px] font-mono text-gray-500 uppercase font-semibold">HONOR ROLL</span>
        </div>

        {sortedEntries.length === 0 ? (
          <div className="p-12 text-center">
            <Trophy className="w-12 h-12 mx-auto text-gray-700 mb-3" />
            <p className="font-mono text-sm font-bold text-gray-400 uppercase">NO CHAMPIONS REGISTERED YET</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1A1A1A]">
            {sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#161616] transition group"
              >
                <div className="flex items-center space-x-4">
                  {/* Edition / Rank Badge */}
                  <div className="w-10 h-10 bg-[#1A1A1A] border border-[#333] group-hover:border-[#E6FF00] transition flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-black font-mono text-[#E6FF00]">
                      #{entry.occurrence}
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#E6FF00] transition">
                      {entry.tournamentName}
                    </div>
                  </div>
                </div>

                {/* Winner Display */}
                <div className="flex items-center space-x-4 self-end sm:self-center">
                  <div className="bg-[#0A0A0A] border border-[#222] px-4 py-2 flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-[#FF003C]" />
                    <div>
                      <span className="text-[9px] font-mono text-gray-500 uppercase block leading-none">CHAMPION</span>
                      <span className="text-sm font-black font-mono text-[#FF003C] uppercase tracking-wider block mt-0.5">
                        {entry.winnerName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
