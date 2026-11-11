import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface ExperienceTimelineProps {
  lang: Language;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ lang }) => {
  return (
    <section id="experience" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
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
            <span>{lang === 'fr' ? 'Parcours Professionnel' : 'Career Progression'}</span>
            <span>·</span>
            <span>Casablanca, Maroc</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            {lang === 'fr' ? 'Expérience Professionnelle' : 'Work Experience'}
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Expérience acquise à travers des stages et des projets réels en environnement de production, avec un focus sur React.js, Laravel et l’architecture web moderne.'
              : 'Hands-on track record across production internships and agency projects, focusing on React.js, Laravel architectures, and high-performance user interfaces.'}
          </p>
        </motion.div>

        {/* Timeline Stack with Scroll Animations */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-stone-200 dark:before:bg-stone-800">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 group`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-stone-900 border-2 border-amber-500 group-hover:scale-110 transition-all flex items-center justify-center z-10 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>

                {/* Content Box */}
                <div className="ml-10 md:ml-0 md:w-1/2 md:px-8 w-full">
                  <div className="bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-stone-700 rounded-2xl p-6 sm:p-7 shadow-sm transition-all">
                    {/* Role & Company Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {exp.role[lang]}
                      </h3>
                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                        {exp.company}
                      </span>
                    </div>

                    {/* Meta info: Period, Location, Project */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-stone-500 dark:text-stone-400 mb-4 pb-3 border-b border-stone-100 dark:border-stone-800/80">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {exp.period}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {exp.location}
                      </span>
                      {exp.projectWorkedOn && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-stone-700 dark:text-stone-300">
                            Projet : <strong className="text-amber-600 dark:text-amber-300">{exp.projectWorkedOn}</strong>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                      {exp.description[lang]}
                    </p>

                    {/* Achievements List */}
                    <div className="space-y-2 mb-5">
                      {exp.achievements[lang].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skills list */}
                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      {exp.skills.map((skill, sIdx) => (
                        <React.Fragment key={skill}>
                          <span className="text-stone-800 dark:text-stone-300">{skill}</span>
                          {sIdx < exp.skills.length - 1 && (
                            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
