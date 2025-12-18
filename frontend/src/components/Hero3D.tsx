// // frontend/src/components/Hero3D.tsx

// 'use client';

// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import { FiPhone, FiMail, FiAward } from 'react-icons/fi';
// import Link from 'next/link';

// export default function Hero3D() {
//   const [particles, setParticles] = useState<Array<{ x: number; delay: number }>>([]);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     const generatedParticles = Array.from({ length: 20 }, () => ({
//       x: Math.random() * 100,
//       delay: Math.random() * 10,
//     }));
//     setParticles(generatedParticles);
//     setMounted(true);
//   }, []);

//   return (
//     <section className="w-full h-[600px] md:h-[700px] relative overflow-hidden">
//       {/* Base Gradient - Strong Visible Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-500" />
      
//       {/* Animated Pattern Overlay */}
//       <div className="absolute inset-0">
//         <motion.div
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `
//               radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%),
//               radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
//               radial-gradient(circle at 40% 20%, rgba(255,255,255,0.25) 0%, transparent 50%)
//             `,
//             backgroundSize: '200% 200%',
//           }}
//         />
//       </div>
      
//       {/* Visible Floating Orbs */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Orb 1 - Top Left - HIGHLY VISIBLE */}
//         <motion.div
//           animate={{
//             x: [0, 100, 0],
//             y: [0, -50, 0],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full"
//           style={{
//             background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(14, 165, 233, 0.3) 50%, transparent 100%)',
//             filter: 'blur(60px)',
//           }}
//         />
        
//         {/* Orb 2 - Bottom Right - HIGHLY VISIBLE */}
//         <motion.div
//           animate={{
//             x: [0, -80, 0],
//             y: [0, 60, 0],
//             scale: [1, 1.3, 1],
//           }}
//           transition={{
//             duration: 18,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full"
//           style={{
//             background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, rgba(16, 185, 129, 0.25) 50%, transparent 100%)',
//             filter: 'blur(70px)',
//           }}
//         />
        
//         {/* Orb 3 - Center - VISIBLE */}
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
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
//           style={{
//             background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
//             filter: 'blur(50px)',
//           }}
//         />
//       </div>
      
//       {/* Grid Pattern - Subtle but Visible */}
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
//             linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px'
//         }}
//       />
      
//       {/* Floating Particles */}
//       {mounted && (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {particles.map((particle, i) => (
//             <motion.div
//               key={i}
//               initial={{ 
//                 y: '110%', 
//                 x: `${particle.x}%`,
//                 opacity: 0 
//               }}
//               animate={{
//                 y: '-10%',
//                 opacity: [0, 1, 1, 0],
//               }}
//               transition={{
//                 duration: 10 + particle.delay,
//                 repeat: Infinity,
//                 delay: i * 0.4,
//                 ease: "linear"
//               }}
//               className="absolute w-2 h-2 bg-white rounded-full"
//               style={{
//                 boxShadow: '0 0 20px 4px rgba(255,255,255,0.8)',
//                 left: `${particle.x}%`,
//               }}
//             />
//           ))}
//         </div>
//       )}
      
//       {/* Content */}
//       <div className="absolute inset-0 flex items-center justify-center z-10">
//         <div className="text-center px-4 max-w-5xl">
//           {/* Animated Icon */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ 
//               duration: 0.8,
//               type: "spring",
//               stiffness: 100
//             }}
//             className="mb-6"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -15, 0],
//                 rotate: [0, 3, -3, 0],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               className="text-8xl md:text-9xl inline-block relative"
//             >
//               <div className="absolute inset-0 blur-3xl bg-white/40 scale-150" />
//               <span className="relative filter drop-shadow-2xl">⚖️</span>
//             </motion.div>
//           </motion.div>
          
//           {/* Heading */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4"
//             style={{
//               textShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.15)',
//               letterSpacing: '-0.02em'
//             }}
//           >
//             OM Marketing
//           </motion.h1>
          
//           {/* Subtitle */}
//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 font-light"
//             style={{
//               textShadow: '0 4px 20px rgba(0,0,0,0.4)'
//             }}
//           >
//             Premium Weighing Solutions Since 2008
//           </motion.p>
          
//           {/* Badge - FIXED COLORS */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="inline-flex items-center gap-2 mb-8"
//           >
//             <div className="backdrop-blur-md bg-white/20 px-5 py-2.5 rounded-full border-2 border-white/50 shadow-2xl">
//               <span className="text-white font-bold text-base md:text-lg flex items-center gap-2">
//                 🏆 <span className="hidden sm:inline">15+ Years -</span> ISO 9001:2008 Certified
//               </span>
//             </div>
//           </motion.div>
          
//           {/* CTA Buttons - FIXED COLORS */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="flex gap-3 md:gap-4 justify-center flex-wrap mb-6 md:mb-8"
//           >
//             {/* Explore Products Button - WHITE BACKGROUND */}
//             <Link href="/products">
//               <motion.button
//                 whileHover={{ scale: 1.05, y: -3 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group relative bg-white text-teal-600 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl cursor-pointer inline-flex items-center gap-3 overflow-hidden"
//               >
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 />
//                 <span className="relative z-10 group-hover:text-white transition-colors">
//                   Explore Products
//                 </span>
//                 <motion.span
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                   className="relative z-10 text-xl group-hover:text-white transition-colors"
//                 >
//                   →
//                 </motion.span>
//               </motion.button>
//             </Link>
            
//             {/* Contact Us Button - SEMI-TRANSPARENT WITH BORDER */}
//             <Link href="/contact">
//               <motion.button
//                 whileHover={{ scale: 1.05, y: -3 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="backdrop-blur-md bg-white/15 border-2 border-white/60 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white hover:text-teal-600 transition-all cursor-pointer inline-flex items-center gap-3 shadow-2xl"
//               >
//                 <FiPhone className="text-xl" />
//                 <span>Contact Us</span>
//               </motion.button>
//             </Link>
//           </motion.div>
          
//           {/* Contact Info - FIXED COLORS */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1 }}
//             className="flex gap-3 md:gap-4 justify-center flex-wrap"
//           >
//             {/* Phone Button - GREEN BACKGROUND */}
//             <a 
//               href="tel:9825247312" 
//               className="group"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-green-500 hover:bg-green-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-colors inline-flex items-center gap-2 shadow-xl"
//               >
//                 <FiPhone className="group-hover:animate-bounce" />
//                 <span className="font-medium">98252 47312</span>
//               </motion.button>
//             </a>
            
//             {/* Get Quote Button - BLUE BACKGROUND */}
//             <Link href="/contact">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-colors inline-flex items-center gap-2 shadow-xl"
//               >
//                 <FiMail />
//                 <span className="font-medium">Get a Quote</span>
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>
//       </div>
      
//       {/* Wave Transition */}
//       <div className="absolute bottom-0 left-0 right-0 z-20">
//         <svg 
//           viewBox="0 0 1440 120" 
//           xmlns="http://www.w3.org/2000/svg" 
//           className="w-full h-auto"
//           preserveAspectRatio="none"
//           style={{ display: 'block' }}
//         >
//           <path 
//             fill="#f9fafb" 
//             d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
//           />
//         </svg>
//       </div>
//     </section>
//   );
// }



























// frontend/src/components/Hero3D.tsx

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import Link from 'next/link';

export default function Hero3D() {
  const [particles, setParticles] = useState<Array<{ x: number; delay: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      delay: Math.random() * 10,
    }));
    setParticles(generatedParticles);
    setMounted(true);
  }, []);

  return (
    <section className="w-full h-[600px] md:h-[700px] relative overflow-hidden">
      {/* Base Gradient - Strong Visible Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-500" />
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(255,255,255,0.25) 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
          }}
        />
      </div>
      
      {/* Visible Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orb 1 - Top Left */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(14, 165, 233, 0.3) 50%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Orb 2 - Bottom Right */}
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, rgba(16, 185, 129, 0.25) 50%, transparent 100%)',
            filter: 'blur(70px)',
          }}
        />
        
        {/* Orb 3 - Center */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: '110%', 
                x: `${particle.x}%`,
                opacity: 0 
              }}
              animate={{
                y: '-10%',
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 10 + particle.delay,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear"
              }}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                boxShadow: '0 0 20px 4px rgba(255,255,255,0.8)',
                left: `${particle.x}%`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-5xl">
          {/* Animated Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="mb-6"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl md:text-9xl inline-block relative"
            >
              <div className="absolute inset-0 blur-3xl bg-white/40 scale-150" />
              <span className="relative filter drop-shadow-2xl">⚖️</span>
            </motion.div>
          </motion.div>
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4"
            style={{
              textShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 80px rgba(255,255,255,0.15)',
              letterSpacing: '-0.02em'
            }}
          >
            OM Marketing
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 font-light"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}
          >
            Premium Weighing Solutions Since 2008
          </motion.p>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="backdrop-blur-md bg-white/20 px-5 py-2.5 rounded-full border-2 border-white/50 shadow-2xl">
              <span className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                🏆 <span className="hidden sm:inline">15+ Years -</span> ISO 9001:2008 Certified
              </span>
            </div>
          </motion.div>
          
          {/* CTA Buttons - ALL SOLID VISIBLE COLORS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-3 md:gap-4 justify-center flex-wrap mb-6 md:mb-8"
          >
            {/* Explore Products Button - WHITE BACKGROUND */}
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-white text-teal-600 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl cursor-pointer inline-flex items-center gap-3 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Explore Products
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10 text-xl group-hover:text-white transition-colors"
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
            
            {/* Contact Us Button - SOLID ORANGE BACKGROUND (FIXED) */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl cursor-pointer inline-flex items-center gap-3 transition-colors"
              >
                <FiPhone className="text-xl" />
                <span>Contact Us</span>
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Contact Info - SOLID COLORS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-3 md:gap-4 justify-center flex-wrap"
          >
            {/* Phone Button - GREEN BACKGROUND */}
            <a 
              href="tel:9825247312" 
              className="group"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-colors inline-flex items-center gap-2 shadow-xl"
              >
                <FiPhone className="group-hover:animate-bounce" />
                <span className="font-medium">98252 47312</span>
              </motion.button>
            </a>
            
            {/* Get Quote Button - BLUE BACKGROUND */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-colors inline-flex items-center gap-2 shadow-xl"
              >
                <FiMail />
                <span className="font-medium">Get a Quote</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg 
          viewBox="0 0 1440 120" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path 
            fill="#f9fafb" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
