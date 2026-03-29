'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full min-h-[100vh] relative overflow-hidden flex items-center">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #0e2f3c 20%, #0c4a4e 40%, #0d5e52 60%, #0f766e 80%, #0d9488 100%)',
      }} />

      {/* Mesh Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
          }}
        />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 70%, rgba(20, 184, 166, 0.5) 0%, transparent 60%)',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.3) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Light Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: '120%',
                x: `${10 + Math.random() * 80}%`,
                opacity: 0
              }}
              animate={{
                y: '-20%',
                opacity: [0, 0.6, 0.6, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'linear'
              }}
              className="absolute"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                boxShadow: '0 0 10px 2px rgba(255,255,255,0.3)',
                left: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

          {/* Certification Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                ISO 9001:2008 Certified · 15+ Years of Excellence
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block">Precision</span>
            <span className="block bg-gradient-to-r from-teal-200 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
              Weighing Solutions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            India&apos;s trusted supplier of industrial weighing scales,
            note counters, and commercial equipment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl cursor-pointer inline-flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10">Explore Products</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiArrowRight className="text-xl" />
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 font-bold text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Products <FiArrowRight className="text-xl" />
                </span>
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all cursor-pointer inline-flex items-center gap-3"
              >
                <FiPhone className="text-xl" />
                Contact Us
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Contact Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-3 justify-center flex-wrap"
          >
            <a href="tel:9825247312">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 font-medium text-sm cursor-pointer hover:bg-emerald-500/30 transition-colors"
              >
                <FiPhone className="text-sm" />
                98252 47312
              </motion.div>
            </a>

            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 font-medium text-sm cursor-pointer hover:bg-sky-500/30 transition-colors"
              >
                <FiMail className="text-sm" />
                Get a Quote
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '15+', label: 'Years' },
              { value: '50+', label: 'Products' },
              { value: '1000+', label: 'Clients' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}
