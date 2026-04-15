'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

/* ── Animated count-up hook ─────────────────────────────────────── */
function useCountUp(target: number, duration = 1.8, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
      else setCount(target);
    };

    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [target, duration, trigger]);

  return count;
}

/* ── Stat counter component ─────────────────────────────────────── */
function StatCounter({
  target,
  suffix,
  label,
  delay = 0,
  trigger = true,
}: {
  target: number;
  suffix: string;
  label: string;
  delay?: number;
  trigger?: boolean;
}) {
  const [started, setStarted] = useState(false);
  const count = useCountUp(target, 1.8, started);

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [trigger, delay]);

  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-black text-white mb-1 tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ── Main Hero ───────────────────────────────────────────────────── */
export default function Hero3D() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  return (
    <section className="w-full min-h-[100vh] relative overflow-hidden flex items-center">

      {/* ── Animated gradient background ── */}
      <div className="absolute inset-0 hero-animated-bg" />

      {/* ── Mesh overlay radials ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[60%] h-[60%] opacity-30"
          style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.45) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[50%] h-[50%] opacity-20"
          style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(20,184,166,0.5) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.35) 0%, transparent 50%)' }}
        />
      </div>

      {/* ── Subtle dot-grid pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right,  rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Floating particles (deterministic positions — no hydration mismatch) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => {
          const xPos = 8 + (i * 6.5) % 84;
          const size = 2 + (i % 3);
          return (
            <motion.div
              key={i}
              initial={{ y: '110%', x: `${xPos}%`, opacity: 0 }}
              animate={{ y: '-10%', opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: 12 + (i % 8),
                repeat: Infinity,
                delay: i * 1.1,
                ease: 'linear',
              }}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: 'rgba(255,255,255,0.85)',
                boxShadow: '0 0 8px 2px rgba(255,255,255,0.3)',
                left: `${xPos}%`,
              }}
            />
          );
        })}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-sm">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-400"
              />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                ISO 9001:2008 Certified · 15+ Years of Excellence
              </span>
            </div>
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              {['Precision', 'Weighing', 'Solutions'].map((word, wi) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + wi * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`block ${wi === 1
                    ? 'bg-gradient-to-r from-teal-200 via-cyan-200 to-amber-200 bg-clip-text text-transparent'
                    : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            India&apos;s trusted supplier of industrial weighing scales,
            note counters, and commercial equipment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl cursor-pointer inline-flex items-center gap-3 overflow-hidden"
              >
                {/* Hover colour fill */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Explore Products
                </span>
                <motion.span
                  className="relative z-10 group-hover:text-white transition-colors duration-300"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiArrowRight className="text-xl" />
                </motion.span>
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all cursor-pointer inline-flex items-center gap-3"
              >
                <FiPhone className="text-xl" />
                Contact Us
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick contact chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex gap-3 justify-center flex-wrap"
          >
            <a href="tel:9825247312">
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 font-medium text-sm cursor-pointer hover:bg-emerald-500/30 transition-colors"
              >
                <FiPhone className="text-sm" />
                98252 47312
              </motion.div>
            </a>

            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 font-medium text-sm cursor-pointer hover:bg-sky-500/30 transition-colors"
              >
                <FiMail className="text-sm" />
                Get a Quote
              </motion.div>
            </Link>
          </motion.div>

          {/* ── Animated Stats Row ── */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <StatCounter target={15}   suffix="+" label="Years"    delay={0}    trigger={statsInView} />
            <StatCounter target={50}   suffix="+" label="Products" delay={0.15} trigger={statsInView} />
            <StatCounter target={1000} suffix="+" label="Clients"  delay={0.3}  trigger={statsInView} />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade-to-white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
    </section>
  );
}
