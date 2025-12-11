// frontend/src/app/about/page.tsx

'use client';

import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTarget, FiHeart, FiTrendingUp, FiCheckCircle, FiMessageCircle, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function AboutPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (service: string) => {
    const message = getWhatsAppMessage(service);
    const whatsappUrl = `https://wa.me/919825247312?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getWhatsAppMessage = (service: string) => {
    const messages = {
      consultation: "Hi! I'm interested in Expert Consultation for weighing solutions. Can you help me choose the right product?",
      technical: "Hi! I need Technical Support for my weighing scale. Can you assist me?",
      aftersales: "Hi! I'm looking for After-Sales Care services. Can you provide more information?"
    };
    return messages[service as keyof typeof messages] || "Hi! I'm interested in your services.";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        
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
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-green-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
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
              className="text-7xl mb-6"
            >
              🏢
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{
              textShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}>
              About OM Marketing
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto font-medium" style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              Your Trusted Partner in Premium Weighing Solutions Since 2008
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            viewBox="0 0 1440 120" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full"
            style={{ transform: 'translateY(1px)' }}
          >
            <path 
              fill="rgba(249, 250, 251, 0.8)" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Founded in <strong className="text-primary-600">2008</strong>, OM Marketing has been at the forefront of providing high-quality weighing solutions across Gujarat and India.
                  </p>
                  <p>
                    What started as a small family business in Gandhinagar has grown into a trusted name in the weighing scale industry, serving thousands of satisfied customers.
                  </p>
                  <p>
                    With over <strong className="text-primary-600">15+ years</strong> of experience, we pride ourselves on delivering precision, quality, and exceptional customer service.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-xl"
                />
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                      📅
                    </div>
                    <div>
                      <div className="text-3xl font-bold">2008</div>
                      <div className="text-white/80">Year Founded</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                      👥
                    </div>
                    <div>
                      <div className="text-3xl font-bold">5000+</div>
                      <div className="text-white/80">Happy Customers</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                      ⚖️
                    </div>
                    <div>
                      <div className="text-3xl font-bold">200+</div>
                      <div className="text-white/80">Product Models</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiAward className="text-4xl" />,
                title: 'Quality First',
                description: 'ISO certified products meeting highest standards',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: <FiHeart className="text-4xl" />,
                title: 'Customer Focus',
                description: 'Your satisfaction is our top priority',
                color: 'from-red-400 to-pink-500',
              },
              {
                icon: <FiCheckCircle className="text-4xl" />,
                title: 'Integrity',
                description: 'Honest and transparent in all dealings',
                color: 'from-green-400 to-emerald-500',
              },
              {
                icon: <FiTrendingUp className="text-4xl" />,
                title: 'Innovation',
                description: 'Constantly improving our products and services',
                color: 'from-blue-400 to-cyan-500',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50 h-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} text-white flex items-center justify-center shadow-lg`}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose OM Marketing?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '✅',
                title: 'Authorized Dealer',
                description: 'Official dealer for top brands like Phoenix, Citizen, and more',
              },
              {
                icon: '🎯',
                title: 'Wide Product Range',
                description: '200+ models from table-top to heavy-duty industrial scales',
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Quick delivery across Gujarat and all over India',
              },
              {
                icon: '💰',
                title: 'Competitive Pricing',
                description: 'Best prices in the market with regular offers',
              },
              {
                icon: '🔧',
                title: 'After-Sales Support',
                description: 'Comprehensive maintenance and calibration services',
              },
              {
                icon: '🏆',
                title: 'Trusted by Thousands',
                description: '5000+ satisfied customers across various industries',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/50 flex gap-4">
                  <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section - WITH FUNCTIONAL BUTTONS */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-white/50 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <FiUsers className="text-6xl text-primary-500 mx-auto mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our experienced team of sales professionals and technical experts are here to help you find the perfect weighing solution for your needs. With deep industry knowledge and a commitment to customer satisfaction, we ensure you get the best products and services.
              </p>
              
              {/* FUNCTIONAL BUTTONS */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {/* Expert Consultation Button */}
                <motion.button
                  onClick={() => handleServiceClick('consultation')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-br from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  <FiMessageCircle className="group-hover:rotate-12 transition-transform" />
                  Expert Consultation
                </motion.button>

                {/* Technical Support Button */}
                <motion.button
                  onClick={() => handleServiceClick('technical')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-br from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  <FiPhone className="group-hover:rotate-12 transition-transform" />
                  Technical Support
                </motion.button>

                {/* After-Sales Care Button */}
                <motion.button
                  onClick={() => handleServiceClick('aftersales')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-br from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  <FiHeart className="group-hover:scale-110 transition-transform" />
                  After-Sales Care
                </motion.button>
              </div>

              {/* Alternative Contact Methods */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Or reach us directly:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="tel:9825247312"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    <FiPhone className="text-lg" />
                    <span className="font-semibold">98252 47312</span>
                  </a>
                  <a 
                    href="mailto:ommarketing.weighingscale1@gmail.com"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    <FiMail className="text-lg" />
                    <span className="font-semibold">Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
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
          className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
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
              🤝
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              Let's Work Together
            </h2>
            
            <p className="text-xl mb-8 text-white/90 font-medium">
              Partner with us for all your weighing needs
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-teal-700 px-10 py-4 rounded-full font-bold shadow-2xl hover:shadow-white/40 transition-all text-lg"
                >
                  Contact Us
                </motion.button>
              </Link>
              
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-teal-700 transition-all shadow-2xl"
                >
                  Browse Products
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
