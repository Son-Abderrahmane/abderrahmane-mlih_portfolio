import React from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES, SOFT_SKILLS, LANGUAGES } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { Code, Server, Cpu, Wrench, Languages as LangIcon, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const categoryIcons = [Code, Server, Cpu, Wrench];

  return (
    <section id="skills" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2">
            <span>{lang === 'fr' ? 'Compétences & Maîtrise Technique' : 'Technical Proficiency'}</span>
            <span>·</span>
            <span>Full-Stack & Hardware</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            {lang === 'fr' ? 'Compétences, Outils & Langues' : 'Skills, Tooling & Languages'}
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Un éventail de compétences éprouvées en développement frontend réactif, architectures serveurs robustes et ingénierie de systèmes embarqués.'
              : 'A balanced skillset bridging client-side reactivity, robust server data structures, and low-level embedded hardware interaction.'}
          </p>
        </motion.div>

        {/* 4 Technical Columns Grid with Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx] || Code;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl flex flex-col justify-between hover:border-amber-400 dark:hover:border-stone-700 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b border-stone-200 dark:border-stone-800 mb-4">
                    <Icon className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-mono font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                      {cat.name[lang]}
                    </h3>
                  </div>

                  {/* Skills with tabular progress */}
                  <div className="space-y-3.5">
                    {cat.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-stone-800 dark:text-stone-300 font-medium">{skill.name}</span>
                          <span className="text-stone-500 font-mono text-[11px] tabular-nums">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Split: Soft Skills & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 p-6 bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-mono font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                {lang === 'fr' ? 'Qualités Professionnelles & Soft Skills' : 'Professional Soft Skills'}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOFT_SKILLS.map((skill, i) => (
                <div
                  key={i}
                  className="p-3 bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800/80 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center gap-2"
                >
                  <span className="text-amber-500 font-bold">–</span>
                  <span>{skill[lang]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 p-6 bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
              <LangIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xs font-mono font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                {lang === 'fr' ? 'Langues de Travail' : 'Languages Spoken'}
              </h3>
            </div>
            <div className="space-y-3">
              {LANGUAGES.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-white dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800/80 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-stone-900 dark:text-white">{item.name[lang]}</span>
                    <span className="block text-[11px] text-stone-500 dark:text-stone-400">{item.level[lang]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>
                    <span className="font-mono text-stone-500 text-[11px] tabular-nums">
                      {item.proficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
