import React from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, CERTIFICATES, SKILL_CATEGORIES } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { X, FileDown, ExternalLink, Mail, Phone, MapPin, Printer } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white font-mono">
              CV_Abderrahmane_Mlih.pdf
            </span>
            <span className="text-xs font-mono text-stone-500 hidden sm:inline-block">
              · Full-Stack Web Developer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.cvPdfUrl}
              download="CV-Abderrahmane-Mlih.pdf"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Télécharger PDF' : 'Download PDF'}</span>
            </a>

            <a
              href={PERSONAL_INFO.cvPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content: Embedded PDF or Clean Digital CV View */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-stone-950 p-6 sm:p-8">
          <div className="max-w-3xl mx-auto bg-stone-900 border border-stone-800 rounded-xl p-8 sm:p-10 shadow-2xl text-stone-200">
            {/* Header */}
            <div className="border-b border-stone-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h2>
                <p className="text-sm font-mono text-amber-400 mt-1 uppercase tracking-wider">
                  {PERSONAL_INFO.title[lang]}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-500" />
                    {PERSONAL_INFO.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-stone-500" />
                    {PERSONAL_INFO.email}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-stone-500" />
                    {PERSONAL_INFO.phone}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={PERSONAL_INFO.cvPdfUrl}
                  download="CV-Abderrahmane-Mlih.pdf"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-mono flex items-center gap-2 border border-stone-700"
                >
                  <FileDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fichier PDF Original</span>
                </a>
              </div>
            </div>

            {/* Profile */}
            <div className="mb-8">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2">
                PROFILE
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {PERSONAL_INFO.bio[lang]}
              </p>
            </div>

            {/* Expérience */}
            <div className="mb-8">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-4">
                EXPÉRIENCE PROFESSIONNELLE
              </h3>
              <div className="space-y-6">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white text-sm">{exp.company}</span>
                      <span className="font-mono text-stone-400">{exp.period}</span>
                    </div>
                    <div className="text-xs font-mono text-stone-400 mb-2">
                      {exp.role[lang]} {exp.projectWorkedOn ? `· Projet : ${exp.projectWorkedOn}` : ''}
                    </div>
                    <p className="text-xs text-stone-300 mb-2">{exp.description[lang]}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-stone-400">
                      {exp.achievements[lang].map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Formation & Certificats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t border-stone-800 pt-6">
              <div>
                <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
                  EDUCATION
                </h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-bold text-white">{edu.degree[lang]}</div>
                      <div className="text-stone-400">{edu.institution}</div>
                      <div className="font-mono text-stone-500 text-[11px] mt-0.5">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
                  CERTIFICATES
                </h3>
                <div className="space-y-4">
                  {CERTIFICATES.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <div className="font-bold text-white">{cert.title}</div>
                      <div className="text-stone-400">{cert.issuer}</div>
                      <div className="font-mono text-stone-500 text-[11px] mt-0.5">{cert.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Loisirs */}
            <div className="border-t border-stone-800 pt-6">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
                SKILLS & LOISIRS
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                React.js, Laravel, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), TypeScript, Bun, Python, MySQL, Git, GitHub Debugging, Object-Oriented Programming (OOP).
              </p>
              <div className="text-xs font-mono text-stone-400">
                <span className="text-amber-400 font-bold">Loisirs :</span> Projets Arduino et microcontrôleurs (IOT), Rubik's cube, lecture assidue.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
