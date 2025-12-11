// frontend/src/components/Footer.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaEnvelope, FaGlobe, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // WhatsApp message pre-filled
  const whatsappMessage = encodeURIComponent(
    "Hey! 👋 I came across your website and I'm interested in your weighing solutions. Can you help me?"
  );

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/om-logo.jpg"
                alt="OM Marketing Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold">OM Marketing</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              ISO 9001:2008 certified company providing premium weighing solutions since 2008.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {/* Instagram */}
              <motion.a
                href="https://instagram.com/om_marketing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 p-3 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Products' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Categories</h3>
            <ul className="space-y-2">
              {[
                { href: '/products?category=weighing_scale', label: 'Weighing Scales' },
                { href: '/products?category=note_counter', label: 'Note Counters' },
                { href: '/products?category=accessories', label: 'Accessories' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">Get In Touch</h3>
            <ul className="space-y-3">
              {/* WhatsApp */}
              <li>
                <motion.a
                  href={`https://wa.me/919825247312?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-3 group"
                >
                  <div className="bg-green-500 p-2 rounded-full group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                    <FaWhatsapp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">WhatsApp</div>
                    <div className="text-sm font-medium">+91 98252 47312</div>
                  </div>
                </motion.a>
              </li>

              {/* Email */}
              <li>
                <motion.a
                  href="mailto:ommarketing.weighingscale1@gmail.com"
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-3 group"
                >
                  <div className="bg-cyan-500 p-2 rounded-full group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                    <FaEnvelope className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-sm font-medium break-all">ommarketing.weighingscale1@gmail.com</div>
                  </div>
                </motion.a>
              </li>

              {/* Portfolio */}
              <li>
                <motion.a
                  href="https://buildbyhet.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-3 group"
                >
                  <div className="bg-purple-500 p-2 rounded-full group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                    <FaGlobe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Portfolio</div>
                    <div className="text-sm font-medium">buildbyhet.me</div>
                  </div>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} OM Marketing. All rights reserved.
            </p>
            
            {/* Quick Contact Buttons */}
            <div className="flex gap-3">
              <motion.a
                href={`https://wa.me/919825247312?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/50 flex items-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="hidden sm:inline">Chat Now</span>
              </motion.a>

              <motion.a
                href="tel:9825247312"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Call Now</span>
              </motion.a>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Designed & Developed by{' '}
              <a
                href="https://buildbyhet.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Het Patel
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button - Always Visible */}
      <motion.a
        href={`https://wa.me/919825247312?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all z-50 group"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap font-semibold hidden group-hover:block"
        >
          Chat with us! 💬
        </motion.div>
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
      </motion.a>
    </footer>
  );
}
