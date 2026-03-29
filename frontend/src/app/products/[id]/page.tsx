'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCheck, FiArrowLeft, FiPhone, FiMail, FiMessageCircle, FiShield, FiTruck, FiBox } from 'react-icons/fi';
import { productApi } from '@/services/api';

// --- STUNNING 3D BACKGROUND COMPONENT ---
const DynamicBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0f172a]">
      {/* Deep Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-[#0f172a] to-black" />
      
      {/* 3D Floating Orbs */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/20 blur-[120px]"
      />
      <motion.div 
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-500/10 blur-[150px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-cyan-400/10 blur-[100px]"
      />

      {/* Grid Pattern overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          transformOrigin: 'top center'
        }}
      />
    </div>
  );
};

function ProductDetailContent() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await productApi.getById(productId);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    }
    if (productId) fetchProduct();
  }, [productId]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="relative w-24 h-24">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-4 border-b-4 border-teal-500 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-l-4 border-r-4 border-cyan-400 rounded-full"
          />
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-600">Product Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{error}</p>
          <Link href="/products">
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-medium transition-all backdrop-blur-md">
              Browse All Products
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  let specifications: Record<string, string> = {};
  if (product.specifications) {
    try {
      specifications = JSON.parse(product.specifications);
    } catch {
      const specs = product.specifications.split(',').map((s: string) => s.trim());
      specifications = { 'Details': specs.join(', ') };
    }
  }

  // Create a gallery array (in a real app, this comes from backend)
  const images = [
    product.image_url || '/images/placeholder.jpg',
    '/images/placeholder.jpg',
    '/images/placeholder.jpg',
    '/images/placeholder.jpg'
  ];
  
  return (
    <div className="min-h-screen relative text-slate-100 overflow-hidden">
      <DynamicBackground />
      
      <div className="relative z-10 pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb / Back Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/products" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <FiArrowLeft /> Back to Collection
          </Link>
        </motion.div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: 3D Product Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
            style={{ perspective: 1000 }} // Enable 3D perspective
          >
            <motion.div 
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(20,184,166,0.15)] flex items-center justify-center p-8 group"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8 drop-shadow-2xl transition-transform duration-700 ease-in-out group-hover:scale-105"
                priority
              />
              
              {/* Floating Badges */}
              {product.stock_quantity === 0 && (
                <div className="absolute top-6 left-6 bg-rose-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-rose-500/30">
                  Out of Stock
                </div>
              )}
              <div className="absolute top-6 right-6 bg-teal-500/20 text-teal-300 border border-teal-500/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                {product.category.replace('_', ' ')}
              </div>
            </motion.div>
            
            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                    activeImage === idx 
                      ? 'border-2 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.3)] bg-white/10' 
                      : 'border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 12vw"
                    className="object-contain p-3"
                  />
                </button>
              ))}
            </div>
          </motion.div>
          
          
          {/* RIGHT: Product Information (Glassmorphism Panel) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col h-full"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden flex-1">
              
              {/* Internal Glass Highlight */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight relative z-10">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-end gap-4 mb-8 relative z-10 pb-8 border-b border-white/10">
                <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-300">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-400 line-through text-2xl font-medium mb-1">
                  ₹{(product.price * 1.2).toLocaleString('en-IN')}
                </span>
                <span className="bg-teal-500/20 border border-teal-500/30 text-teal-300 px-3 py-1.5 rounded-lg text-sm font-bold tracking-wide mb-2">
                  SAVE 20%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-teal-400">
                    <FiCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    <p className="text-xs text-slate-400">Ready to ship</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-400">
                    <FiShield size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">1 Year Warranty</p>
                    <p className="text-xs text-slate-400">100% Guaranteed</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8 relative z-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Description</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {product.description || 'Premium precision weighing solution built for durability and exact measurements in commercial environments.'}
                </p>
              </div>
              
              {/* Premium Specs Grid */}
              {Object.keys(specifications).length > 0 && (
                <div className="mb-10 relative z-10">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                          {key.replace('_', ' ')}
                        </p>
                        <p className="font-semibold text-white">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Ultimate CTA Buttons */}
              <div className="space-y-4 relative z-10 mt-auto">
                <a
                  href={`https://wa.me/919825247312?text=${encodeURIComponent(`Hi! I'm interested in the ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#16a34a' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(37,211,102,0.3)]"
                  >
                    <FiMessageCircle size={24} />
                    Inquire on WhatsApp
                  </motion.button>
                </a>
                
                <div className="grid grid-cols-2 gap-4">
                  <a href="tel:9825247312" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                      <FiPhone size={20} /> Call Us
                    </motion.button>
                  </a>
                  <Link href="/contact" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(8,145,178,0.3)]"
                    >
                      <FiMail size={20} /> Email Us
                    </motion.button>
                  </Link>
                </div>
              </div>
              
            </div>
            
            {/* Premium Promise Strip below Card */}
            <div className="mt-8 flex justify-center gap-4 sm:gap-8 text-slate-400 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-2"><FiTruck className="text-teal-400" /> Fast Delivery</span>
              <span className="flex items-center gap-2"><FiShield className="text-teal-400" /> Secure Payment</span>
              <span className="flex items-center gap-2"><FiBox className="text-teal-400" /> Authentic Product</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  )
}
