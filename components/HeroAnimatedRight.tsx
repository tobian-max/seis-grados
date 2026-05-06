'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const T = {
  accent:      '#F97316',
  dark:        '#141210',
  darkMid:     '#1E1B17',
  darkSub:     '#2A261F',
  textDark:    '#F5F0EB',
  textDarkSub: '#A89D90',
  font:        "var(--font-space, 'Space Grotesk', sans-serif)",
};

const SLIDES = ['bleed', 'orbital', 'layered', 'typewall'] as const;
type Slide = typeof SLIDES[number];
const SLIDE_DURATION = 6600;

/* ─── Slide 1: Bleed 6 ─────────────────────────────────────────── */
function BleedSix() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      {/* Gigantic 6 bleeding off right edge */}
      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1, y: [0, -8, 0] }}
        transition={{
          x:       { duration: 1.0, ease: 'easeOut' },
          opacity: { duration: 1.0, ease: 'easeOut' },
          y:       { delay: 1.2, duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          fontFamily: T.font,
          fontWeight: 700,
          fontSize: 680,
          color: T.textDark,
          lineHeight: 0.85,
          letterSpacing: '-30px',
          marginRight: -120,
          marginBottom: -40,
          userSelect: 'none',
          position: 'relative',
        }}
      >
        6
      </motion.div>

      {/* Degree circle floating top-right */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale:   [0, 1.15, 1, 1.08, 1],
          opacity: 1,
        }}
        transition={{
          scale:   { delay: 0.4, duration: 0.8, ease: 'easeOut', times: [0, 0.4, 0.6, 0.8, 1] },
          opacity: { delay: 0.4, duration: 0.4 },
        }}
        style={{
          position: 'absolute',
          top: 70,
          right: 200,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `6px solid ${T.accent}`,
        }}
      />
      {/* Pulsing scale loop on circle */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.08, 1], opacity: 1 }}
        transition={{
          scale:   { delay: 1.4, duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          opacity: { delay: 0.4, duration: 0.1 },
        }}
        style={{
          position: 'absolute',
          top: 70,
          right: 200,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `6px solid ${T.accent}`,
          pointerEvents: 'none',
        }}
      />

      {/* Vertical wordmark on the right edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: '50%',
          right: 20,
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center',
          fontFamily: T.font,
          fontWeight: 300,
          fontSize: 11,
          letterSpacing: '8px',
          color: T.accent,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        grados · business solutions
      </motion.div>
    </div>
  );
}

/* ─── Slide 2: Orbital System ──────────────────────────────────── */
const ORBITAL_NODES = [
  { angle: -20,  label: 'Mentoría',     r: 230 },
  { angle: 60,   label: 'Estrategia',   r: 230 },
  { angle: 140,  label: 'Liderazgo',    r: 230 },
  { angle: 220,  label: 'Conferencias', r: 230 },
  { angle: 300,  label: 'Comercial',    r: 230 },
];

function OrbitalSystem() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* SVG rings + tick marks */}
      <svg
        viewBox="-300 -300 600 600"
        style={{ position: 'absolute', width: 620, height: 620 }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <motion.circle
          cx="0" cy="0" r="270"
          fill="none" stroke={T.darkSub} strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0 }}
        />
        {/* Middle ring dashed */}
        <motion.circle
          cx="0" cy="0" r="200"
          fill="none" stroke={T.darkSub} strokeWidth="1" strokeDasharray="2 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
        />
        {/* Inner ring */}
        <motion.circle
          cx="0" cy="0" r="130"
          fill="none" stroke={T.darkSub} strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        />
        {/* 24 tick marks — sequential reveal */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15) * Math.PI / 180;
          const x1 = Math.cos(a) * 268, y1 = Math.sin(a) * 268;
          const x2 = Math.cos(a) * 280, y2 = Math.sin(a) * 280;
          const isAccent = i % 6 === 0;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isAccent ? T.accent : T.darkSub}
              strokeWidth={isAccent ? 2 : 1}
              initial={{ opacity: 0 }}
              animate={{ opacity: isAccent ? [0, 1, 0.6, 1] : 1 }}
              transition={{
                opacity: {
                  delay: 0.6 + i * 0.025,
                  duration: isAccent ? 3 : 0.3,
                  repeat: isAccent ? Infinity : 0,
                  ease: 'easeInOut',
                },
              }}
            />
          );
        })}
      </svg>

      {/* Center 6 — fade + scale entry */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'relative',
          fontFamily: T.font,
          fontWeight: 700,
          fontSize: 220,
          color: T.textDark,
          lineHeight: 1,
          letterSpacing: '-8px',
          userSelect: 'none',
          zIndex: 2,
        }}
      >
        6
        <div style={{
          position: 'absolute', top: 8, right: -22,
          width: 16, height: 16, borderRadius: '50%',
          border: `3px solid ${T.accent}`,
        }} />
      </motion.div>

      {/* Orbiting nodes wrapper — slow rotation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {ORBITAL_NODES.map((node, i) => {
          const a = node.angle * Math.PI / 180;
          const x = Math.cos(a) * node.r;
          const y = Math.sin(a) * node.r;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease: 'backOut' }}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Counter-rotate content so labels stay upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.accent, flexShrink: 0 }} />
                <span style={{
                  fontFamily: T.font, fontWeight: 500, fontSize: 11,
                  color: T.textDarkSub, whiteSpace: 'nowrap',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>
                  {node.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Slide 3: Layered 6 (with mouse parallax) ─────────────────── */
function LayeredSix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setMouse({ x: 0, y: 0 }), []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Layer 1 — huge outline, bleeds right */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{
          x: mouse.x * 0.02,
          y: [0, -6, 0],
          opacity: 0.35,
        }}
        transition={{
          x:       { duration: 0.08, ease: 'linear' },
          y:       { delay: 1.2, duration: 5, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.6, ease: 'easeOut' },
        }}
        style={{
          position: 'absolute',
          right: -140,
          top: -40,
          fontFamily: T.font,
          fontWeight: 700,
          fontSize: 720,
          color: 'transparent',
          WebkitTextStroke: `2px ${T.accent}`,
          letterSpacing: '-30px',
          lineHeight: 0.85,
          userSelect: 'none',
        }}
      >
        6
      </motion.div>

      {/* Layer 2 — medium dark filled */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{
          x: mouse.x * 0.012,
          y: [0, -4, 0],
          opacity: 1,
        }}
        transition={{
          x:       { delay: 0, duration: 0.08, ease: 'linear' },
          y:       { delay: 1.1, duration: 4, repeat: Infinity, ease: 'easeInOut' },
          opacity: { delay: 0.2, duration: 0.6 },
        }}
        style={{
          position: 'absolute',
          right: 40,
          top: 100,
          fontFamily: T.font,
          fontWeight: 700,
          fontSize: 480,
          color: T.darkMid,
          letterSpacing: '-20px',
          lineHeight: 0.85,
          userSelect: 'none',
        }}
      >
        6
      </motion.div>

      {/* Layer 3 — small sharp white in front */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          x: mouse.x * 0.005,
          y: [0, -2, 0],
          scale: 1,
          opacity: 1,
        }}
        transition={{
          x:       { duration: 0.08, ease: 'linear' },
          y:       { delay: 1.0, duration: 3, repeat: Infinity, ease: 'easeInOut' },
          scale:   { delay: 0.4, duration: 0.6 },
          opacity: { delay: 0.4, duration: 0.6 },
        }}
        style={{
          position: 'absolute',
          right: 180,
          top: 230,
          fontFamily: T.font,
          fontWeight: 700,
          fontSize: 280,
          color: T.textDark,
          letterSpacing: '-12px',
          lineHeight: 0.85,
          userSelect: 'none',
        }}
      >
        6
        <span style={{
          position: 'absolute', top: 14, right: -28,
          width: 18, height: 18, borderRadius: '50%', display: 'inline-block',
          border: `4px solid ${T.accent}`,
        }} />
      </motion.div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: 50, right: 60,
          fontFamily: T.font, fontWeight: 300, fontSize: 11,
          letterSpacing: '5px', color: T.textDarkSub,
          textTransform: 'uppercase', textAlign: 'right',
          lineHeight: 1.8,
        }}
      >
        Capas de transformación<br />
        <span style={{ color: T.accent, fontWeight: 500 }}>· 360° de impacto</span>
      </motion.div>
    </div>
  );
}

/* ─── Slide 4: Type Wall ────────────────────────────────────────── */
const HIGHLIGHT_POSITIONS = [
  { row: 4, col: 1 },
  { row: 2, col: 2 },
  { row: 6, col: 0 },
  { row: 7, col: 3 },
];

function TypeWall() {
  const [hlIdx, setHlIdx] = useState(0);
  const rows = 9, cols = 4;

  useEffect(() => {
    const t = setInterval(() => setHlIdx(i => (i + 1) % HIGHLIGHT_POSITIONS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const hl = HIGHLIGHT_POSITIONS[hlIdx];

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '0 20px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 0 }}>
        {Array.from({ length: rows }).map((_, r) => (
          <motion.div
            key={r}
            initial={{ x: r % 2 === 0 ? 20 : -20, opacity: 0 }}
            animate={{
              x: r % 2 === 0
                ? ['0px', '-40px']
                : ['-30px', '10px'],
              opacity: 1,
            }}
            transition={{
              x:       { delay: 1.2 + Math.abs(r - 4) * 0.06, duration: 20, repeat: Infinity, ease: 'linear' },
              opacity: { delay: 0.06 + Math.abs(r - 4) * 0.06, duration: 0.4 },
            }}
            style={{ display: 'flex', gap: 24 }}
          >
            {Array.from({ length: cols }).map((_, c) => {
              const isHl = r === hl.row && c === hl.col;
              return (
                <motion.div
                  key={c}
                  animate={{
                    color:    isHl ? T.accent : T.darkMid,
                    fontWeight: isHl ? 700 : 300,
                    fontSize:  isHl ? '64px' : '56px',
                    scale:     isHl ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{
                    fontFamily: T.font,
                    lineHeight: 1,
                    letterSpacing: '-2px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  6 grados{isHl ? '°' : ''}
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Gradient fade masks on edges */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(90deg, ${T.dark} 0%, transparent 14%, transparent 86%, ${T.dark} 100%),
                       linear-gradient(180deg, ${T.dark} 0%, transparent 12%, transparent 88%, ${T.dark} 100%)`,
        }}
      />
    </div>
  );
}

/* ─── Main Carousel ─────────────────────────────────────────────── */
export default function HeroAnimatedRight() {
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReduced) return;
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), SLIDE_DURATION);
    return () => clearInterval(t);
  }, [isPaused, prefersReduced]);

  return (
    <div
      role="img"
      aria-label="6 Grados — animated brand mark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: '480px', overflow: 'hidden' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={SLIDES[idx]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {SLIDES[idx] === 'bleed'    && <BleedSix />}
          {SLIDES[idx] === 'orbital'  && <OrbitalSystem />}
          {SLIDES[idx] === 'layered'  && <LayeredSix />}
          {SLIDES[idx] === 'typewall' && <TypeWall />}
        </motion.div>
      </AnimatePresence>

      {/* Slide indicator dots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 20, right: 20,
          display: 'flex', gap: 8, zIndex: 10,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              height: 4,
              width: i === idx ? 28 : 8,
              borderRadius: 2,
              background: i === idx ? T.accent : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
