/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { RubiksCubeSection } from './components/RubiksCube/RubiksCubeSection';
import { ArduinoLabSection } from './components/ArduinoLab/ArduinoLabSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationCertificates } from './components/EducationCertificates';
import { SkillsSection } from './components/SkillsSection';
import { AnimeDojoSection } from './components/AnimeDojoSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { OpeningIntro } from './components/OpeningIntro';

export default function App() {
  // English is now default language as requested
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Sync theme with document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 transition-colors duration-200">
      {/* Website Opening Entrance Animation */}
      {showIntro && <OpeningIntro onComplete={() => setShowIntro(false)} />}

      {/* Navigation Top Bar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Landing Hero Section with animated cube solve patterns & self-solving 3D cube */}
        <Hero lang={lang} onOpenResume={() => setIsResumeOpen(true)} />

        {/* Featured Projects Bento Grid */}
        <ProjectsSection lang={lang} />

        {/* 3D Playable Rubik's Cube & Speedcubing Stopwatch */}
        <RubiksCubeSection lang={lang} />

        {/* Virtual Arduino Hardware Lab & Serial Monitor */}
        <ArduinoLabSection lang={lang} />

        {/* Work Experience Timeline */}
        <ExperienceTimeline lang={lang} />

        {/* Education & ALX Africa Certifications */}
        <EducationCertificates lang={lang} />

        {/* Technical Skills & Languages */}
        <SkillsSection lang={lang} />

        {/* Anime Philosophy & Kaizen Mindset */}
        <AnimeDojoSection lang={lang} />

        {/* Contact & Live Casablanca Telemetry */}
        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        lang={lang}
      />
    </div>
  );
}
