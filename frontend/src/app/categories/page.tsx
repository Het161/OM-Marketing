// // frontend/src/app/categories/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation'; // Use useRouter instead of Link
// import { FiArrowRight, FiPackage } from 'react-icons/fi';

// export default function CategoriesPage() {
//   const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
//   const [mounted, setMounted] = useState(false);
//   const router = useRouter(); // Initialize router

//   // Fix hydration by mounting on client only
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const categories = [
//     {
//       id: 'weighing_scale',
//       name: 'Weighing Scales',
//       description: 'Digital and platform scales for all capacities',
//       icon: '⚖️',
//       count: '50+ Models',
//       gradient: 'from-blue-400 via-blue-500 to-blue-600',
//       hoverGradient: 'from-blue-500 via-blue-600 to-cyan-600',
//       products: [
//         '30kg Table Top Scales',
//         'Platform Scales',
//         'Crane Scales',
//         'Heavy Duty Scales',
//       ],
//     },
//     {
//       id: 'note_counter',
//       name: 'Note Counting Machines',
//       description: 'Fast and accurate currency counting solutions',
//       icon: '💵',
//       count: '15+ Models',
//       gradient: 'from-green-400 via-green-500 to-emerald-600',
//       hoverGradient: 'from-green-500 via-emerald-600 to-teal-600',
//       products: [
//         'Basic Note Counters',
//         'UV Detection Counters',
//         'Mix Value Counters',
//         'High Speed Counters',
//       ],
//     },
//     {
//       id: 'mobile_accessory',
//       name: 'Mobile Accessories',
//       description: 'Quality phone cases, chargers, and more',
//       icon: '📱',
//       count: '100+ Items',
//       gradient: 'from-purple-400 via-pink-500 to-pink-600',
//       hoverGradient: 'from-purple-500 via-pink-600 to-rose-600',
//       products: [
//         'Phone Cases',
//         'Screen Protectors',
//         'Chargers & Cables',
//         'Power Banks',
//       ],
//     },
//   ];

//   // Click handler to navigate programmatically
//   const handleCategoryClick = (categoryId: string) => {
//     router.push(`/products?category=${categoryId}`);
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Stunning Static Background */}
//       <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             x: [0, -60, 0],
//             y: [0, 50, 0],
//           }}
//           transition={{
//             duration: 18,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/30 to-pink-400/30 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.15, 1],
//             rotate: [0, 180, 360],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-300/20 to-blue-400/20 rounded-full blur-2xl"
//         />
//       </div>

//       {/* Hero Section */}
//       <section className="relative py-20 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
        
//         <div className="absolute inset-0 opacity-10">
//           <motion.div
//             animate={{
//               backgroundPosition: ['0% 0%', '100% 100%'],
//             }}
//             transition={{
//               duration: 30,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             style={{
//               backgroundImage: `
//                 radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
//                 radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
//                 radial-gradient(circle at 40% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)
//               `,
//               backgroundSize: '400% 400%',
//             }}
//             className="absolute inset-0"
//           />
//         </div>
        
//         <div className="absolute inset-0 opacity-5">
//           <div 
//             style={{
//               backgroundImage: `
//                 linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
//                 linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
//               `,
//               backgroundSize: '60px 60px'
//             }}
//             className="w-full h-full"
//           />
//         </div>
        
//         <div className="max-w-7xl mx-auto relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <motion.div
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               className="inline-block mb-6"
//             >
//               <motion.div
//                 animate={{
//                   y: [0, -15, 0],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="text-7xl"
//               >
//                 🏪
//               </motion.div>
//             </motion.div>
            
//             <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{
//               textShadow: '0 10px 40px rgba(0,0,0,0.3)'
//             }}>
//               Product Categories
//             </h1>
//             <p className="text-xl text-white/90 max-w-2xl mx-auto" style={{
//               textShadow: '0 4px 20px rgba(0,0,0,0.2)'
//             }}>
//               Explore our wide range of weighing scales, note counters, and accessories
//             </p>
//           </motion.div>
//         </div>
        
//         <div className="absolute bottom-0 left-0 right-0 z-20">
//           <svg 
//             viewBox="0 0 1440 120" 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="w-full"
//             style={{ transform: 'translateY(1px)' }}
//           >
//             <path 
//               fill="rgba(249, 250, 251, 1)" 
//               d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* Categories Grid */}
//       <section className="py-20 px-4 relative z-10">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {categories.map((category, index) => (
//               <motion.div
//                 key={category.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.15 }}
//                 onHoverStart={() => setHoveredCategory(category.id)}
//                 onHoverEnd={() => setHoveredCategory(null)}
//                 onClick={() => handleCategoryClick(category.id)} // Click handler
//                 className="cursor-pointer" // Add cursor pointer
//               >
//                 <div className="group relative h-full">
//                   <motion.div
//                     whileHover={{ y: -8, scale: 1.02 }}
//                     transition={{ duration: 0.3 }}
//                     className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-lg border border-gray-100"
//                   >
//                     <div className="relative h-64 overflow-hidden">
//                       <motion.div 
//                         className={`absolute inset-0 bg-gradient-to-br ${
//                           hoveredCategory === category.id 
//                             ? category.hoverGradient 
//                             : category.gradient
//                         }`}
//                         animate={{
//                           scale: hoveredCategory === category.id ? 1.1 : 1,
//                         }}
//                         transition={{ duration: 0.4 }}
//                       />
                      
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <motion.div
//                           animate={{
//                             scale: hoveredCategory === category.id ? 1.3 : 1,
//                             rotate: hoveredCategory === category.id ? [0, 5, -5, 0] : 0,
//                           }}
//                           transition={{ duration: 0.5 }}
//                           className="text-9xl filter drop-shadow-2xl"
//                         >
//                           {category.icon}
//                         </motion.div>
//                       </div>
                      
//                       <div className="absolute top-4 right-4 glass bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/40">
//                         <span className="text-sm font-bold text-white">
//                           {category.count}
//                         </span>
//                       </div>
                      
//                       <motion.div
//                         className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
//                         animate={{
//                           x: hoveredCategory === category.id ? ['0%', '100%'] : '0%',
//                         }}
//                         transition={{ duration: 0.6 }}
//                         style={{ transform: 'skewX(-20deg)' }}
//                       />
//                     </div>

//                     <div className="p-6 flex-grow flex flex-col bg-white">
//                       <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
//                         {category.name}
//                       </h3>
//                       <p className="text-gray-600 mb-4">
//                         {category.description}
//                       </p>

//                       <div className="mb-4 flex-grow">
//                         <p className="text-sm font-semibold text-gray-700 mb-2">
//                           Popular Products:
//                         </p>
//                         <ul className="space-y-2">
//                           {category.products.map((product, i) => (
//                             <motion.li
//                               key={i}
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: 0.1 * i }}
//                               className="text-sm text-gray-600 flex items-center gap-2"
//                             >
//                               <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
//                               {product}
//                             </motion.li>
//                           ))}
//                         </ul>
//                       </div>

//                       <motion.div
//                         whileHover={{ x: 5 }}
//                         className="flex items-center gap-2 text-primary-500 font-semibold group-hover:gap-4 transition-all"
//                       >
//                         Browse Products
//                         <motion.div
//                           animate={{
//                             x: hoveredCategory === category.id ? [0, 5, 0] : 0,
//                           }}
//                           transition={{
//                             duration: 1,
//                             repeat: Infinity,
//                           }}
//                         >
//                           <FiArrowRight />
//                         </motion.div>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-4 relative z-10">
//         <div className="max-w-7xl mx-auto">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl font-bold text-center mb-12"
//           >
//             Why Choose Our Products?
//           </motion.h2>

//           <div className="grid md:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: '🏆',
//                 title: 'Premium Quality',
//                 description: 'ISO certified products',
//                 color: 'from-yellow-400 to-orange-500',
//               },
//               {
//                 icon: '✅',
//                 title: 'Verified Brands',
//                 description: 'Authentic products only',
//                 color: 'from-green-400 to-emerald-500',
//               },
//               {
//                 icon: '🚚',
//                 title: 'Fast Delivery',
//                 description: 'Quick shipping across India',
//                 color: 'from-blue-400 to-cyan-500',
//               },
//               {
//                 icon: '💯',
//                 title: 'Best Prices',
//                 description: 'Competitive market rates',
//                 color: 'from-pink-400 to-rose-500',
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -5, scale: 1.05 }}
//                 className="relative group"
//               >
//                 <div className="glass bg-white/80 backdrop-blur-lg p-8 rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl border border-gray-100">
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.6 }}
//                     className={`text-5xl mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${feature.color} mx-auto`}
//                   >
//                     <span className="filter drop-shadow-lg">{feature.icon}</span>
//                   </motion.div>
//                   <h3 className="text-lg font-bold mb-2 text-center">{feature.title}</h3>
//                   <p className="text-gray-600 text-sm text-center">{feature.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative py-20 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 180, 360],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
//         />
        
//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <motion.div
//               animate={{
//                 y: [0, -10, 0],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             >
//               <FiPackage className="text-7xl mx-auto mb-6 text-white" />
//             </motion.div>
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{
//               textShadow: '0 10px 30px rgba(0,0,0,0.3)'
//             }}>
//               Can't Find What You're Looking For?
//             </h2>
//             <p className="text-xl mb-8 text-white/90">
//               Contact us for custom solutions and bulk orders
//             </p>
//             <div className="flex gap-4 justify-center flex-wrap">
//               <motion.button
//                 onClick={() => router.push('/contact')}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-white text-teal-600 px-10 py-4 rounded-full font-bold shadow-2xl hover:shadow-white/20 transition-all text-lg"
//               >
//                 Contact Us
//               </motion.button>
//               <motion.button
//                 onClick={() => router.push('/products')}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="glass border-2 border-white/50 backdrop-blur-lg text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-teal-600 transition-all text-lg"
//               >
//                 View All Products
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }





















'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiPackage } from 'react-icons/fi';

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Fix hydration by mounting on client only
  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    {
      id: 'weighing_scale',
      name: 'Weighing Scales',
      description: 'Digital and platform scales for all capacities',
      icon: '⚖️',
      count: '50+ Models',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      hoverGradient: 'from-blue-500 via-blue-600 to-cyan-600',
      products: [
        '30kg Table Top Scales',
        'Platform Scales',
        'Crane Scales',
        'Heavy Duty Scales',
      ],
    },
    {
      id: 'note_counter',
      name: 'Note Counting Machines',
      description: 'Fast and accurate currency counting solutions',
      icon: '💵',
      count: '15+ Models',
      gradient: 'from-green-400 via-green-500 to-emerald-600',
      hoverGradient: 'from-green-500 via-emerald-600 to-teal-600',
      products: [
        'Basic Note Counters',
        'UV Detection Counters',
        'Mix Value Counters',
        'High Speed Counters',
      ],
    },
    {
      id: 'mobile_accessory',
      name: 'Mobile Accessories',
      description: 'Quality phone cases, chargers, and more',
      icon: '📱',
      count: '100+ Items',
      gradient: 'from-purple-400 via-pink-500 to-pink-600',
      hoverGradient: 'from-purple-500 via-pink-600 to-rose-600',
      products: [
        'Phone Cases',
        'Screen Protectors',
        'Chargers & Cables',
        'Power Banks',
      ],
    },
  ];

  // Click handler to navigate programmatically
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stunning Static Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-br from-purple-300/30 to-pink-400/30 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
        
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)
              `,
              backgroundSize: '400% 400%',
            }}
            className="absolute inset-0"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-5xl sm:text-7xl"
              >
                🏪
              </motion.div>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-4" style={{
              textShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}>
              Product Categories
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4" style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              Explore our wide range of weighing scales, note counters, and accessories
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg 
            viewBox="0 0 1440 120" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full"
            style={{ transform: 'translateY(1px)' }}
          >
            <path 
              fill="rgba(249, 250, 251, 1)" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Categories Grid - Mobile Responsive */}
      <section className="py-12 sm:py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(category.id)}
                className="cursor-pointer"
              >
                <div className="group relative h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col backdrop-blur-lg border border-gray-100"
                  >
                    {/* Category Image/Icon Section */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${
                          hoveredCategory === category.id 
                            ? category.hoverGradient 
                            : category.gradient
                        }`}
                        animate={{
                          scale: hoveredCategory === category.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: hoveredCategory === category.id ? 1.3 : 1,
                            rotate: hoveredCategory === category.id ? [0, 5, -5, 0] : 0,
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-6xl sm:text-7xl lg:text-9xl filter drop-shadow-2xl"
                        >
                          {category.icon}
                        </motion.div>
                      </div>
                      
                      {/* Count Badge */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-white/40">
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {category.count}
                        </span>
                      </div>
                      
                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                        animate={{
                          x: hoveredCategory === category.id ? ['0%', '100%'] : '0%',
                        }}
                        transition={{ duration: 0.6 }}
                        style={{ transform: 'skewX(-20deg)' }}
                      />
                    </div>

                    {/* Category Info */}
                    <div className="p-4 sm:p-6 flex-grow flex flex-col bg-white">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-cyan-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      {/* Popular Products */}
                      <div className="mb-4 flex-grow">
                        <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Popular Products:
                        </p>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {category.products.map((product, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * i }}
                              className="text-xs sm:text-sm text-gray-600 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                              <span className="line-clamp-1">{product}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Browse Button */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-cyan-600 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base"
                      >
                        Browse Products
                        <motion.div
                          animate={{
                            x: hoveredCategory === category.id ? [0, 5, 0] : 0,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 px-4"
          >
            Why Choose Our Products?
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              {
                icon: '🏆',
                title: 'Premium Quality',
                description: 'ISO certified products',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: '✅',
                title: 'Verified Brands',
                description: 'Authentic products only',
                color: 'from-green-400 to-emerald-500',
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Quick shipping across India',
                color: 'from-blue-400 to-cyan-500',
              },
              {
                icon: '💯',
                title: 'Best Prices',
                description: 'Competitive market rates',
                color: 'from-pink-400 to-rose-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl border border-gray-100">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${feature.color} mx-auto`}
                  >
                    <span className="filter drop-shadow-lg">{feature.icon}</span>
                  </motion.div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm text-center line-clamp-2">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-400/20 rounded-full blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiPackage className="text-5xl sm:text-6xl lg:text-7xl mx-auto mb-4 sm:mb-6 text-white" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white" style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              Can't Find What You're Looking For?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90">
              Contact us for custom solutions and bulk orders
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
              <motion.button
                onClick={() => router.push('/contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-teal-600 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold shadow-2xl hover:shadow-white/20 transition-all text-sm sm:text-lg"
              >
                Contact Us
              </motion.button>
              <motion.button
                onClick={() => router.push('/products')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white/50 backdrop-blur-lg text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-teal-600 transition-all text-sm sm:text-lg"
              >
                View All Products
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
