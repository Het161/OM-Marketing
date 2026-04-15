'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBalanceScale } from 'react-icons/fa';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fade out after 1.2 s — just enough to show the brand mark
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, #0f172a 0%, #0c3644 30%, #0d5e52 65%, #0d9488 100%)',
          }}
        >
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-32 h-32 rounded-full border border-teal-400/30"
          />

          {/* Logo icon — slow spin */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-2xl shadow-teal-500/40"
          >
            <FaBalanceScale className="text-white text-2xl" />
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-5 flex flex-col items-center gap-1"
          >
            <span className="text-white font-bold text-lg tracking-wide">
              OM <span className="text-teal-300">Marketing</span>
            </span>
            {/* Loading dots */}
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
