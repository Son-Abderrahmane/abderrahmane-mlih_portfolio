import React from 'react';
import { EDUCATION, CERTIFICATES } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface EducationCertificatesProps {
  lang: Language;
}

export const EducationCertificates: React.FC<EducationCertificatesProps> = ({ lang }) => {
  return (
    <section id="education" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2">
            <span>{lang === 'fr' ? 'Parcours Académique & Titres' : 'Academic & Accreditations'}</span>
            <span>·</span>
            <span>Casablanca, Maroc & ALX Africa</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            {lang === 'fr' ? 'Formation & Certifications' : 'Education & Certifications'}
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Un socle scientifique rigoureux en physique et mathématiques couplé à une formation professionnelle spécialisée en technologies web Full-Stack et programmes ALX Africa.'
              : 'A rigorous scientific foundation in physics and calculus combined with applied professional degrees in Full-Stack software engineering and ALX Africa programs.'}
          </p>
        </div>

        {/* 2-Column Split: Education on Left, Certifications on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Education Box */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-wider font-mono">
                {lang === 'fr' ? 'Diplômes & Formation' : 'Academic Degrees'}
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl hover:border-stone-300 dark:hover:border-stone-700 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-stone-900 dark:text-white mb-1">{edu.degree[lang]}</h4>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-300/90 mb-3">{edu.institution}</p>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-3 border-t border-stone-100 dark:border-stone-800/80">
                    {edu.field[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Box */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-wider font-mono">
                {lang === 'fr' ? 'Certifications Professionnelles' : 'Certifications & Accreditations'}
              </h3>
            </div>

            <div className="space-y-6">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl hover:border-amber-400 dark:hover:border-amber-500/40 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {cert.period}
                    </span>
                    <span className="text-stone-700 dark:text-stone-300 font-semibold">{cert.issuer}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-lg font-bold text-stone-900 dark:text-white">{cert.title}</h4>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
                        title="Verify Certificate"
                      >
                        <span>{lang === 'fr' ? 'Vérifier' : 'Verify'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                    {cert.description[lang]}
                  </p>

                  {/* Skills unboxed with typographic separators */}
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    {cert.skills.map((s, idx) => (
                      <React.Fragment key={s}>
                        <span className="text-stone-800 dark:text-stone-300">{s}</span>
                        {idx < cert.skills.length - 1 && (
                          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
