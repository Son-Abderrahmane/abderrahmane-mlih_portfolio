import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ANIME_INSPIRATIONS } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { Quote, BookOpen, Flame, Sparkles } from 'lucide-react';

interface AnimeDojoSectionProps {
  lang: Language;
}

// Sticker asset paths provided by user
const STICKER_SHEET_1 = '/assets/aistudio/WhatsApp_Image_2026-11-10_at_22.08.14_4e067938.jpeg';
const STICKER_SHEET_2 = '/assets/aistudio/WhatsApp_Image_2026-11-10_at_22.22.05_66239aa3.jpeg';

export const AnimeDojoSection: React.FC<AnimeDojoSectionProps> = ({ lang }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const current = ANIME_INSPIRATIONS[selectedIndex];

  return (
    <section id="mindset" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/30 text-stone-900 dark:text-stone-100 relative overflow-hidden transition-colors">
      {/* Decorative Japanese Calligraphy "情熱" (Passion) - Clearly Visible Opacity as requested */}
      <div className="absolute top-6 right-6 md:top-10 md:right-12 text-stone-900/30 dark:text-amber-400/35 font-black text-8xl sm:text-9xl md:text-[11rem] pointer-events-none select-none font-mono tracking-tighter leading-none transition-opacity">
        情熱
      </div>

      {/* Secondary Kanji Echo "努力 · 勝利" (Effort · Victory) */}
      <div className="absolute bottom-6 left-8 text-stone-900/10 dark:text-amber-400/15 font-black text-6xl sm:text-7xl pointer-events-none select-none font-mono tracking-wider">
        努力
      </div>

      {/* --- SCATTERED ANIME STICKERS LAYER (from user uploaded sticker sheets) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Sticker 1: Gojo Satoru Eye Banner (Top Left) */}
        <div
          className="absolute top-4 left-6 sm:left-12 pointer-events-auto transform -rotate-6 hover:rotate-0 hover:scale-115 transition-all duration-200 shadow-xl rounded-md border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-950"
          style={{ width: '150px', height: '42px' }}
          title="Gojo Satoru (Jujutsu Kaisen)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_1})`,
              backgroundPosition: '14% 17%',
              backgroundSize: '360% auto',
            }}
          />
        </div>

        {/* Sticker 2: Son Goku Ultra Instinct Banner (Top Center-Right) */}
        <div
          className="absolute top-6 right-64 sm:right-96 pointer-events-auto transform rotate-6 hover:rotate-0 hover:scale-115 transition-all duration-200 shadow-xl rounded-md border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-950 hidden md:block"
          style={{ width: '140px', height: '48px' }}
          title="Son Goku Ultra Instinct (Dragon Ball Super)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_1})`,
              backgroundPosition: '86% 8%',
              backgroundSize: '330% auto',
            }}
          />
        </div>

        {/* Sticker 3: Solo Leveling Sung Jinwoo Banner (Left Middle Edge) */}
        <div
          className="absolute top-1/3 -left-3 pointer-events-auto transform rotate-12 hover:rotate-0 hover:scale-115 transition-all duration-200 shadow-xl rounded-md border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-950"
          style={{ width: '135px', height: '45px' }}
          title="Sung Jinwoo (Solo Leveling)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_1})`,
              backgroundPosition: '12% 8%',
              backgroundSize: '350% auto',
            }}
          />
        </div>

        {/* Sticker 4: Sasuke Sharingan & Rinnegan (Right Middle Margin) */}
        <div
          className="absolute top-1/2 -right-4 pointer-events-auto transform -rotate-12 hover:rotate-0 hover:scale-115 transition-all duration-200 shadow-xl rounded-md border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-950 hidden sm:block"
          style={{ width: '145px', height: '40px' }}
          title="Sasuke Uchiha (Naruto Shippuden)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_1})`,
              backgroundPosition: '16% 51%',
              backgroundSize: '370% auto',
            }}
          />
        </div>

        {/* Sticker 5: Zoro Eye Banner (Bottom Center-Right) */}
        <div
          className="absolute bottom-8 right-24 pointer-events-auto transform rotate-4 hover:rotate-0 hover:scale-115 transition-all duration-200 shadow-xl rounded-md border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-950 hidden md:block"
          style={{ width: '160px', height: '46px' }}
          title="Roronoa Zoro (One Piece)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_1})`,
              backgroundPosition: '85% 72%',
              backgroundSize: '320% auto',
            }}
          />
        </div>

        {/* Sticker 6: Super Saiyan Goku Manga Stamp (from Sticker Sheet 2) */}
        <div
          className="absolute top-28 left-64 pointer-events-auto transform -rotate-8 hover:rotate-0 hover:scale-120 transition-all duration-200 shadow-lg rounded-lg border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-900 hidden lg:block"
          style={{ width: '64px', height: '64px' }}
          title="Super Saiyan Goku (Dragon Ball Z)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_2})`,
              backgroundPosition: '5% 58%',
              backgroundSize: '410% auto',
            }}
          />
        </div>

        {/* Sticker 7: Vegeta Scouter Stamp (from Sticker Sheet 2) */}
        <div
          className="absolute bottom-12 left-64 pointer-events-auto transform rotate-8 hover:rotate-0 hover:scale-120 transition-all duration-200 shadow-lg rounded-lg border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-900 hidden lg:block"
          style={{ width: '64px', height: '64px' }}
          title="Prince Vegeta (Dragon Ball Z)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_2})`,
              backgroundPosition: '33% 14%',
              backgroundSize: '410% auto',
            }}
          />
        </div>

        {/* Sticker 8: Android 18 Stamp (from Sticker Sheet 2) */}
        <div
          className="absolute top-16 right-16 pointer-events-auto transform rotate-12 hover:rotate-0 hover:scale-120 transition-all duration-200 shadow-lg rounded-lg border-2 border-white dark:border-stone-700 overflow-hidden cursor-pointer bg-stone-900 hidden xl:block"
          style={{ width: '60px', height: '60px' }}
          title="Android 18 (Dragon Ball Z)"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${STICKER_SHEET_2})`,
              backgroundPosition: '33% 1%',
              backgroundSize: '410% auto',
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2">
            <span>{lang === 'fr' ? 'Philosophie & Culture Geek' : 'Inspiration & Anime Culture'}</span>
            <span>·</span>
            <span>Kaizen & Engineering Dojo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            {lang === 'fr' ? 'L’Esprit Kaizen & Inspiration Anime' : 'The Kaizen Mindset & Anime Inspirations'}
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
            {lang === 'fr'
              ? 'L’anime japonais et la lecture ne sont pas que des loisirs : ils ont forgé ma curiosité pour les premiers principes scientifiques, la rigueur de l’entraînement et la passion du bricolage technologique.'
              : 'Anime and dedicated reading are more than leisure: they shaped my obsession with first-principles scientific inquiry, deep execution discipline, and hardware tinkering.'}
          </p>
        </motion.div>

        {/* Interactive Dojo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Anime Selection List with Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-3"
          >
            {ANIME_INSPIRATIONS.map((anime, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={anime.title}
                  onClick={() => setSelectedIndex(idx)}
                  type="button"
                  className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-stone-900 border-amber-500 shadow-md'
                      : 'bg-white/80 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400/90">{anime.japaneseTitle}</span>
                      <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">{anime.characterOrTheme}</span>
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-white mt-0.5">{anime.title}</h3>
                  </div>

                  <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    {isSelected ? '→' : ''}
                  </div>
                </button>
              );
            })}

            {/* Reading note from CV */}
            <div className="p-4 bg-white/70 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800/80 rounded-2xl flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
              <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                {lang === 'fr'
                  ? 'Loisirs CV : Lecture assidue, littérature technique et mangas de stratégie scientifique.'
                  : 'CV Interests: Avid reading, technical books, and strategic narrative manga.'}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Active Card Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 mb-1">
                    <span>{current.japaneseTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span>{current.characterOrTheme}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white">{current.title}</h3>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
              </div>

              {/* Dev Connection */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  {lang === 'fr' ? 'Connexion avec mon travail de Développeur' : 'Engineering Resonance'}
                </h4>
                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed bg-stone-50 dark:bg-stone-950/70 p-4 rounded-xl border border-stone-200 dark:border-stone-800/80">
                  {current.connectionToDev[lang]}
                </p>
              </div>
            </div>

            {/* Quote Card */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800/80">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base font-serif italic text-stone-800 dark:text-stone-200 leading-snug">
                    "{current.quote}"
                  </p>
                  <span className="block mt-2 text-xs font-mono text-amber-600 dark:text-amber-400">
                    — {current.quoteAuthor}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
