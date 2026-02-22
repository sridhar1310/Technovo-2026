/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Zap, Sparkles, ChevronRight } from 'lucide-react';

// Typing animation component
const TypingText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, onComplete]);

  return (
    <span className="font-mono tracking-tight">
      {displayedText}
      {index < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-1 h-6 md:h-10 ml-1 bg-emerald-400 align-middle"
        />
      )}
    </span>
  );
};

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleUnlock = useCallback(() => {
    if (!isLocked) return;

    setIsLocked(false);

    // Play sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }

    // Big Bang Confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Center burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#6ee7b7', '#ffffff']
    });

    // Show content after a small delay
    setTimeout(() => setShowContent(true), 800);
  }, [isLocked]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        handleUnlock();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    // Focus the container to capture keyboard events immediately
    if (containerRef.current) {
      containerRef.current.focus();
    }

    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [handleUnlock]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-emerald-500/30 outline-none"
    >
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73456.mp3"
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.div
            key="locked-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            onClick={handleUnlock}
            className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer z-50 bg-radial-[at_50%_50%] from-emerald-900/20 to-transparent"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -1, 1, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 backdrop-blur-sm mb-8 relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl"
                />
                <Lock className="w-12 h-12 text-emerald-400" />
              </div>
            </motion.div>

            <div className="text-center space-y-4 px-6">
              <div className="space-y-1">
                <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-emerald-500/60">Nehru Arts and science college</h2>
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-mono">System Status: Encrypted</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Technovo <span className="text-emerald-500">2026 Series II</span></h1>
              <p className="text-emerald-500/40 font-mono text-xs uppercase tracking-widest">Inauguration Portal v1.0.4</p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2 text-emerald-400/80 animate-pulse">
                <ChevronRight className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-[0.2em]">Press Enter to Unlock</span>
              </div>
              <span className="text-[10px] text-white/20 uppercase tracking-widest md:hidden">(Or Tap Anywhere)</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center relative p-6"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl w-full space-y-12 relative z-10">
              <header className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl leading-none uppercase tracking-tight">Technovo</h3>
                    <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-tighter mt-1">Series II Inauguration</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Feb 21, 2026</p>
                  <p className="text-xs font-mono text-emerald-400">09:00 AM IST</p>
                </div>
              </header>

              <main className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className="space-y-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                      Nehru Arts and science college
                    </h1>
                    <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-2 text-emerald-500/60"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-[0.3em]">Access Granted</span>
                    <Sparkles className="w-4 h-4" />
                  </motion.div>

                  <div className="space-y-4">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white/90">
                      {showContent && (
                        <TypingText text="Welcome to School of computational science" />
                      )}
                    </h1>
                    <h2 className="text-xl md:text-3xl font-semibold tracking-tight text-emerald-400">
                      {showContent && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                          <TypingText text="Department of IoT & AIML" />
                        </motion.div>
                      )}
                    </h2>
                    <p className="text-lg md:text-2xl font-mono uppercase tracking-[0.5em] text-white/40">
                      {showContent && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}>
                          <TypingText text="Organises" />
                        </motion.div>
                      )}
                    </p>
                    <div className="space-y-2">
                      <h3 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-emerald-500 leading-none">
                        {showContent && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }}>
                            <TypingText text="Technovo 2026" />
                          </motion.div>
                        )}
                      </h3>
                      <h3 className="text-3xl md:text-6xl font-bold tracking-tighter text-emerald-400/80 leading-none">
                        {showContent && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7.5 }}>
                            <TypingText text="Series II" />
                          </motion.div>
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
              </main>

              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 9.0 }}
                className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-12 border-t border-white/5"
              >
                <div className="flex gap-16">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Venue</p>
                    <p className="text-sm font-medium">Department of IoT & AIML</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Status</p>
                    <p className="text-sm font-medium text-emerald-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Live
                    </p>
                  </div>
                </div>
              </motion.footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
