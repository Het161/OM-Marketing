// // frontend/src/components/Navbar.tsx

// /**
//  * Navigation Bar Component
//  * This appears on every page - like a header!
//  * Has shopping cart indicator and menu links
//  */

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiShoppingCart, FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
// import { useCartStore } from '@/store/cartStore';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const router = useRouter();
  
//   // Get total items from cart (this is reactive!)
//   const totalItems = useCartStore((state) => state.getTotalItems());
  
//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Handle search
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery('');
//     }
//   };
  
//   // Navigation links
//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/products', label: 'Products' },
//     { href: '/categories', label: 'Categories' },
//     { href: '/about', label: 'About Us' },
//     { href: '/contact', label: 'Contact' },
//   ];
  
//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-3">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative w-12 h-12"
//               >
//                 <Image
//                   src="/images/om-logo.jpg"
//                   alt="OM Marketing Logo"
//                   fill
//                   sizes = "48px"
//                   className="object-contain"
//                 />
//               </motion.div>
//               <div>
//                 <h1 className="text-2xl font-bold text-primary-500">OM Marketing</h1>
//                 <p className="text-xs text-gray-600">Quality Weighing Solutions</p>
//               </div>
//             </Link>
            
//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-gray-700 hover:text-primary-500 font-medium transition-colors relative group"
//                 >
//                   {link.label}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
//                 </Link>
//               ))}
//             </div>
            
//             {/* Search Bar (Desktop) */}
//             <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search products..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
//                 />
//                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               </div>
//             </form>
            
//             {/* Right Side Icons */}
//             <div className="flex items-center gap-4">
//               {/* User Account */}
//               <Link href="/account">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <FiUser size={22} className="text-gray-700" />
//                 </motion.button>
//               </Link>
              
//               {/* Shopping Cart */}
//               <Link href="/cart">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <FiShoppingCart size={22} className="text-gray-700" />
// {totalItems > 0 && (
//   <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
//     {totalItems}
//   </span>
// )}
//                 </motion.button>
//               </Link>
              
//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>
      
//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: '100%' }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: '100%' }}
//             transition={{ type: 'tween' }}
//             className="fixed inset-0 z-40 bg-white md:hidden"
//             style={{ top: '80px' }}
//           >
//             <div className="flex flex-col p-6 gap-4">
//               {/* Mobile Search */}
//               <form onSubmit={handleSearch} className="mb-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search products..."
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   />
//                   <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 </div>
//               </form>
              
//               {/* Mobile Links */}
//               {navLinks.map((link, index) => (
//                 <motion.div
//                   key={link.href}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Link
//                     href={link.href}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="block text-lg font-medium text-gray-700 hover:text-primary-500 py-3 border-b border-gray-200"
//                   >
//                     {link.label}
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* Spacer for fixed navbar */}
//       <div className="h-20" />
//     </>
//   );
// }

// frontend/src/components/Navbar.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiHome, FiBox, FiInfo, FiPhone } from 'react-icons/fi';
import { 
  FaWeight, 
  FaBalanceScale, 
  FaCogs, 
  FaIndustry, 
  FaTachometerAlt,
  FaCertificate,
  FaRuler,
  FaCube,
  FaTh
} from 'react-icons/fa';

const categories = [
  { 
    name: 'Table Top Scales', 
    slug: 'table-top',
    icon: <FaBalanceScale />,
    color: 'from-blue-500 to-cyan-500',
    description: 'Compact & precise'
  },
  { 
    name: 'Platform Scales', 
    slug: 'platform',
    icon: <FaWeight />,
    color: 'from-green-500 to-emerald-500',
    description: 'Heavy-duty weighing'
  },
  { 
    name: 'Industrial Scales', 
    slug: 'industrial',
    icon: <FaIndustry />,
    color: 'from-purple-500 to-pink-500',
    description: 'Large-scale operations'
  },
  { 
    name: 'Digital Weighing', 
    slug: 'digital',
    icon: <FaTachometerAlt />,
    color: 'from-orange-500 to-red-500',
    description: 'Advanced digital tech'
  },
  { 
    name: 'Mechanical Scales', 
    slug: 'mechanical',
    icon: <FaCogs />,
    color: 'from-gray-500 to-slate-600',
    description: 'Reliable & durable'
  },
  { 
    name: 'Crane Scales', 
    slug: 'crane',
    icon: <FaCube />,
    color: 'from-yellow-500 to-amber-500',
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl"
            >
              ⚖️
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:to-teal-600 transition-all">
              OM Marketing
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  pathname === link.href
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Enhanced Categories Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <FaTh />
                Categories
                <motion.div
                  animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                      style={{ top: '64px' }}
                    />

                    {/* Dropdown Menu */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <FaTh />
                          Browse Categories
                        </h3>
                        <p className="text-sm text-white/80 mt-1">
                          Find the perfect weighing solution
                        </p>
                      </div>

                      {/* Categories List */}
                      <div className="p-2 max-h-[500px] overflow-y-auto">
                        {categories.map((category, index) => (
                          <motion.div
                            key={category.slug}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={`/products?category=${category.slug}`}
                              onClick={() => setIsCategoriesOpen(false)}
                              className="group"
                            >
                              <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all"
                              >
                                {/* Icon with gradient background */}
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}>
                                  {category.icon}
                                </div>

                                {/* Category Info */}
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                                    {category.name}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {category.description}
                                  </p>
                                </div>

                                {/* Arrow */}
                                <motion.div
                                  initial={{ x: 0 }}
                                  whileHover={{ x: 5 }}
                                  className="text-gray-400 group-hover:text-teal-600 transition-colors"
                                >
                                  →
                                </motion.div>
                              </motion.div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="bg-gray-50 p-4 border-t border-gray-100">
                        <Link
                          href="/products"
                          onClick={() => setIsCategoriesOpen(false)}
                          className="block"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                          >
                            View All Products →
                          </motion.button>
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      pathname === link.href
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Categories */}
                <div>
                  <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="w-full px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <FaTh />
                      Categories
                    </span>
                    <motion.div
                      animate={{ rotate: isCategoriesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 space-y-1 pl-4"
                      >
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/products?category=${category.slug}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all"
                          >
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-sm`}>
                              {category.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                {category.name}
                              </div>
                              <div className="text-xs text-gray-500">
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
  );
}
