'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { FiPhone, FiArrowRight, FiArrowUp } from 'react-icons/fi';
import { FaBalanceScale } from 'react-icons/fa';

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

const colVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: E },
  }),
};

const quickLinks = [
  { href: '/',        label: 'Home' },
  { href: '/products',label: 'Products' },
  { href: '/about',   label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const categoryLinks = [
  { href: '/products?category=weighing_scale', label: 'Weighing Scales' },
  { href: '/products?category=note_counter',   label: 'Note Counters' },
  { href: '/products?category=mobile_accessory',label: 'Accessories' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const whatsappMessage = encodeURIComponent(
    "Hi! 👋 I'm interested in your weighing solutions. Can you help me?"
  );

  return (
    <>
      <footer className="bg-gray-950 text-white overflow-hidden">

        {/* Animated gradient top border */}
        <div className="gradient-border-top" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Main grid ── */}
          <div className="py-14 grid md:grid-cols-4 gap-10">

            {/* Company Info */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0}
              className="md:col-span-1"
            >
              <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center"
                >
                  <FaBalanceScale className="text-white text-sm" />
                </motion.div>
                <span className="text-xl font-bold tracking-tight">
                  OM <span className="text-teal-400">Marketing</span>
                </span>
              </Link>

              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                ISO 9001:2008 certified company providing premium weighing solutions since 2008.
              </p>

              {/* Social icons */}
              <div className="flex gap-2">
                {[
                  {
                    href: 'https://instagram.com/om_marketing',
                    label: 'Instagram',
                    icon: <FaInstagram className="w-4 h-4" />,
                    hoverClass: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500',
                  },
                  {
                    href: 'https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b',
                    label: 'LinkedIn',
                    icon: <FaLinkedin className="w-4 h-4" />,
                    hoverClass: 'hover:bg-blue-600',
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center transition-all hover:shadow-lg ${social.hoverClass}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={1}
            >
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-teal-400 transition-colors flex items-center gap-1.5 group link-underline"
                    >
                      <motion.span
                        whileHover={{ x: 3 }}
                        className="text-xs text-gray-600 group-hover:text-teal-400 transition-colors"
                      >
                        <FiArrowRight />
                      </motion.span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={2}
            >
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Categories</h3>
              <ul className="space-y-2.5">
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-teal-400 transition-colors flex items-center gap-1.5 group link-underline"
                    >
                      <motion.span
                        whileHover={{ x: 3 }}
                        className="text-xs text-gray-600 group-hover:text-teal-400 transition-colors"
                      >
                        <FiArrowRight />
                      </motion.span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={3}
            >
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3">
                {[
                  {
                    href: `https://wa.me/919825247312?text=${whatsappMessage}`,
                    icon: <FaWhatsapp className="w-3.5 h-3.5 text-green-400" />,
                    bg: 'bg-green-500/10 group-hover:bg-green-500/20',
                    label: 'WhatsApp',
                    value: '+91 98252 47312',
                    valueClass: 'group-hover:text-green-400',
                    external: true,
                  },
                  {
                    href: 'mailto:ommarketing.weighingscale1@gmail.com',
                    icon: <FaEnvelope className="w-3.5 h-3.5 text-teal-400" />,
                    bg: 'bg-teal-500/10 group-hover:bg-teal-500/20',
                    label: 'Email',
                    value: 'ommarketing.weighingscale1@gmail.com',
                    valueClass: 'group-hover:text-teal-400',
                    external: false,
                  },
                  {
                    href: 'tel:9825247312',
                    icon: <FiPhone className="w-3.5 h-3.5 text-sky-400" />,
                    bg: 'bg-sky-500/10 group-hover:bg-sky-500/20',
                    label: 'Phone',
                    value: '+91 98252 47312',
                    valueClass: 'group-hover:text-sky-400',
                    external: false,
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-3 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${item.bg}`}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <div className="text-xs text-gray-600">{item.label}</div>
                        <div className={`text-sm text-gray-400 transition-colors ${item.valueClass} break-all`}>
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © {currentYear} OM Marketing. All rights reserved.
            </p>

            <div className="flex gap-2">
              <motion.a
                href={`https://wa.me/919825247312?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
                Chat Now
              </motion.a>
              <motion.a
                href="tel:9825247312"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 text-xs font-medium hover:bg-sky-500/20 transition-colors"
              >
                <FiPhone className="w-3.5 h-3.5" />
                Call Now
              </motion.a>
            </div>
          </div>

          {/* Developer credit */}
          <div className="pb-6 text-center">
            <p className="text-gray-700 text-xs">
              Designed by{' '}
              <a
                href="https://buildbyhet.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 font-medium transition-colors"
              >
                Het Patel
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp button — bounce pulse ── */}
      <motion.a
        href={`https://wa.me/919825247312?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3.5 rounded-2xl shadow-xl hover:shadow-green-500/40 transition-shadow z-50 animate-bounce-pulse"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </motion.a>

      {/* ── Back to Top button ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3, ease: E }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-50 w-11 h-11 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center shadow-lg hover:bg-teal-600 hover:border-teal-500 transition-colors"
            aria-label="Back to top"
          >
            <FiArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
