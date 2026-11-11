import React, { useState, useEffect, useRef } from 'react';
import {
  CubeState,
  createSolvedCube,
  applyMove,
  FaceName,
  CUBE_COLORS_HEX,
} from '../../utils/cubeEngine';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface AutoSolvingCubeProps {
  size?: number; // size in px, e.g. 150
  lang: 'fr' | 'en';
}

// Full deterministic solve sequence: Scramble, followed by solving steps
const SOLVE_PHASES = [
  {
    phase: 'Cross',
    title: { fr: 'Résolution de la Croix', en: 'Cross Alignment' },
    moves: ['D', 'R', "F'", 'D2'],
  },
  {
    phase: 'F2L',
    title: { fr: 'Insertion Paires F2L', en: 'F2L Pair Insertion' },
    moves: ['U', 'R', "U'", "R'", 'U', "F'", 'U', 'F'],
  },
  {
    phase: 'OLL',
    title: { fr: 'Orientation OLL', en: 'OLL Orientation' },
    moves: ['F', 'R', 'U', "R'", "U'", "F'"],
  },
  {
    phase: 'PLL',
    title: { fr: 'Permutation Finale PLL (T-Perm)', en: 'PLL Permutation (T-Perm)' },
    moves: ['R', 'U', "R'", "U'", "R'", 'F', 'R2', "U'", "R'", "U'", 'R', 'U', "R'", "F'"],
  },
];

export const AutoSolvingCube: React.FC<AutoSolvingCubeProps> = ({ size = 150, lang }) => {
  const [cubeState, setCubeState] = useState<CubeState>(createSolvedCube);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentMove, setCurrentMove] = useState<string>('START');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [moveIndexInPhase, setMoveIndexInPhase] = useState<number>(0);
  const [isSolvedDisplay, setIsSolvedDisplay] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1 = 600ms, 2 = 300ms

  const halfSize = size / 2;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Setup initial scrambled state based on the inverse of the solve sequence
  const resetToScrambledStart = () => {
    // Collect all solve moves
    const allMoves = SOLVE_PHASES.flatMap((p) => p.moves);
    // Invert moves to create the exact scrambled starting state
    let s = createSolvedCube();
    // Apply inverse of moves in reverse order:
    // To solve with move M, starting state must be inverted
    for (let i = allMoves.length - 1; i >= 0; i--) {
      const m = allMoves[i];
      const inv = m.endsWith("'") ? m[0] : m.endsWith('2') ? m : `${m}'`;
      s = applyMove(s, inv);
    }
    setCubeState(s);
    setCurrentPhaseIndex(0);
    setMoveIndexInPhase(0);
    setCurrentMove('INIT');
    setIsSolvedDisplay(false);
  };

  // Initialize on mount
  useEffect(() => {
    resetToScrambledStart();
  }, []);

  // Auto-solve step execution
  useEffect(() => {
    if (!isPlaying) return;

    const baseDelay = isSolvedDisplay ? 3500 : 700 / speedMultiplier;

    timerRef.current = setTimeout(() => {
      if (isSolvedDisplay) {
        // Reset and start new cycle
        resetToScrambledStart();
        return;
      }

      const activePhase = SOLVE_PHASES[currentPhaseIndex];
      if (!activePhase) {
        setIsSolvedDisplay(true);
        setCurrentMove('SOLVED');
        return;
      }

      const move = activePhase.moves[moveIndexInPhase];
      if (move) {
        setCubeState((prev) => applyMove(prev, move));
        setCurrentMove(move);

        if (moveIndexInPhase + 1 < activePhase.moves.length) {
          setMoveIndexInPhase((idx) => idx + 1);
        } else {
          // Advance to next phase
          if (currentPhaseIndex + 1 < SOLVE_PHASES.length) {
            setCurrentPhaseIndex((p) => p + 1);
            setMoveIndexInPhase(0);
          } else {
            // Finished all phases!
            setIsSolvedDisplay(true);
            setCurrentMove('SOLVED');
          }
        }
      }
    }, baseDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentPhaseIndex, moveIndexInPhase, isSolvedDisplay, speedMultiplier]);

  const renderFaceStickers = (face: FaceName) => {
    const stickers = cubeState[face];
    return (
      <div
        className="w-full h-full grid grid-cols-3 grid-rows-3 gap-[2px] p-[3px] bg-stone-950 rounded-md select-none shadow-inner"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {stickers.map((color, idx) => {
          const hex = CUBE_COLORS_HEX[color];
          return (
            <div
              key={idx}
              className="relative rounded-[2px] shadow-sm transition-colors duration-200 overflow-hidden"
              style={{
                backgroundColor: hex,
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/20 pointer-events-none" />
            </div>
          );
        })}
      </div>
    );
  };

  const currentPhaseTitle = SOLVE_PHASES[currentPhaseIndex]?.title[lang] || (lang === 'fr' ? 'Cube Résolu' : 'Cube Solved');

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-stone-950 text-stone-100 border border-stone-800 rounded-2xl shadow-xl select-none">
      {/* Header bar: Phase status & Live move indicator */}
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-amber-400">
            {isSolvedDisplay
              ? lang === 'fr' ? 'État : Résolu !' : 'State: Solved!'
              : `${lang === 'fr' ? 'Étape' : 'Phase'} ${currentPhaseIndex + 1}/4`}
          </span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-stone-300 font-medium text-[11px] truncate max-w-[140px]">
            {isSolvedDisplay ? (lang === 'fr' ? 'Harmonie WCA' : 'WCA Harmonized') : currentPhaseTitle}
          </span>
        </div>

        {/* Current Move badge */}
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="text-stone-400">Move:</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40">
            {currentMove}
          </span>
        </div>
      </div>

      {/* 3D Auto-Solving Viewport */}
      <div
        className="perspective-1000 flex items-center justify-center my-4 py-2"
        style={{
          width: `${size + 50}px`,
          height: `${size + 50}px`,
        }}
      >
        <div
          className="preserve-3d animate-cube-orbit transform-gpu"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('F')}
          </div>
          {/* BACK */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('B')}
          </div>
          {/* LEFT */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('L')}
          </div>
          {/* RIGHT */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('R')}
          </div>
          {/* UP */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('U')}
          </div>
          {/* DOWN */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
          >
            {renderFaceStickers('D')}
          </div>
        </div>
      </div>

      {/* Interactive Controls Strip */}
      <div className="w-full pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            type="button"
            className="p-1.5 rounded-lg bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Auto-Solve' : 'Resume Auto-Solve'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={resetToScrambledStart}
            type="button"
            className="p-1.5 rounded-lg bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
            title="Restart Auto-Solve Cycle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-stone-400">Speed:</span>
          <button
            onClick={() => setSpeedMultiplier((s) => (s === 1 ? 2 : 1))}
            type="button"
            className="px-2 py-0.5 font-mono text-[11px] rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 font-semibold cursor-pointer"
          >
            {speedMultiplier}x
          </button>
        </div>
      </div>
    </div>
  );
};
