import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Cube3D } from './Cube3D';
import {
  CubeState,
  createSolvedCube,
  applyMove,
  generateWcaScramble,
  isCubeSolved,
  FaceName,
} from '../../utils/cubeEngine';
import { RUBIKS_CFOP_STAGES } from '../../data/portfolioData';
import { Language } from '../../types/portfolio';
import { Play, RotateCcw, Shuffle, Timer, Award, BrainCircuit, Sparkles, HelpCircle } from 'lucide-react';

interface RubiksCubeSectionProps {
  lang: Language;
}

export const RubiksCubeSection: React.FC<RubiksCubeSectionProps> = ({ lang }) => {
  const [cubeState, setCubeState] = useState<CubeState>(createSolvedCube);
  const [currentScramble, setCurrentScramble] = useState<string>('R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\'');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [isSolvingAnim, setIsSolvingAnim] = useState<boolean>(false);
  
  // Speedcubing Timer State
  const [timerStatus, setTimerStatus] = useState<'idle' | 'holding' | 'inspecting' | 'running' | 'finished'>('idle');
  const [timerTime, setTimerTime] = useState<number>(0);
  const [solvesList, setSolvesList] = useState<number[]>([18.42, 16.95, 19.12, 15.84, 17.20]);
  const timerStartRef = useRef<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active tab in algorithms
  const [activeCfopTab, setActiveCfopTab] = useState<number>(0);

  // Check solved condition
  useEffect(() => {
    if (moveHistory.length > 0 && isCubeSolved(cubeState)) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [cubeState, moveHistory]);

  const handleMakeMove = (move: string) => {
    setCubeState((prev) => applyMove(prev, move));
    setMoveHistory((prev) => [...prev.slice(-15), move]);
  };

  const handleScramble = () => {
    const scramble = generateWcaScramble(20);
    setCurrentScramble(scramble);
    const moves = scramble.split(' ');
    
    // Apply scramble sequentially for nice quick visual effect
    let s = createSolvedCube();
    for (const m of moves) {
      s = applyMove(s, m);
    }
    setCubeState(s);
    setMoveHistory([]);
  };

  const handleResetToSolved = () => {
    setIsSolvingAnim(true);
    setCubeState(createSolvedCube());
    setMoveHistory([]);
    setTimeout(() => setIsSolvingAnim(false), 300);
  };

  // Speedcubing Timer Handlers
  const startTimerHolding = () => {
    if (timerStatus === 'running') {
      stopTimer();
      return;
    }
    setTimerStatus('holding');
    holdTimeoutRef.current = setTimeout(() => {
      setTimerStatus('inspecting');
    }, 400);
  };

  const releaseTimerHolding = () => {
    if (timerStatus === 'inspecting') {
      // Start real timing
      setTimerStatus('running');
      setTimerTime(0);
      timerStartRef.current = performance.now();
      timerIntervalRef.current = setInterval(() => {
        setTimerTime((performance.now() - timerStartRef.current) / 1000);
      }, 33);
    } else if (timerStatus === 'holding') {
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      setTimerStatus('idle');
    }
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    const finalTime = (performance.now() - timerStartRef.current) / 1000;
    setTimerTime(finalTime);
    setTimerStatus('finished');
    setSolvesList((prev) => [finalTime, ...prev.slice(0, 9)]);
    
    // If it's a fast sub-20 solve, throw celebratory confetti!
    if (finalTime < 20) {
      confetti({
        particleCount: 50,
        spread: 50,
      });
    }
  };

  // Calculate stats
  const bestTime = solvesList.length > 0 ? Math.min(...solvesList).toFixed(2) : '--';
  const averageAo5 = solvesList.length >= 5
    ? (solvesList.slice(0, 5).reduce((a, b) => a + b, 0) / 5).toFixed(2)
    : '--';

  const faceButtons: { label: string; move: string }[] = [
    { label: 'U (Up)', move: 'U' },
    { label: "U'", move: "U'" },
    { label: 'R (Right)', move: 'R' },
    { label: "R'", move: "R'" },
    { label: 'F (Front)', move: 'F' },
    { label: "F'", move: "F'" },
    { label: 'L (Left)', move: 'L' },
    { label: "L'", move: "L'" },
    { label: 'D (Down)', move: 'D' },
    { label: "D'", move: "D'" },
    { label: 'B (Back)', move: 'B' },
    { label: "B'", move: "B'" },
  ];

  const solved = isCubeSolved(cubeState);

  return (
    <section id="rubiks-cube" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2">
              <span>{lang === 'fr' ? 'Passion Algorithmique & Résolution' : 'Algorithmic Mastery & Speedcubing'}</span>
              <span>·</span>
              <span>WCA Official Mechanics</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
              {lang === 'fr' ? 'Laboratoire Rubik’s Cube 3D' : 'The 3D Rubik’s Cube Lab'}
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
              {lang === 'fr'
                ? 'Le speedcubing m’a appris la décomposition de problèmes complexes en sous-étapes déterministes, la mémorisation de patterns et l’optimisation sous contraintes de temps. Testez et manipulez le cube directement ci-dessous.'
                : 'Speedcubing trained my engineering mindset: deterministic state transitions, fast spatial pattern recognition, and microsecond algorithmic execution. Interact with the live 3D cube below.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleScramble}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer border border-stone-300 dark:border-stone-700 shadow-sm"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'fr' ? 'Mélanger (WCA Scramble)' : 'Generate Scramble'}</span>
            </button>
            <button
              onClick={handleResetToSolved}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 rounded-lg transition-colors cursor-pointer border border-amber-300 dark:border-amber-500/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Résoudre / Réinitialiser' : 'Solve / Reset State'}</span>
            </button>
          </div>
        </div>

        {/* Current Scramble Banner */}
        <div className="mb-8 p-3.5 bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400">
            <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">Scramble:</span>
            <span className="font-mono text-stone-900 dark:text-stone-200 select-all tracking-wider">{currentScramble}</span>
          </div>
          <div className="flex items-center gap-3 text-stone-500 text-[11px]">
            <span>{lang === 'fr' ? 'Statut :' : 'Status:'}</span>
            {solved ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {lang === 'fr' ? 'Résolu (Solved)' : 'Solved'}
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                {lang === 'fr' ? 'En cours de jeu' : 'In Progress'}
              </span>
            )}
          </div>
        </div>

        {/* 2-Column Split: 3D Cube Canvas on Left, Controls & Speedcubing Timer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas: 3D Cube */}
          <div className="lg:col-span-6 bg-white dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden shadow-md">
            {/* Background subtle grid pattern */}
            <div className="absolute inset-0 bg-cube-pattern opacity-40 pointer-events-none" />

            {/* 3D Cube Component */}
            <Cube3D cubeState={cubeState} size={200} interactive={true} />

            {/* Recent Moves Feed */}
            <div className="w-full mt-6 pt-4 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-mono text-[11px]">
                {lang === 'fr' ? 'Derniers mouvements :' : 'Move Sequence:'}
              </span>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[280px] custom-scrollbar py-1">
                {moveHistory.length === 0 ? (
                  <span className="text-stone-400 italic text-[11px]">{lang === 'fr' ? 'Aucun' : 'None yet'}</span>
                ) : (
                  moveHistory.map((m, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 text-amber-700 dark:text-amber-400 font-mono text-[11px] rounded"
                    >
                      {m}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Face Move Buttons & Interactive Speedcubing Timer */}
          <div className="lg:col-span-6 space-y-6">
            {/* Face Rotation Buttons */}
            <div className="bg-white dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider font-mono">
                  {lang === 'fr' ? 'Mouvements Manuels (Face Rotations)' : 'Manual Turn Controls'}
                </h3>
                <span className="text-xs text-stone-500">
                  {lang === 'fr' ? 'Appuyez pour tourner' : 'Click to rotate'}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {faceButtons.map(({ label, move }) => (
                  <button
                    key={move}
                    onClick={() => handleMakeMove(move)}
                    type="button"
                    className="p-2.5 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-amber-500/20 active:text-amber-500 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-mono font-medium text-xs rounded-lg transition-all text-center cursor-pointer shadow-sm"
                  >
                    {move}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                <span>Notation WCA (U, D, F, B, L, R)</span>
                <span>' = Anti-horaire</span>
              </div>
            </div>

            {/* Speedcubing Timer Box */}
            <div className="bg-white dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider font-mono">
                    {lang === 'fr' ? 'Chronomètre Speedcubing WCA' : 'WCA Speedcubing Stopwatch'}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-stone-500 dark:text-stone-400">
                  <span>PB: <strong className="text-amber-600 dark:text-amber-400">{bestTime}s</strong></span>
                  <span>·</span>
                  <span>Ao5: <strong className="text-stone-800 dark:text-stone-200">{averageAo5}s</strong></span>
                </div>
              </div>

              {/* Big Digital Display */}
              <div className="my-3 py-6 bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-xl text-center flex flex-col items-center justify-center select-none">
                <span
                  className={`text-4xl md:text-5xl font-mono font-bold tracking-tight tabular-nums transition-colors ${
                    timerStatus === 'inspecting'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : timerStatus === 'holding'
                      ? 'text-amber-600 dark:text-amber-400'
                      : timerStatus === 'running'
                      ? 'text-stone-900 dark:text-white'
                      : 'text-stone-800 dark:text-stone-300'
                  }`}
                >
                  {timerTime.toFixed(2)}
                  <span className="text-xl md:text-2xl text-stone-400 font-normal ml-1">s</span>
                </span>

                <div className="mt-2 text-xs font-mono text-stone-500">
                  {timerStatus === 'idle' && (lang === 'fr' ? 'Maintenez le bouton ou l’espace pour armer' : 'Touch & hold button below to arm timer')}
                  {timerStatus === 'holding' && (lang === 'fr' ? 'Maintenez...' : 'Hold ready...')}
                  {timerStatus === 'inspecting' && (lang === 'fr' ? 'PRÊT ! Relâchez pour lancer le chrono' : 'READY! Release to start timing')}
                  {timerStatus === 'running' && (lang === 'fr' ? 'Chronomètre en cours... Cliquez pour stopper' : 'Timing in progress... Click anywhere to stop')}
                  {timerStatus === 'finished' && (lang === 'fr' ? 'Temps enregistré !' : 'Solve recorded!')}
                </div>
              </div>

              {/* Timer Action Button */}
              <div className="flex items-center gap-3">
                <button
                  onMouseDown={startTimerHolding}
                  onMouseUp={releaseTimerHolding}
                  onTouchStart={startTimerHolding}
                  onTouchEnd={releaseTimerHolding}
                  type="button"
                  className={`w-full py-3 px-4 rounded-xl font-medium text-xs md:text-sm transition-all cursor-pointer select-none text-center flex items-center justify-center gap-2 ${
                    timerStatus === 'running'
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                      : timerStatus === 'inspecting'
                      ? 'bg-emerald-500 text-stone-950 font-bold scale-[1.02]'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                  }`}
                >
                  {timerStatus === 'running' ? (
                    <>
                      <span>{lang === 'fr' ? 'STOPPER LE CHRONO' : 'STOP TIMER'}</span>
                    </>
                  ) : timerStatus === 'inspecting' ? (
                    <>
                      <span>{lang === 'fr' ? 'PRÊT (RELÂCHEZ)' : 'READY (RELEASE TO START)'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{lang === 'fr' ? 'Maintenir pour armer le chronomètre' : 'Hold to arm / Click to stop'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Solves History Tape */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-mono text-[11px]">
                  {lang === 'fr' ? 'Session Solves :' : 'Recent Solves:'}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                  {solvesList.slice(0, 5).map((s, idx) => (
                    <span key={idx} className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800 text-[11px]">
                      {s.toFixed(2)}s
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Algorithmic CFOP Method Accordion */}
        <div className="mt-12 bg-white dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {lang === 'fr' ? 'La Méthode CFOP (Fridrich) & L’Ingénierie Logicielle' : 'The CFOP Method & Software Architecture'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {lang === 'fr'
                  ? 'Comment la résolution d’un cube 3x3 reflète la conception d’une application Full-Stack robuste'
                  : 'How 3x3 speedcubing mirrors robust Full-Stack system architecture'}
              </p>
            </div>
          </div>

          {/* CFOP Segmented Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl mb-6 overflow-x-auto custom-scrollbar border border-stone-200 dark:border-stone-800">
            {RUBIKS_CFOP_STAGES.map((stage, idx) => (
              <button
                key={stage.step}
                onClick={() => setActiveCfopTab(idx)}
                type="button"
                className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCfopTab === idx
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800/60'
                }`}
              >
                {stage.step}: {stage.name[lang]}
              </button>
            ))}
          </div>

          {/* Active CFOP Stage Description */}
          {RUBIKS_CFOP_STAGES[activeCfopTab] && (
            <div className="p-5 bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400">
                  <span>Étape {activeCfopTab + 1} sur 4</span>
                  <span>·</span>
                  <span>{RUBIKS_CFOP_STAGES[activeCfopTab].step}</span>
                  <span>·</span>
                  <span className="text-stone-500">{RUBIKS_CFOP_STAGES[activeCfopTab].movesCount}</span>
                </div>
                <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                  {RUBIKS_CFOP_STAGES[activeCfopTab].name[lang]}
                </h4>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {RUBIKS_CFOP_STAGES[activeCfopTab].description[lang]}
                </p>
              </div>

              <div className="md:col-span-4 p-4 bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800/80 rounded-lg text-xs font-mono text-stone-600 dark:text-stone-400 space-y-2 shadow-sm">
                <div className="text-amber-600 dark:text-amber-500 font-bold uppercase text-[10px] tracking-wider">
                  {lang === 'fr' ? 'Équivalent en Développement' : 'Full-Stack Parallel'}
                </div>
                {activeCfopTab === 0 && (
                  <p className="text-stone-800 dark:text-stone-300 text-[11px]">
                    {lang === 'fr'
                      ? 'Définir les schémas de données MySQL & migrations Laravel. Si la fondation est bancale, toutes les couches supérieures s’effondrent.'
                      : 'Designing MySQL relational schemas & Laravel migrations. If the data foundations are flawed, subsequent UI layers will wobble.'}
                  </p>
                )}
                {activeCfopTab === 1 && (
                  <p className="text-stone-800 dark:text-stone-300 text-[11px]">
                    {lang === 'fr'
                      ? 'Construction des 4 slots modulaires comme des composants React avec state découplé. Résolution prédictive et sans régression.'
                      : 'Engineering 4 modular slots like reusable React components with decoupled state. Deterministic and zero regressions.'}
                  </p>
                )}
                {activeCfopTab === 2 && (
                  <p className="text-stone-800 dark:text-stone-300 text-[11px]">
                    {lang === 'fr'
                      ? 'Normalisation de l’état et synchronisation UI/API. Toutes les facettes de l’application s’alignent dans une structure cohérente.'
                      : 'Data normalization and UI/API synchronicity. Aligning heterogeneous payloads into a cohesive uniform contract.'}
                  </p>
                )}
                {activeCfopTab === 3 && (
                  <p className="text-stone-800 dark:text-stone-300 text-[11px]">
                    {lang === 'fr'
                      ? 'Optimisation finale des performances : bundle splitting, temps de réponse sous les 100ms, et livraison en production sans bug.'
                      : 'Final performance optimizations: tree-shaking, sub-100ms response latencies, and flawless production delivery.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
