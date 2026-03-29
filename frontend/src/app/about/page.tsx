'use client';

import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTarget, FiHeart, FiTrendingUp, FiCheckCircle, FiTruck, FiShield, FiPhone, FiMail, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export default function AboutPage() {
  const handleServiceClick = (service: string) => {
    const messages: Record<string, string> = {
      consultation: "Hi! I'm interested in Expert Consultation for weighing solutions.",
      technical: "Hi! I need Technical Support for my weighing scale.",
      aftersales: "Hi! I'm looking for After-Sales Care services.",
    };
    const msg = messages[service] || "Hi! I'm interested in your services.";
    window.open(`https://wa.me/919825247312?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #0e2f3c 30%, #0d5e52 70%, #0d9488 100%)',
        }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              <span className="text-white/80 text-sm font-medium">Trusted Since 2008</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              About OM Marketing
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Your trusted partner in premium weighing solutions for over 15 years
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Our Story + Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Story — 3 cols */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-3">
              <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Building Trust, One Scale at a Time
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Founded in <strong className="text-gray-800">2008</strong>, OM Marketing has been at the forefront of providing high-quality weighing solutions across Gujarat and India.
                </p>
                <p>
                  What started as a small family business has grown into a trusted name in the weighing scale industry, serving thousands of satisfied customers across various sectors.
                </p>
                <p>
                  With over <strong className="text-gray-800">15+ years</strong> of experience, we pride ourselves on delivering precision, quality, and exceptional customer service with every product.
                </p>
              </div>
            </motion.div>

            {/* Stats Card — 2 cols */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #0e2f3c 30%, #0d5e52 70%, #0d9488 100%)',
              }}>
                <div className="p-8 space-y-6 text-white">
                  {[
                    { value: '2008', label: 'Year Founded', icon: '📅' },
                    { value: '5000+', label: 'Happy Customers', icon: '👥' },
                    { value: '200+', label: 'Product Models', icon: '⚖️' },
                    { value: '15+', label: 'Years Experience', icon: '🏆' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-white/50">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              What Drives Us
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { icon: <FiAward className="text-xl" />, title: 'Quality First', desc: 'ISO certified products meeting highest standards', gradient: 'from-amber-500 to-orange-600' },
              { icon: <FiHeart className="text-xl" />, title: 'Customer Focus', desc: 'Your satisfaction is our top priority', gradient: 'from-rose-500 to-pink-600' },
              { icon: <FiCheckCircle className="text-xl" />, title: 'Integrity', desc: 'Honest and transparent in all dealings', gradient: 'from-emerald-500 to-green-600' },
              { icon: <FiTrendingUp className="text-xl" />, title: 'Innovation', desc: 'Constantly improving our solutions', gradient: 'from-sky-500 to-blue-600' },
            ].map((value, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all h-full">
                  <div className={`w-11 h-11 mb-4 rounded-xl bg-gradient-to-br ${value.gradient} text-white flex items-center justify-center shadow-lg`}>
                    {value.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Advantages</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Why Choose OM Marketing?
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { icon: <FiShield className="text-xl" />, title: 'Authorized Dealer', desc: 'Official dealer for top brands', gradient: 'from-sky-500 to-blue-600' },
              { icon: <FiTarget className="text-xl" />, title: 'Wide Range', desc: '200+ models from table-top to industrial', gradient: 'from-amber-500 to-orange-600' },
              { icon: <FiTruck className="text-xl" />, title: 'Fast Delivery', desc: 'Quick delivery across Gujarat & India', gradient: 'from-emerald-500 to-green-600' },
              { icon: <FiTrendingUp className="text-xl" />, title: 'Competitive Pricing', desc: 'Best prices with regular offers', gradient: 'from-violet-500 to-purple-600' },
              { icon: <FiCheckCircle className="text-xl" />, title: 'After-Sales Support', desc: 'Maintenance & calibration services', gradient: 'from-rose-500 to-pink-600' },
              { icon: <FiUsers className="text-xl" />, title: 'Trusted by Thousands', desc: '5000+ satisfied customers', gradient: 'from-teal-500 to-cyan-600' },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team / Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Dedicated Professionals
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our experienced team is here to help you find the perfect weighing solution. Deep industry knowledge with commitment to satisfaction.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { label: 'Expert Consultation', icon: <FiMessageCircle />, color: 'from-sky-500 to-blue-600', service: 'consultation' },
              { label: 'Technical Support', icon: <FiPhone />, color: 'from-emerald-500 to-green-600', service: 'technical' },
              { label: 'After-Sales Care', icon: <FiHeart />, color: 'from-violet-500 to-purple-600', service: 'aftersales' },
            ].map((btn, i) => (
              <motion.button
                key={i}
                variants={fadeInUp}
                onClick={() => handleServiceClick(btn.service)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-2 bg-gradient-to-br ${btn.color} text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all`}
              >
                {btn.icon}
                {btn.label}
              </motion.button>
            ))}
          </motion.div>

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-3">Or reach us directly:</p>
            <div className="flex justify-center gap-4">
              <a href="tel:9825247312" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors">
                <FiPhone className="text-sm" /> 98252 47312
              </a>
              <a href="mailto:ommarketing.weighingscale1@gmail.com" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors">
                <FiMail className="text-sm" /> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #0e2f3c 30%, #0d5e52 70%, #0d9488 100%)',
            }} />
            <div className="relative z-10 text-center py-16 px-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                Let&apos;s Work Together
              </h2>
              <p className="text-lg mb-10 text-white/60 max-w-xl mx-auto">
                Partner with us for all your weighing needs
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}
                    className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-xl text-base"
                  >
                    Contact Us
                  </motion.button>
                </Link>
                <Link href="/products">
                  <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}
                    className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-white/20 transition-all"
                  >
                    Browse Products
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
