'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiTrendingUp, FiAward, FiTruck } from 'react-icons/fi';
import Hero3D from '@/components/Hero3D';
import { productApi } from '@/services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const products = await productApi.getAll({ limit: 6 });
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedProducts();
  }, []);

  const getPlaceholderDataURL = () => {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzlhYTBhNiI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=";
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section - No changes needed (Hero3D handles its own spacing) */}
      <Hero3D />

      {/* Featured Products Section - ✅ UPDATED */}
      <section id="products" className="relative pt-24 sm:pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50" />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular weighing solutions
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/products/${product.id}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
                    >
                      <div className="relative aspect-square rounded-2xl overflow-hidden">
                        <Image
                          src={product.image_url || '/images/placeholder.jpg'}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading={index < 3 ? "eager" : "lazy"}
                          priority={index < 3}
                          placeholder="blur"
                          blurDataURL={getPlaceholderDataURL()}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder.jpg';
                          }}
                        />
                        
                        <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize z-10">
                          {product.category.replace('_', ' ')}
                        </div>

                        {product.stock_quantity === 0 && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                            Out of Stock
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                          {product.description}
                        </p>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-bold text-primary-500">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-gray-500 line-through text-sm">
                            ₹{(product.price * 1.2).toLocaleString('en-IN')}
                          </span>
                          <span className="ml-auto bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            Save 20%
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiShoppingBag />
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3"
              >
                View All Products
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section - ✅ UPDATED */}
      <section className="relative pt-20 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-teal-50 to-cyan-50" />
        
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
          className="absolute top-10 right-10 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose OM Marketing?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for precision weighing solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiAward className="text-4xl" />,
                title: 'ISO Certified',
                description: 'Quality assured products meeting international standards',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <FiTruck className="text-4xl" />,
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping across India',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: <FiTrendingUp className="text-4xl" />,
                title: '15+ Years',
                description: 'Trusted experience in weighing solutions',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: <FiShoppingBag className="text-4xl" />,
                title: 'Wide Range',
                description: 'Comprehensive product selection for all needs',
                color: 'from-orange-500 to-red-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg group-hover:shadow-2xl`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category Section - ✅ UPDATED with id="categories" */}
      <section id="categories" className="relative pt-20 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" />
        
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-pink-300/30 rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you need</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Weighing Scales Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/products?category=weighing_scale">
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 h-80 overflow-hidden group cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold">
                    50+ Models
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform">
                      ⚖️
                    </div>
                    
                    <div className="mt-auto text-white">
                      <h3 className="text-2xl font-bold mb-2">Weighing Scales</h3>
                      <p className="text-blue-100 mb-4">Explore our range of weighing scales</p>
                      <div className="flex items-center gap-2 font-semibold">
                        Browse →
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>

            {/* Note Counters Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/products?category=note_counter">
                <div className="relative bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 h-80 overflow-hidden group cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold">
                    15+ Models
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform">
                      💵
                    </div>
                    
                    <div className="mt-auto text-white">
                      <h3 className="text-2xl font-bold mb-2">Note Counters</h3>
                      <p className="text-green-100 mb-4">Explore our range of note counters</p>
                      <div className="flex items-center gap-2 font-semibold">
                        Browse →
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>

            {/* Accessories Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/products?category=accessories">
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-700 rounded-3xl p-8 h-80 overflow-hidden group cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold">
                    100+ Items
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform">
                      📱
                    </div>
                    
                    <div className="mt-auto text-white">
                      <h3 className="text-2xl font-bold mb-2">Accessories</h3>
                      <p className="text-purple-100 mb-4">Explore our range of accessories</p>
                      <div className="flex items-center gap-2 font-semibold">
                        Browse →
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - ✅ UPDATED with id="contact" */}
      <section id="contact" className="relative pt-20 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600" />
        
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
          className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
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
              className="text-7xl mb-6"
            >
              📞
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Contact us for custom solutions and bulk orders
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-teal-600 px-10 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-white/20 transition-all text-lg"
                >
                  Contact Us
                </motion.button>
              </Link>
              <a href="tel:9825247312">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/15 backdrop-blur-md border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-teal-600 transition-all shadow-2xl text-lg"
                >
                  Call: 98252 47312
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
