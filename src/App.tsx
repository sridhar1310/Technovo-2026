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

// Realistic Ribbon Cutting Ceremony Animation
const RibbonCutting = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'enter' | 'cut' | 'split' | 'done'>('enter');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('cut'), 1200),
      setTimeout(() => setPhase('split'), 1700),
      setTimeout(() => { setPhase('done'); onComplete(); }, 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const bladesOpen = phase === 'enter';

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      animate={{ opacity: phase === 'done' ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* === RIBBON LEFT HALF === */}
      <motion.div
        className="absolute"
        style={{ top: '43%', left: 0, right: '48%', height: 110 }}
        animate={
          phase === 'split' || phase === 'done'
            ? { y: 400, x: -120, rotate: -35, opacity: 0 }
            : { y: 0, x: 0, rotate: 0, opacity: 1 }
        }
        transition={
          phase === 'split' || phase === 'done'
            ? { duration: 1.8, ease: [0.55, 0, 1, 0.45] }
            : { duration: 0.3 }
        }
      >
        <svg width="100%" height="110" viewBox="0 0 600 110" preserveAspectRatio="none">
          <defs>
            <linearGradient id="satinRedL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A0000" />
              <stop offset="12%" stopColor="#B91C1C" />
              <stop offset="25%" stopColor="#DC2626" />
              <stop offset="33%" stopColor="#EF4444" />
              <stop offset="38%" stopColor="#F87171" />
              <stop offset="42%" stopColor="#FCA5A5" />
              <stop offset="46%" stopColor="#F87171" />
              <stop offset="55%" stopColor="#EF4444" />
              <stop offset="65%" stopColor="#DC2626" />
              <stop offset="80%" stopColor="#B91C1C" />
              <stop offset="100%" stopColor="#7A0000" />
            </linearGradient>
          </defs>
          {/* Main ribbon body */}
          <path
            d="M -20,22 C 60,-5 140,75 250,30 C 340,-8 450,55 520,25 L 610,35 L 610,85 C 520,70 440,100 340,75 C 250,55 170,110 80,80 C 30,65 -10,78 -20,80 Z"
            fill="url(#satinRedL)"
          />
          {/* Satin highlight */}
          <path
            d="M -20,34 C 60,7 140,87 250,42 C 340,4 450,67 520,37 L 610,47 L 610,40 C 520,30 440,62 340,35 C 250,12 170,80 80,50 C 30,38 -10,45 -20,42 Z"
            fill="rgba(255,255,255,0.18)"
          />
          {/* Gold top edge */}
          <path
            d="M -20,22 C 60,-5 140,75 250,30 C 340,-8 450,55 520,25 L 610,35"
            fill="none" stroke="#DAA520" strokeWidth="1.5" opacity="0.5"
          />
          {/* Gold bottom edge */}
          <path
            d="M -20,80 C 30,65 80,80 170,110 C 250,55 340,75 440,100 C 520,70 610,85 610,85"
            fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.35"
          />
          {/* Decorative bow at far left */}
          <ellipse cx="30" cy="50" rx="14" ry="18" fill="none" stroke="#DC2626" strokeWidth="3" opacity="0.6" />
          <ellipse cx="30" cy="50" rx="8" ry="12" fill="#EF4444" opacity="0.4" />
        </svg>
      </motion.div>

      {/* === RIBBON RIGHT HALF === */}
      <motion.div
        className="absolute"
        style={{ top: '43%', right: 0, left: '48%', height: 110 }}
        animate={
          phase === 'split' || phase === 'done'
            ? { y: 400, x: 120, rotate: 35, opacity: 0 }
            : { y: 0, x: 0, rotate: 0, opacity: 1 }
        }
        transition={
          phase === 'split' || phase === 'done'
            ? { duration: 1.8, ease: [0.55, 0, 1, 0.45] }
            : { duration: 0.3 }
        }
      >
        <svg width="100%" height="110" viewBox="0 0 600 110" preserveAspectRatio="none">
          <defs>
            <linearGradient id="satinRedR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A0000" />
              <stop offset="12%" stopColor="#B91C1C" />
              <stop offset="25%" stopColor="#DC2626" />
              <stop offset="33%" stopColor="#EF4444" />
              <stop offset="38%" stopColor="#F87171" />
              <stop offset="42%" stopColor="#FCA5A5" />
              <stop offset="46%" stopColor="#F87171" />
              <stop offset="55%" stopColor="#EF4444" />
              <stop offset="65%" stopColor="#DC2626" />
              <stop offset="80%" stopColor="#B91C1C" />
              <stop offset="100%" stopColor="#7A0000" />
            </linearGradient>
          </defs>
          {/* Main ribbon body */}
          <path
            d="M -10,35 C 80,55 160,-10 280,30 C 380,60 460,5 540,30 C 575,40 600,35 620,38 L 620,82 C 600,78 575,85 540,78 C 460,55 380,105 280,75 C 160,40 80,100 -10,80 Z"
            fill="url(#satinRedR)"
          />
          {/* Satin highlight */}
          <path
            d="M -10,47 C 80,67 160,2 280,42 C 380,72 460,17 540,42 L 620,50 L 620,44 C 575,36 540,32 460,10 C 380,55 280,35 160,0 C 80,60 -10,42 -10,42 Z"
            fill="rgba(255,255,255,0.18)"
          />
          {/* Gold top edge */}
          <path
            d="M -10,35 C 80,55 160,-10 280,30 C 380,60 460,5 540,30 L 620,38"
            fill="none" stroke="#DAA520" strokeWidth="1.5" opacity="0.5"
          />
          {/* Gold bottom edge */}
          <path
            d="M -10,80 C 80,100 160,40 280,75 C 380,105 460,55 540,78 L 620,82"
            fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.35"
          />
          {/* Decorative bow at far right */}
          <ellipse cx="575" cy="58" rx="14" ry="18" fill="none" stroke="#DC2626" strokeWidth="3" opacity="0.6" />
          <ellipse cx="575" cy="58" rx="8" ry="12" fill="#EF4444" opacity="0.4" />
        </svg>
      </motion.div>

      {/* === GOLDEN SCISSORS SVG === */}
      <motion.div
        className="absolute z-[110]"
        style={{
          top: '50%',
          left: '50%',
          width: 150,
          height: 220,
          marginTop: -110,
          marginLeft: -75,
        }}
        initial={{ x: 380, rotate: -50, opacity: 0 }}
        animate={
          phase === 'enter'
            ? { x: 0, rotate: -50, opacity: 1 }
            : phase === 'cut'
              ? { x: 0, rotate: 0, opacity: 1 }
              : phase === 'split'
                ? { y: -80, opacity: 0, scale: 0.6 }
                : { opacity: 0 }
        }
        transition={
          phase === 'enter'
            ? { duration: 1, ease: 'easeOut' }
            : phase === 'cut'
              ? { duration: 0.4, ease: [0.68, -0.55, 0.27, 1.55] }
              : { duration: 0.6 }
        }
      >
        <svg
          width="150"
          height="220"
          viewBox="0 0 150 220"
          style={{ filter: 'drop-shadow(3px 5px 8px rgba(0,0,0,0.6))' }}
        >
          <defs>
            {/* Gold metallic gradient for blades */}
            <linearGradient id="goldBlade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6B4F00" />
              <stop offset="15%" stopColor="#8B6914" />
              <stop offset="30%" stopColor="#B8860B" />
              <stop offset="45%" stopColor="#DAA520" />
              <stop offset="52%" stopColor="#FFD700" />
              <stop offset="56%" stopColor="#FFFACD" />
              <stop offset="60%" stopColor="#FFD700" />
              <stop offset="75%" stopColor="#DAA520" />
              <stop offset="90%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>
            {/* Handle gradient */}
            <linearGradient id="goldHandle" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7A5C00" />
              <stop offset="25%" stopColor="#B8860B" />
              <stop offset="45%" stopColor="#DAA520" />
              <stop offset="55%" stopColor="#FFD700" />
              <stop offset="65%" stopColor="#FFFACD" />
              <stop offset="70%" stopColor="#FFD700" />
              <stop offset="85%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>
            {/* Blade edge highlight */}
            <linearGradient id="bladeShine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* --- Bottom/Left Blade --- */}
          <motion.g
            style={{ transformOrigin: '75px 100px' }}
            animate={{ rotate: bladesOpen ? -18 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Blade body */}
            <path
              d="M 75,100 C 68,80 50,45 32,10 C 30,5 35,2 38,7 C 52,40 65,75 73,97 Z"
              fill="url(#goldBlade)"
            />
            {/* Blade cutting edge highlight */}
            <path
              d="M 75,100 C 68,80 50,45 32,10 L 35,8 C 52,42 66,78 74,98 Z"
              fill="url(#bladeShine)" opacity="0.4"
            />
            {/* Blade back edge */}
            <path
              d="M 73,97 C 65,75 52,40 38,7 L 40,8 C 53,42 66,76 73,96 Z"
              fill="rgba(139,105,20,0.6)"
            />
            {/* Neck transition */}
            <path
              d="M 65,102 C 60,115 52,128 44,138 L 50,141 C 57,130 63,118 68,106 Z"
              fill="url(#goldHandle)"
            />
            {/* Handle ring outer */}
            <ellipse cx="38" cy="168" rx="22" ry="28" fill="none" stroke="url(#goldHandle)" strokeWidth="8" />
            {/* Handle ring highlight */}
            <ellipse cx="38" cy="168" rx="22" ry="28" fill="none" stroke="rgba(255,250,205,0.25)" strokeWidth="2" />
            {/* Handle ring inner shadow */}
            <ellipse cx="38" cy="168" rx="14" ry="20" fill="none" stroke="rgba(139,105,20,0.2)" strokeWidth="1" />
          </motion.g>

          {/* --- Top/Right Blade --- */}
          <motion.g
            style={{ transformOrigin: '75px 100px' }}
            animate={{ rotate: bladesOpen ? 18 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Blade body */}
            <path
              d="M 75,100 C 82,80 100,45 118,10 C 120,5 115,2 112,7 C 98,40 85,75 77,97 Z"
              fill="url(#goldBlade)"
            />
            {/* Blade cutting edge highlight */}
            <path
              d="M 75,100 C 82,80 100,45 118,10 L 115,8 C 98,42 84,78 76,98 Z"
              fill="url(#bladeShine)" opacity="0.4"
            />
            {/* Blade back edge */}
            <path
              d="M 77,97 C 85,75 98,40 112,7 L 110,8 C 97,42 84,76 77,96 Z"
              fill="rgba(139,105,20,0.6)"
            />
            {/* Neck transition */}
            <path
              d="M 85,102 C 90,115 98,128 106,138 L 100,141 C 93,130 87,118 82,106 Z"
              fill="url(#goldHandle)"
            />
            {/* Handle ring outer */}
            <ellipse cx="112" cy="168" rx="22" ry="28" fill="none" stroke="url(#goldHandle)" strokeWidth="8" />
            {/* Handle ring highlight */}
            <ellipse cx="112" cy="168" rx="22" ry="28" fill="none" stroke="rgba(255,250,205,0.25)" strokeWidth="2" />
            {/* Handle ring inner shadow */}
            <ellipse cx="112" cy="168" rx="14" ry="20" fill="none" stroke="rgba(139,105,20,0.2)" strokeWidth="1" />
          </motion.g>

          {/* Pivot screw */}
          <circle cx="75" cy="100" r="6" fill="#B8860B" stroke="#DAA520" strokeWidth="2" />
          <circle cx="75" cy="100" r="3" fill="#8B6914" />
          <circle cx="73.5" cy="98.5" r="1.5" fill="rgba(255,250,205,0.5)" />
        </svg>
      </motion.div>

      {/* === GOLDEN CUT FLASH === */}
      {(phase === 'cut' || phase === 'split') && (
        <motion.div
          className="absolute"
          style={{
            top: '50%', left: '50%',
            width: 250, height: 250,
            marginTop: -125, marginLeft: -125,
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.3, 1.5, 2.5] }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,215,0,0.15) 40%, transparent 70%)' }}
          />
        </motion.div>
      )}

      {/* === SPARKS ON CUT === */}
      {(phase === 'cut' || phase === 'split') && (
        <>
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute rounded-full"
              style={{
                top: '50%', left: '50%',
                width: i % 4 === 0 ? 5 : i % 3 === 0 ? 3 : 2,
                height: i % 4 === 0 ? 5 : i % 3 === 0 ? 3 : 2,
                background: i % 3 === 0 ? '#FFFACD' : i % 2 === 0 ? '#FFD700' : '#FFF',
                boxShadow: `0 0 ${i % 3 === 0 ? 8 : 4}px ${i % 2 === 0 ? '#FFD700' : '#FFF'}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 16) * (90 + Math.random() * 60),
                y: Math.sin((i * Math.PI * 2) / 16) * (90 + Math.random() * 60),
                opacity: 0,
              }}
              transition={{ duration: 0.9, delay: Math.random() * 0.15, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      {/* === FALLING RIBBON FRAGMENTS === */}
      {(phase === 'split' || phase === 'done') && (
        <>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`frag-${i}`}
              className="absolute rounded-sm"
              style={{
                top: '50%',
                left: `${44 + Math.random() * 12}%`,
                width: 8 + Math.random() * 14,
                height: 18 + Math.random() * 18,
                background: `linear-gradient(${Math.random() * 180}deg, #B91C1C, #EF4444, #FCA5A5)`,
                boxShadow: '0 2px 10px rgba(220, 38, 38, 0.4)',
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: 450 + Math.random() * 350,
                x: (Math.random() - 0.5) * 350,
                opacity: 0,
                rotate: Math.random() * 1080 - 540,
              }}
              transition={{
                duration: 1.8 + Math.random() * 0.8,
                delay: Math.random() * 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};



export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showRibbon, setShowRibbon] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleUnlock = useCallback(() => {
    if (!isLocked) return;

    setIsLocked(false);
    setShowRibbon(true);

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

      {/* Ribbon Cutting Animation */}
      {showRibbon && (
        <RibbonCutting onComplete={() => setShowRibbon(false)} />
      )}

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
