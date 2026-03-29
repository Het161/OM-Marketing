'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { FiPhone, FiArrowRight } from 'react-icons/fi';
import { FaBalanceScale } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(
    "Hi! 👋 I'm interested in your weighing solutions. Can you help me?"
  );

  return (
    <>
      <footer className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Footer Content */}
          <div className="py-14 grid md:grid-cols-4 gap-10">

            {/* Company Info */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <FaBalanceScale className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  OM <span className="text-teal-400">Marketing</span>
                </span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                ISO 9001:2008 certified company providing premium weighing solutions since 2008.
              </p>

              {/* Social Links */}
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/om_marketing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all hover:shadow-lg"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/products', label: 'Products' },
                  { href: '/about', label: 'About Us' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                    >
                      <FiArrowRight className="text-xs text-gray-600 group-hover:text-teal-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Categories</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/products?category=weighing_scale', label: 'Weighing Scales' },
                  { href: '/products?category=note_counter', label: 'Note Counters' },
                  { href: '/products?category=mobile_accessory', label: 'Accessories' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                    >
                      <FiArrowRight className="text-xs text-gray-600 group-hover:text-teal-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`https://wa.me/919825247312?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <FaWhatsapp className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">WhatsApp</div>
                      <div className="text-sm text-gray-400 group-hover:text-green-400 transition-colors">+91 98252 47312</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ommarketing.weighingscale1@gmail.com"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                      <FaEnvelope className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Email</div>
                      <div className="text-sm text-gray-400 group-hover:text-teal-400 transition-colors break-all">ommarketing.weighingscale1@gmail.com</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="tel:9825247312" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                      <FiPhone className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Phone</div>
                      <div className="text-sm text-gray-400 group-hover:text-sky-400 transition-colors">+91 98252 47312</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © {currentYear} OM Marketing. All rights reserved.
            </p>

            <div className="flex gap-2">
              <a
                href={`https://wa.me/919825247312?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
                Chat Now
              </a>
              <a
                href="tel:9825247312"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 text-xs font-medium hover:bg-sky-500/20 transition-colors"
              >
                <FiPhone className="w-3.5 h-3.5" />
                Call Now
              </a>
            </div>
          </div>

          {/* Developer Credit */}
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

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/919825247312?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3.5 rounded-2xl shadow-xl hover:shadow-green-500/30 transition-all z-50"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </motion.a>
    </>
  );
}
