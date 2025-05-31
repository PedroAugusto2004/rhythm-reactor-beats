
import { useState, useEffect, useRef } from 'react';

interface DrumPad {
  id: string;
  key: string;
  name: string;
  src: string;
}

const drumPads: DrumPad[] = [
  { id: 'heater-1', key: 'Q', name: 'Heater 1', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' },
  { id: 'heater-2', key: 'W', name: 'Heater 2', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' },
  { id: 'heater-3', key: 'E', name: 'Heater 3', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
  { id: 'heater-4', key: 'A', name: 'Heater 4', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' },
  { id: 'clap', key: 'S', name: 'Clap', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
  { id: 'open-hh', key: 'D', name: 'Open-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
  { id: 'kick-n-hat', key: 'Z', name: "Kick-n'-Hat", src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
  { id: 'kick', key: 'X', name: 'Kick', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
  { id: 'closed-hh', key: 'C', name: 'Closed-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' }
];

const Index = () => {
  const [display, setDisplay] = useState('');
  const [activePad, setActivePad] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSound = (pad: DrumPad) => {
    const audio = audioRefs.current[pad.key];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(pad.name);
      setActivePad(pad.key);
      setTimeout(() => setActivePad(null), 150);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const pad = drumPads.find(p => p.key === key);
      if (pad) {
        playSound(pad);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div id="drum-machine" className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Drum Machine
          </h1>
          <div 
            id="display" 
            className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-4 min-h-[60px] flex items-center justify-center"
          >
            <span className="text-cyan-400 text-xl font-mono">
              {display || 'Press a key or click a pad'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {drumPads.map((pad) => (
            <button
              key={pad.key}
              id={pad.id}
              className={`drum-pad relative bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 
                         border-2 border-purple-500/40 hover:border-cyan-400/60 rounded-lg p-6 
                         transition-all duration-150 transform hover:scale-105 active:scale-95
                         ${activePad === pad.key 
                           ? 'shadow-lg shadow-cyan-400/50 border-cyan-400 bg-gradient-to-br from-cyan-600/20 to-purple-600/20' 
                           : 'shadow-lg shadow-purple-500/20'
                         }`}
              onClick={() => playSound(pad)}
            >
              <span className="text-white text-2xl font-bold font-mono">
                {pad.key}
              </span>
              <audio
                ref={(el) => {
                  if (el) audioRefs.current[pad.key] = el;
                }}
                className="clip"
                id={pad.key}
                src={pad.src}
                preload="auto"
              />
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Use your keyboard (Q, W, E, A, S, D, Z, X, C) or click the pads
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
