import React from 'react';
import { Language } from '../types/portfolio';
import { FileDown, Sun, Moon, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '#experience', label: lang === 'fr' ? 'Expérience' : 'Experience' },
    { href: '#projects', label: lang === 'fr' ? 'Projets' : 'Projects' },
    { href: '#rubiks-cube', label: "Rubik's 3D" },
    { href: '#arduino-lab', label: 'Arduino Lab' },
    { href: '#education', label: lang === 'fr' ? 'Formation' : 'Education' },
    { href: '#mindset', label: 'Anime & Mindset' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-stone-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Abderrahmane Mlih</span>
          <span className="text-[10px] font-mono font-normal text-amber-600 dark:text-amber-500/80 hidden sm:inline-block">
            / Full-Stack
          </span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold rounded-lg text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer"
            title={lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="p-1.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors cursor-pointer"
            title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* Primary Action Button: Download CV */}
          <button
            onClick={onOpenResume}
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Consulter le CV' : 'View Resume'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            type="button"
            className="lg:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 py-1.5 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold text-stone-950 bg-amber-400 rounded-lg"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Télécharger / Consulter CV (PDF)' : 'Download / View Resume (PDF)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
