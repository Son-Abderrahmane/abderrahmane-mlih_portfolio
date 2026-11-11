import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-stone-900 dark:text-white text-sm font-mono tracking-tight block">
            {PERSONAL_INFO.name}
          </span>
          <span className="text-[11px] text-stone-500 mt-0.5 block">
            {PERSONAL_INFO.title[lang]} · Casablanca, Maroc · {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6 text-stone-600 dark:text-stone-400">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href={PERSONAL_INFO.cvPdfUrl}
            download="CV-Abderrahmane-Mlih.pdf"
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            CV (PDF)
          </a>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            type="button"
            className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">{lang === 'fr' ? 'Haut de page' : 'Back to top'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
