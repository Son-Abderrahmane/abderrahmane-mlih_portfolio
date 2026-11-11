import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { AutoSolvingCube } from './RubiksCube/AutoSolvingCube';
import { ArrowUpRight, FileDown, MapPin, Mail, Phone, Box, Github, Linkedin, Terminal } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenResume }) => {
  return (
    <section className="relative pt-12 pb-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden transition-colors">
      
      {/* =========================================================================
          BACKGROUND: DENSE PATTERN LINES & ISOMETRIC CUBE SCHEMATIC BLUEPRINT
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* SVG Dense Isometric Cube Lattice & Blueprint Grid Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 dark:opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Pattern of isometric cube wireframes with intersecting diagonal axes */}
            <pattern
              id="hero-iso-cube-grid"
              width="60"
              height="103.92"
              patternUnits="userSpaceOnUse"
            >
              {/* Isometric 30/150 deg diagonal grid lines */}
              <path
                d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                className="text-stone-400 dark:text-stone-700"
              />
              <path
                d="M30 0 L30 69.28 M0 17.32 L60 51.96 M60 17.32 L0 51.96"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2,3"
                className="text-amber-500/30 dark:text-amber-400/25"
              />
              {/* Secondary offset isometric cube wireframe */}
              <path
                d="M30 69.28 L60 86.6 L60 121.24 L30 138.56 L0 121.24 L0 86.6 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                className="text-stone-300 dark:text-stone-800"
              />
            </pattern>

            {/* Linear fine angled hatching lines */}
            <pattern
              id="hero-diagonal-hatch"
              width="24"
              height="24"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="24"
                stroke="currentColor"
                strokeWidth="0.6"
                className="text-amber-600/15 dark:text-amber-400/15"
              />
            </pattern>
          </defs>

          {/* Fill with isometric grid */}
          <rect width="100%" height="100%" fill="url(#hero-iso-cube-grid)" />
          <rect width="100%" height="100%" fill="url(#hero-diagonal-hatch)" opacity="0.7" />
        </svg>

        {/* Dense Angled Algorithm Notation Lines Running Diagonally Across the Whole Section (GPU-optimized static blueprint) */}
        <div className="absolute inset-0 -skew-y-3 sm:-skew-y-6 scale-105 flex flex-col justify-between py-2 opacity-95">
          {/* Line 1 - Top Header Margin */}
          <div className="whitespace-nowrap font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-rose-700/40 dark:text-rose-400/40 border-b border-rose-500/30 dark:border-rose-500/40 pb-1">
            [CROSS PATTERN // SOLVE AXIS 01] D' L F' R2 D2 · BOTTOM WHITE CROSS HARMONIZED · LOOKAHEAD ENGINE · R U R' U' · F R U R' U' F' · R U R' U R U2 R' · WCA STANDARD
          </div>

          {/* Line 2 - Upper Hero */}
          <div className="whitespace-nowrap font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-amber-800/45 dark:text-amber-300/45 border-b border-amber-500/35 dark:border-amber-500/40 pb-1">
            [F2L PAIR #1 & #2 // TWO-LAYER ROTATIONLESS] U R U' R' U' F' U F · SLOT INSERTION · y' R' U' R U2 R' U R · DEXTERITY TPS 12.4 · REACT + LARAVEL PIPELINE
          </div>

          {/* Line 3 - Behind Headline (Red Marked Zone) */}
          <div className="whitespace-nowrap font-mono text-[11px] sm:text-xs font-bold tracking-widest text-rose-800/45 dark:text-rose-300/50 border-b border-rose-500/35 dark:border-rose-400/45 pb-1">
            [OLL ORIENTATION MATRIX] F R U R' U' F' · 57 ALGORITHMS · ALL YELLOW TOP ORIENTED · R2 D R' U2 R D' R' U2 R' · STATE DETERMINISM · SUB-20s BENCHMARK
          </div>

          {/* Line 4 - Mid Canvas (Red Marked Zone) */}
          <div className="whitespace-nowrap font-mono text-[11px] sm:text-xs font-bold tracking-widest text-amber-800/45 dark:text-amber-300/50 border-b border-amber-500/35 dark:border-amber-400/45 pb-1">
            [PLL T-PERM // FINAL CORNER & EDGE PERMUTATION] R U R' U' R' F R2 U' R' U' R U R' F' · SURGICAL TIMING: 0.84s · MODULAR STATE DISPATCH
          </div>

          {/* Line 5 - Behind Bio & Metrics */}
          <div className="whitespace-nowrap font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-rose-700/40 dark:text-rose-400/40 border-b border-rose-500/30 dark:border-rose-500/40 pb-1">
            [WCA OFFICIAL SCRAMBLE] B' R2 F2 D' L2 B2 U2 F2 L2 U R2 D' F R' B2 D' L' U2 F' · RECONSTRUCTION RECOVERY · REST API & BUN ENGINE
          </div>

          {/* Line 6 - Bottom */}
          <div className="whitespace-nowrap font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-amber-800/45 dark:text-amber-300/45 border-b border-amber-500/35 dark:border-amber-500/40 pb-1">
            [ATMEGA328P CORE // EMBEDDED UART BUS] CAPACITIVE SPEEDCUBE TOUCH PADS · SERIAL 115200 BAUD · SENSORS TELEMETRY · ESP32 · KAIZEN ENGINEERING
          </div>
        </div>
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN: AUTHENTIC HUMAN DEVELOPER TYPING STYLE (NO AI BUZZWORDS)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-between py-2"
          >
            <div>
              {/* Clean Developer Terminal Kicker */}
              <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 font-semibold uppercase tracking-wider mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>Casablanca, Morocco // Full-Stack Developer</span>
              </div>

              {/* Punchy, Authentic Headline (Natural, direct language, NOT corporate AI buzzwords) */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-normal text-stone-900 dark:text-white leading-[1.08] text-balance">
                {lang === 'fr' ? (
                  <>
                    Développeur Full-Stack,{' '}
                    <span className="text-amber-600 dark:text-amber-400">
                      speedcuber
                    </span>{' '}
                    & passionné d'électronique.
                  </>
                ) : (
                  <>
                    Full-stack engineer,{' '}
                    <span className="text-amber-600 dark:text-amber-400">
                      speedcuber
                    </span>{' '}
                    & hardware tinkerer.
                  </>
                )}
              </h1>

              {/* Natural, Honest Bio (No robotic buzzwords) */}
              <p className="mt-5 text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                {lang === 'fr' ? (
                  <>
                    Salut, moi c'est <strong>Abderrahmane</strong>. Je construis des applications web rapides et modulaires avec <strong>React</strong>, <strong>Laravel</strong> et <strong>TypeScript</strong>.Quand je ne suis pas plongé dans mes projets de développement web et d’intelligence artificielle, je résous des Rubik’s Cubes en moins de 20 secondes (méthode CFOP) ou je conçois des circuits électroniques avec Arduino.
                  </>
                ) : (
                  <>
                    Hey, I'm <strong>Abderrahmane</strong>. I build fast, clean web apps with <strong>React</strong>, <strong>Laravel</strong>, and <strong>TypeScript</strong>. When I'm not working on web development and artificial intelligence projects, I enjoy solving Rubik's Cubes in under 20 seconds (using the CFOP method) or building electronic circuits with Arduino.
                  </>
                )}
              </p>

              {/* Real Working Links Strip */}
              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-stone-600 dark:text-stone-400">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>LinkedIn</span>
                </a>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">/</span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                >
                  <Github className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                  <span>GitHub</span>
                </a>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">/</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">/</span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800/80 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Voir mes Projets' : 'See My Projects'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <FileDown className="w-4 h-4 text-amber-500" />
                <span>{lang === 'fr' ? 'Consulter le CV' : 'View Resume'}</span>
              </button>

              <a
                href="#rubiks-cube"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-mono text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                <Box className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === 'fr' ? 'Tester le Cube 3D & Arduino' : 'Play 3D Cube & Arduino'}</span>
              </a>
            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: SELF-SOLVING 3D CUBE ENGINE
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="h-full bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden transition-colors">
              {/* Background Katakana Accent (Clearly Visible) */}
              <div className="absolute top-2 right-4 text-stone-900/15 dark:text-amber-400/20 font-mono text-6xl font-black select-none pointer-events-none">
                カイゼン
              </div>

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                      {lang === 'fr' ? 'Résolveur 3D Temps Réel' : 'Live Self-Solving 3D Engine'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">CFOP · WCA Mechanics</span>
                </div>

                {/* Self-Solving 3D Cube Component */}
                <AutoSolvingCube size={150} lang={lang} />

                {/* Summary points */}
                <div className="mt-5 space-y-2.5">
                  <div className="p-2.5 bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 rounded-xl">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="font-semibold text-stone-900 dark:text-white">Full-Stack Stack</span>
                      <span className="text-amber-600 dark:text-amber-400 font-mono text-[11px]">React · Laravel · TypeScript</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                      {lang === 'fr'
                        ? 'Applications modulaires, typage strict TypeScript, API REST et schémas relationnels MySQL.'
                        : 'Modular React applications, strict TypeScript typing, REST API layers, and relational MySQL schemas.'}
                    </p>
                  </div>

                  <div className="p-2.5 bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 rounded-xl">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="font-semibold text-stone-900 dark:text-white">Hardware & Speedcubing</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">Arduino · C++ · Sub-20s</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                      {lang === 'fr'
                        ? 'Chronomètres de speedcubing physiques, capteurs capacitifs et moniteur série UART.'
                        : 'Physical speedcubing touch timers, capacitive touch sensors, and serial UART telemetry.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quote ticker */}
              <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-stone-500">
                <span className="text-amber-600 dark:text-amber-400/90 italic">Kaizen: Continuous mastery</span>
                <span>NTIC SM · ALX Certified</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Row of Key Metrics Below the Split */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="p-4 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/60 rounded-xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-mono tracking-tight tabular-nums">
              3+
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              {lang === 'fr' ? 'Entreprises & Stages' : 'Production Roles & Internships'}
            </div>
            <div className="text-[11px] font-mono text-amber-600 dark:text-amber-500 mt-0.5">
              Baydeck · Tedi · La casa
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/60 rounded-xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-mono tracking-tight tabular-nums">
              5+
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              {lang === 'fr' ? 'Systèmes Web Déployés' : 'Deployed Web Systems'}
            </div>
            <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-500 mt-0.5">
              React · Laravel · Bun
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/60 rounded-xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-mono tracking-tight tabular-nums">
              2
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              {lang === 'fr' ? 'Certifications ALX Africa' : 'ALX Africa Certifications'}
            </div>
            <div className="text-[11px] font-mono text-sky-600 dark:text-sky-500 mt-0.5">
              Frontend & Foundations
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/60 rounded-xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-mono tracking-tight tabular-nums">
              &lt;20s
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              {lang === 'fr' ? 'Rubik’s Cube PB' : 'Speedcube PB & CFOP'}
            </div>
            <div className="text-[11px] font-mono text-amber-600 dark:text-amber-500 mt-0.5">
              WCA Mechanics & Arduino
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
