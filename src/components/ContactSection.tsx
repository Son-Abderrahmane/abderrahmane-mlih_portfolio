import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language } from '../types/portfolio';
import { Mail, Phone, MapPin, Copy, Check, Send, Clock, ArrowUpRight, Github, Linkedin } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

const CasablancaClock: React.FC = React.memo(() => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat('fr-FR', {
          timeZone: 'Africa/Casablanca',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now)
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800">
      <Clock className="w-3.5 h-3.5 text-amber-500" />
      <span className="tabular-nums">{time || 'Casablanca'}</span>
    </div>
  );
});

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  
  // Message Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    const subject = encodeURIComponent(`Contact Portfolio - ${formName}`);
    const body = encodeURIComponent(`Nom: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section id="contact" className="py-20 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
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
            <span>{lang === 'fr' ? 'Prise de Contact' : 'Get in Touch'}</span>
            <span>·</span>
            <span>Casablanca, Maroc</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            {lang === 'fr' ? 'Discutons de Votre Projet' : 'Let’s Build Something Meaningful'}
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-2xl text-sm md:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Disponible pour des opportunités de développement Full-Stack, des collaborations sur des systèmes web modernes ou des projets innovants.'
              : 'Available for full-stack engineering roles, ambitious frontend systems, or IoT/embedded web integrations.'}
          </p>
        </motion.div>

        {/* 2-Column Split: Direct Contact Cards on Left, Message Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Cards with motion */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card */}
            <div className="p-4 sm:p-6 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                    Email
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="break-all text-sm font-semibold text-stone-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                type="button"
                className="shrink-0 p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedType === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 sm:p-6 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                    {lang === 'fr' ? 'Téléphone' : 'Phone'}
                  </span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm font-semibold text-stone-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                type="button"
                className="shrink-0 p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedType === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location & Timezone Card */}
            <div className="p-4 sm:p-6 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                    {lang === 'fr' ? 'Localisation' : 'Base Location'}
                  </span>
                  <span className="text-sm font-semibold text-stone-900 dark:text-white">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              <CasablancaClock />
            </div>

            {/* Social Links Row */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3.5 bg-white dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl flex items-center justify-center gap-2 text-xs font-mono text-stone-800 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3.5 bg-white dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl flex items-center justify-center gap-2 text-xs font-mono text-stone-800 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </motion.div>

          {/* Right Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-1">
              {lang === 'fr' ? 'Envoyer un message direct' : 'Send a Direct Message'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
              {lang === 'fr'
                ? 'Remplissez le formulaire ci-dessous pour me joindre directement.'
                : 'Fill out the form below to initiate communication.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                    {lang === 'fr' ? 'Votre Nom' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="ex: Sarah Benjelloun"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-stone-900 dark:text-stone-200 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                    {lang === 'fr' ? 'Votre Email' : 'Your Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="ex: contact@entreprise.com"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-stone-900 dark:text-stone-200 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={
                    lang === 'fr'
                      ? 'Décrivez votre opportunité, proposition de mission ou projet...'
                      : 'Describe your role, project, or collaboration proposal...'
                  }
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-stone-900 dark:text-stone-200 outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono text-stone-500">
                  {lang === 'fr' ? 'Réponse garantie sous 24h' : 'Response within 24h'}
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Envoyer le Message' : 'Send Message'}</span>
                </button>
              </div>

              {isSent && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-600 dark:text-emerald-400">
                  {lang === 'fr'
                    ? 'Client mail ouvert avec votre message prêt à être expédié !'
                    : 'Email client opened with pre-filled message!'}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
