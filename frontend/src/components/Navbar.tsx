'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiHome, FiBox, FiInfo, FiPhone } from 'react-icons/fi';
import {
  FaBalanceScale,
  FaWeight,
  FaIndustry,
  FaTachometerAlt,
  FaCogs,
  FaCube,
  FaCertificate,
} from 'react-icons/fa';

const categories = [
  {
    name: 'Table Top Scales',
    slug: 'table-top',
    icon: <FaBalanceScale />,
    color: 'from-sky-500 to-blue-600',
    description: 'Compact & precise'
  },
  {
    name: 'Platform Scales',
    slug: 'platform',
    icon: <FaWeight />,
    color: 'from-emerald-500 to-green-600',
    description: 'Heavy-duty weighing'
  },
  {
    name: 'Industrial Scales',
    slug: 'industrial',
    icon: <FaIndustry />,
    color: 'from-violet-500 to-purple-600',
    description: 'Large-scale operations'
  },
  {
    name: 'Digital Weighing',
    slug: 'digital',
    icon: <FaTachometerAlt />,
    color: 'from-amber-500 to-orange-600',
    description: 'Advanced digital tech'
  },
  {
    name: 'Mechanical Scales',
    slug: 'mechanical',
    icon: <FaCogs />,
    color: 'from-slate-500 to-gray-600',
    description: 'Reliable & durable'
  },
  {
    name: 'Crane Scales',
    slug: 'crane',
    icon: <FaCube />,
    color: 'from-yellow-500 to-amber-600',
    description: 'Hanging weight systems'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    icon: <FaCertificate />,
    color: 'from-teal-500 to-cyan-600',
    description: 'Parts & components'
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home', icon: <FiHome /> },
    { href: '/products', label: 'Products', icon: <FiBox /> },
    { href: '/about', label: 'About', icon: <FiInfo /> },
    { href: '/contact', label: 'Contact', icon: <FiPhone /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-gray-200/50'
            : 'bg-white/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                <FaBalanceScale className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                OM <span className="text-teal-600">Marketing</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    pathname === link.href
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className={pathname === link.href ? 'text-teal-500' : 'text-gray-400'}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  Categories
                  <motion.div
                    animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="text-xs" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isCategoriesOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="fixed inset-0"
                        style={{ top: '64px' }}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full mt-2 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-2">
                          {categories.map((category, index) => (
                            <Link
                              key={category.slug}
                              href={`/products?category=${category.slug}`}
                              onClick={() => setIsCategoriesOpen(false)}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                              >
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-sm shadow-sm`}>
                                  {category.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 group-hover:text-teal-700 transition-colors">
                                    {category.name}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {category.description}
                                  </div>
                                </div>
                                <FiChevronDown className="text-gray-300 -rotate-90 group-hover:text-teal-500 transition-colors text-xs" />
                              </motion.div>
                            </Link>
                          ))}
                        </div>

                        <div className="p-2 border-t border-gray-50">
                          <Link
                            href="/products"
                            onClick={() => setIsCategoriesOpen(false)}
                          >
                            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                              View All Products
                              <FiChevronDown className="-rotate-90 text-xs" />
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden border-t border-gray-100"
              >
                <div className="py-3 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2.5 ${
                        pathname === link.href
                          ? 'bg-teal-50 text-teal-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className={pathname === link.href ? 'text-teal-500' : 'text-gray-400'}>
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile Categories */}
                  <div>
                    <button
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-gray-400"><FiBox /></span>
                        Categories
                      </span>
                      <motion.div
                        animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="text-xs text-gray-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isCategoriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-1 space-y-0.5 pl-4"
                        >
                          {categories.map((category) => (
                            <Link
                              key={category.slug}
                              href={`/products?category=${category.slug}`}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all"
                            >
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xs`}>
                                {category.icon}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800">
                                  {category.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {category.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
