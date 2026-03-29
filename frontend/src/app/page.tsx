'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiTrendingUp, FiAward, FiTruck, FiArrowRight } from 'react-icons/fi';
import Hero3D from '@/components/Hero3D';
import { useProducts } from '@/hooks/useProducts';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

export default function HomePage() {
  const { products: featuredProducts, isLoading } = useProducts({ limit: 6 });

  return (
    <main className="min-h-screen bg-white">
      <Hero3D />

      {/* Featured Products Section */}
      <section id="products" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Our Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Featured Products
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Discover our most popular precision weighing solutions trusted by businesses across India
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                  <div className="aspect-square skeleton-shimmer" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 skeleton-shimmer rounded-lg w-3/4" />
                    <div className="h-4 skeleton-shimmer rounded-lg w-1/2" />
                    <div className="h-10 skeleton-shimmer rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProducts.map((product, index) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <Link href={`/products/${product.id}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 cursor-pointer h-full flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gray-50 overflow-hidden">
                        <Image
                          src={product.image_url || '/images/placeholder.jpg'}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          loading={index < 3 ? 'eager' : 'lazy'}
                          priority={index < 3}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder.jpg';
                          }}
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 capitalize shadow-sm">
                          {product.category.replace('_', ' ')}
                        </div>

                        {product.stock_quantity === 0 && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Out of Stock
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-teal-700 transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-sm text-gray-400 line-through ml-2">
                              ₹{(product.price * 1.2).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                            <FiArrowRight className="text-teal-600 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2"
              >
                View All Products
                <FiArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Why Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Choose OM Marketing?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Your trusted partner for precision weighing solutions since 2008
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <FiAward className="text-2xl" />,
                title: 'ISO Certified',
                description: 'Quality assured products meeting international standards',
                gradient: 'from-sky-500 to-blue-600',
              },
              {
                icon: <FiTruck className="text-2xl" />,
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping across India',
                gradient: 'from-emerald-500 to-green-600',
              },
              {
                icon: <FiTrendingUp className="text-2xl" />,
                title: '15+ Years',
                description: 'Trusted experience in weighing solutions',
                gradient: 'from-violet-500 to-purple-600',
              },
              {
                icon: <FiShoppingBag className="text-2xl" />,
                title: 'Wide Range',
                description: 'Comprehensive product selection for all needs',
                gradient: 'from-amber-500 to-orange-600',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all h-full">
                  <div className={`w-12 h-12 mb-5 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section id="categories" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <span className="inline-block text-teal-600 font-bold text-sm tracking-widest uppercase mb-3">
              BROWSE
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-gray-500 text-lg font-medium">Find exactly what you need</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: (
                  <svg className="w-8 h-8 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18M3 10l4-4 4 4M15 10l4-4 4 4M7 21h10"/>
                    <circle cx="7" cy="14" r="4"/><circle cx="17" cy="14" r="4"/>
                  </svg>
                ),
                title: 'Weighing Scales',
                desc: 'Industrial, commercial, and retail weighing solutions',
                count: '50+ Models',
                bgClass: 'bg-[#008B8B]', // Deep teal
                link: '/products?category=weighing_scale',
              },
              {
                icon: <span className="text-3xl">💰</span>,
                title: 'Note Counters',
                desc: 'High-speed currency counting with fake detection',
                count: '15+ Models',
                bgClass: 'bg-[#00A35C]', // Rich emerald
                link: '/products?category=note_counter',
              },
              {
                icon: <span className="text-3xl">📱</span>,
                title: 'Accessories',
                desc: 'Mobile accessories, parts, and components',
                count: '100+ Items',
                bgClass: 'bg-[#8A2BE2]', // Vivid purple
                link: '/products?category=mobile_accessory',
              },
            ].map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={category.link}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`relative ${category.bgClass} rounded-[2rem] p-8 h-80 overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl flex flex-col justify-between`}
                  >
                    {/* Top Row: Icon & Badge */}
                    <div className="flex justify-between items-start relative z-10">
                      <div className="text-black/60 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-wide">
                        {category.count}
                      </div>
                    </div>

                    {/* Bottom Row: Info */}
                    <div className="relative z-10 mt-auto">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                      <p className="text-white/80 text-sm mb-4 leading-relaxed font-medium pr-4">{category.desc}</p>
                      <div className="flex items-center gap-2 text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                        Browse Products
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #0e2f3c 30%, #0d5e52 70%, #0d9488 100%)',
            }} />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />

            <div className="relative z-10 text-center py-16 px-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-10 text-white/60 max-w-xl mx-auto">
                Contact us for custom solutions, bulk orders, and competitive pricing
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-base"
                  >
                    Contact Us
                  </motion.button>
                </Link>
                <a href="tel:9825247312">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all text-base"
                  >
                    Call: 98252 47312
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
