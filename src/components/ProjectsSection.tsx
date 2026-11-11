import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project, Language } from '../types/portfolio';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fullstack' | 'frontend' | 'hardware' | 'backend'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2">
              <span>{lang === 'fr' ? 'Portfolio de Réalisations' : 'Curated Works'}</span>
              <span>·</span>
              <span>2024 — 2026</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
              {lang === 'fr' ? 'Projets Clés & Systèmes Déployés' : 'Featured Projects & Systems'}
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
              {lang === 'fr'
                ? 'Une sélection d’applications web réelles et de projets d’ingénierie combinant React.js, Laravel, Bun, architectures REST et solutions matérielles IoT.'
                : 'A selection of production-grade web systems and engineering applications pairing React.js, Laravel, Bun, REST protocols, and embedded hardware.'}
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveFilter('all')}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Tous les Projets' : 'All Projects'}
            </button>
            <button
              onClick={() => setActiveFilter('fullstack')}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'fullstack'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Full-Stack
            </button>
            <button
              onClick={() => setActiveFilter('frontend')}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'frontend'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveFilter('backend')}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'backend'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Backend / Bun
            </button>
            <button
              onClick={() => setActiveFilter('hardware')}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'hardware'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Hardware / IoT
            </button>
          </div>
        </motion.div>

        {/* Bento Grid with Scroll & Back-scroll motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isWide = project.id === 'absence-management' || project.id === 'arduino-iot-rig';
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className={`group bg-stone-50/80 dark:bg-stone-900/60 hover:bg-white dark:hover:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Subtle top indicator line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">{project.companyOrContext}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>
                    <span className="capitalize text-stone-500">{project.category}</span>
                  </div>

                  {/* Title & Arrow */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-1.5 rounded-lg bg-stone-200/80 dark:bg-stone-800/80 group-hover:bg-amber-400 group-hover:text-stone-950 text-stone-600 dark:text-stone-400 transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-3 line-clamp-1">
                    {project.tagline[lang]}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description[lang]}
                  </p>
                </div>

                <div>
                  {/* Highlights Bullet List (Clean typographic line, no fake dots) */}
                  <div className="space-y-1 mb-6 border-t border-stone-200 dark:border-stone-800/80 pt-4">
                    {project.highlights[lang].map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-baseline gap-2 text-xs text-stone-700 dark:text-stone-300">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">–</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies: Clean unboxed list with separators */}
                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    {project.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tech}>
                        <span className="text-stone-800 dark:text-stone-300">{tech}</span>
                        {tIdx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl text-stone-900 dark:text-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header Metadata */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 mb-2">
              <span>{selectedProject.companyOrContext}</span>
              <span>·</span>
              <span>{selectedProject.year}</span>
              <span>·</span>
              <span className="capitalize">{selectedProject.category}</span>
            </div>

            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">{selectedProject.title}</h3>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-medium mb-4">{selectedProject.tagline[lang]}</p>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed py-4 border-y border-stone-200 dark:border-stone-800">
              <p>{selectedProject.description[lang]}</p>
              {selectedProject.fullDetails && (
                <p className="text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800/80">
                  {selectedProject.fullDetails[lang]}
                </p>
              )}
            </div>

            {/* Highlights */}
            <div className="my-5">
              <h4 className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                {lang === 'fr' ? 'Points Clés & Impact Technique' : 'Key Technical Deliverables'}
              </h4>
              <ul className="space-y-1.5">
                {selectedProject.highlights[lang].map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                {lang === 'fr' ? 'Technologies Utilisées' : 'Technologies & Tools'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono bg-stone-100 dark:bg-stone-950 text-amber-700 dark:text-amber-300 border border-stone-200 dark:border-stone-800 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                type="button"
                className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
