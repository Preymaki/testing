import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { celestialAudio } from '../../audio/CelestialAudioEngine';

export const CelestialAudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-pause when tab is hidden, resume if previously playing
  useEffect(() => {
    let wasPlayingBeforeHidden = false;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (celestialAudio.getIsPlaying()) {
          wasPlayingBeforeHidden = true;
          celestialAudio.pause();
          setIsPlaying(false);
        }
      } else if (wasPlayingBeforeHidden) {
        wasPlayingBeforeHidden = false;
        celestialAudio.play().then((started) => {
          setIsPlaying(started);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const toggleAudio = async () => {
    if (isPlaying) {
      celestialAudio.pause();
      setIsPlaying(false);
    } else {
      const started = await celestialAudio.play();
      setIsPlaying(started);
    }
  };

  return (
    <div className="relative pointer-events-auto">
      <button
        type="button"
        onClick={toggleAudio}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 select-none ${
          isPlaying
            ? 'bg-[#060913]/90 border-cyan-400/50 text-white shadow-[0_0_20px_rgba(0,240,255,0.35),inset_0_0_12px_rgba(0,240,255,0.15)] ring-1 ring-cyan-400/40'
            : 'bg-[#090A0E]/70 border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]'
        }`}
        aria-label={isPlaying ? 'Mute celestial space soundscape' : 'Play celestial space soundscape'}
        title={isPlaying ? 'Mute celestial ambiance' : 'Play celestial ambiance'}
      >
        {/* Animated Sound Waves / Status Icon */}
        <div className="relative flex items-center justify-center w-4 h-4">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[2.5px] h-full bg-cyan-400 rounded-full animate-[soundWave1_0.9s_ease-in-out_infinite_alternate]" />
              <span className="w-[2.5px] h-full bg-yellow-300 rounded-full animate-[soundWave2_0.7s_ease-in-out_infinite_alternate]" />
              <span className="w-[2.5px] h-full bg-fuchsia-400 rounded-full animate-[soundWave3_1.1s_ease-in-out_infinite_alternate]" />
            </div>
          ) : (
            <VolumeX size={15} className="transition-transform group-hover:scale-110 text-white/60" />
          )}
        </div>

        {/* Text Label on Desktop */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase font-semibold">
          {isPlaying ? (
            <>
              <span className="text-cyan-400">CELESTIAL</span>
              <span className="text-white/40">//</span>
              <span className="text-yellow-300">ON</span>
            </>
          ) : (
            <>
              <span className="text-white/40">SOUND</span>
              <span className="text-white/60 group-hover:text-white transition-colors">
                {isHovered ? 'ENABLE' : 'OFF'}
              </span>
            </>
          )}
        </div>

        {/* Pulsing indicator dot */}
        {isPlaying && (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.9)] animate-pulse" />
        )}
      </button>

      {/* Subtle First-Time Hint Pill when Sound is Off (disappears on first interaction) */}
      {!isPlaying && (
        <style>{`
          @keyframes soundWave1 {
            0% { height: 25%; }
            100% { height: 100%; }
          }
          @keyframes soundWave2 {
            0% { height: 100%; }
            100% { height: 35%; }
          }
          @keyframes soundWave3 {
            0% { height: 40%; }
            100% { height: 90%; }
          }
        `}</style>
      )}
    </div>
  );
};
