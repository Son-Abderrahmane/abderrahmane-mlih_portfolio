import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OpeningIntroProps {
  onComplete: () => void;
}

export const OpeningIntro: React.FC<OpeningIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center p-6 text-stone-100 select-none overflow-hidden"
          onClick={handleSkip}
        >
          {/* Subtle background cube solving algorithmic matrix */}
          <div className="absolute inset-0 bg-cube-pattern opacity-10 pointer-events-none" />

          {/* Central Logo & Algorithmic Cube Emblem */}
          <div className="relative flex flex-col items-center text-center max-w-md">
            {/* Animated Mini 3x3 Grid Matrix */}
            <motion.div
              initial={{ scale: 0.7, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 grid-rows-3 gap-1.5 p-2 bg-stone-900 border border-stone-800 rounded-xl mb-6 shadow-2xl"
            >
              {[
                '#DC2626', '#EAB308', '#2563EB',
                '#16A34A', '#F8FAFC', '#EA580C',
                '#EAB308', '#16A34A', '#2563EB',
              ].map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                  className="w-5 h-5 rounded-[3px] shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono"
            >
              Abderrahmane Mlih
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-2 text-xs font-mono text-amber-400 uppercase tracking-widest"
            >
              Full-Stack Developer · Speedcubing · Arduino IoT
            </motion.p>

            {/* Algorithmic Loading Progress Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '160px' }}
              transition={{ delay: 0.5, duration: 1.1, ease: 'easeInOut' }}
              className="h-0.5 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-300 rounded-full mt-6"
            />

            <span className="mt-4 text-[10px] font-mono text-stone-500">
              Click anywhere to skip
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
