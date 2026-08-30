import React, { useState } from 'react';
import { Settings, Check, Shield, MapPin, Crosshair, Plus, Trash2 } from 'lucide-react';
import { TournamentConfig, ModeWithMaps } from '../types';

interface TournamentConfigViewProps {
  config: TournamentConfig;
  modes: ModeWithMaps[];
  onSaveConfig: (updatedConfig: TournamentConfig) => void;
  onAddMode: (modeName: string) => void;
  onDeleteMode: (modeId: string) => void;
  onAddMapToMode: (modeId: string, mapName: string) => void;
  onDeleteMapFromMode: (modeId: string, mapName: string) => void;
}

export const TournamentConfigView: React.FC<TournamentConfigViewProps> = ({
  config,
  modes,
  onSaveConfig,
  onAddMode,
  onDeleteMode,
  onAddMapToMode,
  onDeleteMapFromMode
}) => {
  const [name, setName] = useState(config.name);
  const [selectedModeName, setSelectedModeName] = useState(config.gameMode || (modes[0]?.name ?? ''));
  const [selectedMapName, setSelectedMapName] = useState(config.mapName || '');

  const [newModeInput, setNewModeInput] = useState('');
  const [newMapInput, setNewMapInput] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  // Find currently active mode object
  const activeModeObj = modes.find((m) => m.name === selectedModeName) || modes[0];
  const activeMapsList = activeModeObj ? activeModeObj.maps : [];

  const handleCreateMode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModeInput.trim()) return;
    const cleanModeName = newModeInput.trim();
    onAddMode(cleanModeName);
    setSelectedModeName(cleanModeName);
    setNewModeInput('');
  };

  const handleCreateMap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMapInput.trim() || !activeModeObj) return;
    const cleanMapName = newMapInput.trim();
    onAddMapToMode(activeModeObj.id, cleanMapName);
    setSelectedMapName(cleanMapName);
    setNewMapInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMode = selectedModeName || (modes[0]?.name ?? 'Default Mode');
    const finalMap = selectedMapName || (activeMapsList[0] ?? 'Default Map');

    const updated: TournamentConfig = {
      ...config,
      name,
      gameMode: finalMode,
      mapName: finalMap
    };

    onSaveConfig(updated);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-[#121212] border border-[#FF003C] p-6 relative overflow-hidden glow-red">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-[#FF003C] text-white">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold italic uppercase tracking-tighter text-white">
              TOURNAMENT CONFIGURATION
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Customize game modes, assign map sets to each mode, and select your tournament setup.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#1A1A1A] p-6 space-y-6">
        {/* Tournament Name */}
        <div>
          <label className="block text-[10px] font-mono font-bold uppercase text-gray-400 mb-1 flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-[#E6FF00]" />
            <span>TOURNAMENT TITLE</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0B0B0B] border border-[#222] focus:border-[#E6FF00] p-3 text-white font-mono text-sm outline-none uppercase font-bold"
          />
        </div>

        {/* STEP 1: Select or Add Game Mode */}
        <div className="space-y-3 pt-2 border-t border-[#1A1A1A]">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-mono font-bold uppercase text-gray-400 flex items-center space-x-1.5">
              <Crosshair className="w-3.5 h-3.5 text-[#E6FF00]" />
              <span>STEP 1: SELECT GAME MODE</span>
            </label>
            <span className="text-[10px] font-mono text-gray-500 uppercase">
              {modes.length} MODES DEFINED
            </span>
          </div>

          {/* Mode Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {modes.map((mode) => {
              const isSelected = selectedModeName === mode.name;
              return (
                <div
                  key={mode.id}
                  onClick={() => {
                    setSelectedModeName(mode.name);
                    if (mode.maps.length > 0 && !mode.maps.includes(selectedMapName)) {
                      setSelectedMapName(mode.maps[0]);
                    }
                  }}
                  className={`p-3 border cursor-pointer font-mono text-xs transition relative group ${
                    isSelected
                      ? 'bg-[#E6FF00] text-black border-[#E6FF00] neon-border-yellow font-bold'
                      : 'bg-[#0B0B0B] text-gray-300 border-[#222] hover:border-[#444]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-wide font-black truncate">{mode.name}</span>
                    {modes.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMode(mode.id);
                          if (selectedModeName === mode.name) {
                            const remaining = modes.filter((m) => m.id !== mode.id);
                            if (remaining.length > 0) {
                              setSelectedModeName(remaining[0].name);
                            }
                          }
                        }}
                        className={`p-1 opacity-0 group-hover:opacity-100 transition ${
                          isSelected ? 'hover:text-red-600 text-black' : 'hover:text-[#FF003C] text-gray-500'
                        }`}
                        title="Delete Mode"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className={`text-[10px] mt-1 ${isSelected ? 'text-black/70' : 'text-gray-500'}`}>
                    {mode.maps.length} MAP{mode.maps.length !== 1 ? 'S' : ''} AVAILABLE
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inline Add Mode Form */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="text"
              placeholder="ADD NEW MODE (e.g. Control Point)..."
              value={newModeInput}
              onChange={(e) => setNewModeInput(e.target.value)}
              className="flex-1 bg-[#0B0B0B] border border-[#222] focus:border-[#E6FF00] p-2.5 text-white font-mono text-xs outline-none uppercase"
            />
            <button
              type="button"
              onClick={handleCreateMode}
              className="px-4 py-2.5 bg-[#1A1A1A] border border-[#333] hover:border-[#E6FF00] hover:text-[#E6FF00] text-gray-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5 text-[#E6FF00]" />
              <span>ADD MODE</span>
            </button>
          </div>
        </div>

        {/* STEP 2: Select or Add Map Under Selected Mode */}
        {activeModeObj && (
          <div className="space-y-3 pt-2 border-t border-[#1A1A1A]">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono font-bold uppercase text-gray-400 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E6FF00]" />
                <span>STEP 2: SELECT MAP FOR [{activeModeObj.name.toUpperCase()}]</span>
              </label>
              <span className="text-[10px] font-mono text-gray-500 uppercase">
                {activeMapsList.length} MAPS IN MODE
              </span>
            </div>

            {activeMapsList.length === 0 ? (
              <div className="p-4 bg-[#0B0B0B] border border-dashed border-[#222] text-center text-xs text-gray-500 font-mono uppercase">
                No maps added to {activeModeObj.name} yet. Add a map below.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {activeMapsList.map((mapName) => {
                  const isSelected = selectedMapName === mapName;
                  return (
                    <div
                      key={mapName}
                      onClick={() => setSelectedMapName(mapName)}
                      className={`p-3 border cursor-pointer font-mono text-xs transition relative group flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#E6FF00] text-black border-[#E6FF00] neon-border-yellow font-bold'
                          : 'bg-[#0B0B0B] text-gray-300 border-[#222] hover:border-[#444]'
                      }`}
                    >
                      <span className="uppercase tracking-wide font-bold truncate">{mapName}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMapFromMode(activeModeObj.id, mapName);
                          if (selectedMapName === mapName) {
                            const remaining = activeMapsList.filter((m) => m !== mapName);
                            if (remaining.length > 0) {
                              setSelectedMapName(remaining[0]);
                            } else {
                              setSelectedMapName('');
                            }
                          }
                        }}
                        className={`p-1 opacity-0 group-hover:opacity-100 transition ${
                          isSelected ? 'hover:text-red-600 text-black' : 'hover:text-[#FF003C] text-gray-500'
                        }`}
                        title="Delete Map"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Inline Add Map Form */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                placeholder={`ADD MAP TO ${activeModeObj.name.toUpperCase()} (e.g. Shutter Island)...`}
                value={newMapInput}
                onChange={(e) => setNewMapInput(e.target.value)}
                className="flex-1 bg-[#0B0B0B] border border-[#222] focus:border-[#E6FF00] p-2.5 text-white font-mono text-xs outline-none uppercase"
              />
              <button
                type="button"
                onClick={handleCreateMap}
                className="px-4 py-2.5 bg-[#1A1A1A] border border-[#333] hover:border-[#E6FF00] hover:text-[#E6FF00] text-gray-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5 text-[#E6FF00]" />
                <span>ADD MAP</span>
              </button>
            </div>
          </div>
        )}

        {/* Submit Save Button */}
        <div className="pt-4 border-t border-[#1A1A1A] flex items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-[#E6FF00] hover:bg-[#cbe600] text-black font-mono font-black text-xs uppercase tracking-wider flex items-center space-x-2 border border-[#E6FF00] neon-border-yellow transition"
          >
            <Check className="w-4 h-4" />
            <span>SAVE TOURNAMENT SELECTION</span>
          </button>

          {savedNotice && (
            <span className="text-xs font-mono font-bold text-[#E6FF00] uppercase animate-pulse">
              ✓ TOURNAMENT SETUP SAVED
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
