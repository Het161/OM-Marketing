'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FiAward, FiUsers, FiTarget, FiHeart, FiTrendingUp,
  FiCheckCircle, FiTruck, FiShield, FiPhone, FiMail, FiMessageCircle,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

/* ── Animated count-up ──────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.8, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const ms = duration * 1000;
    const frame = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(frame);
      else setCount(target);
    };
    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [target, duration, trigger]);
  return count;
}

function StatNumber({ target, suffix = '', delay = 0, trigger = true }: {
  target: number; suffix?: string; delay?: number; trigger?: boolean;
}) {
  const [started, setStarted] = useState(false);
  const count = useCountUp(target, 1.8, started);
  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [trigger, delay]);
  return <>{count}{suffix}</>;
}

/* ── Animation variants ─────────────────────────────────────────── */
const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
};

const fadeInLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: E } },
};

const fadeInRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: E } },
};

const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ── Milestone timeline data ────────────────────────────────────── */
const milestones = [
  { year: '2008', title: 'Founded', desc: 'OM Marketing established in Gujarat', color: 'bg-teal-500' },
  { year: '2012', title: 'ISO Certified', desc: 'Received ISO 9001:2008 certification', color: 'bg-blue-500' },
  { year: '2016', title: '1000+ Customers', desc: 'Crossed 1000 satisfied customers', color: 'bg-violet-500' },
  { year: '2020', title: 'Digital Expansion', desc: 'Launched online ordering platform', color: 'bg-amber-500' },
  { year: '2024', title: '5000+ Clients', desc: 'Serving 5000+ happy customers across India', color: 'bg-emerald-500' },
];

/* ── Page ───────────────────────────────────────────────────────── */
export default function AboutPage() {
  const statsRef  = useRef<HTMLDivElement>(null);
  const inView    = useInView(statsRef, { once: true, margin: '-60px' });

  const handleServiceClick = (service: string) => {
    const messages: Record<string, string> = {
      consultation: "Hi! I'm interested in Expert Consultation for weighing solutions.",
      technical:    "Hi! I need Technical Support for my weighing scale.",
      aftersales:   "Hi! I'm looking for After-Sales Care services.",
    };
    const msg = messages[service] || "Hi! I'm interested in your services.";
    window.open(`https://wa.me/919825247312?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero — split layout ─────────────────────────────────── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(-45deg, #0f172a, #0c3644, #0d5e52, #0d9488)',
            backgroundSize: '400% 400%',
          }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right,  rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 40%, rgba(6,182,212,0.5) 0%, transparent 60%)' }}
        />

        <div className="max-w-5xl mx-auto relative z-10 px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left — staggered line reveals */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="text-white/80 text-sm font-medium">Trusted Since 2008</span>
                </div>
              </motion.div>

              {['About', 'OM Marketing'].map((line, i) => (
                <motion.div key={i} variants={fadeInUp} className="overflow-hidden">
                  <h1 className={`font-bold tracking-tight ${
                    i === 0
                      ? 'text-4xl md:text-5xl text-white'
                      : 'text-4xl md:text-5xl bg-gradient-to-r from-teal-300 to-cyan-200 bg-clip-text text-transparent'
                  }`}>
                    {line}
                  </h1>
                </motion.div>
              ))}

              <motion.p variants={fadeInUp} className="text-lg text-white/60 mt-4 max-w-sm">
                Your trusted partner in premium weighing solutions for over 15 years
              </motion.p>
            </motion.div>

            {/* Right — decorative card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex flex-col gap-4"
            >
              {[
                { icon: '🏆', label: 'ISO 9001:2008 Certified' },
                { icon: '⚖️', label: '200+ Product Models' },
                { icon: '👥', label: '5000+ Happy Customers' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/15"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white font-semibold">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Story + Animated Stats ──────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Story */}
            <motion.div
              variants={fadeInLeft} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Building Trust, One Scale at a Time
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Founded in <strong className="text-gray-800">2008</strong>, OM Marketing has been at the forefront of providing
                  high-quality weighing solutions across Gujarat and India.
                </p>
                <p>
                  What started as a small family business has grown into a trusted name in the weighing scale industry,
                  serving thousands of satisfied customers across various sectors.
                </p>
                <p>
                  With over <strong className="text-gray-800">15+ years</strong> of experience, we pride ourselves on delivering
                  precision, quality, and exceptional customer service with every product.
                </p>
              </div>
            </motion.div>

            {/* Animated Stats Card */}
            <motion.div
              ref={statsRef}
              variants={fadeInRight} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0e2f3c 30%, #0d5e52 70%, #0d9488 100%)' }}
              >
                <div className="p-8 space-y-6 text-white">
                  {[
                    { value: 2008, suffix: '', label: 'Year Founded',      icon: '📅', duration: 1.5 },
                    { value: 5000, suffix: '+', label: 'Happy Customers',  icon: '👥', duration: 2.0 },
                    { value: 200,  suffix: '+', label: 'Product Models',   icon: '⚖️', duration: 1.6 },
                    { value: 15,   suffix: '+', label: 'Years Experience', icon: '🏆', duration: 1.2 },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0"
                      >
                        {stat.icon}
                      </motion.div>
                      <div>
                        <div className="text-2xl font-bold tabular-nums">
                          <StatNumber
                            target={stat.value}
                            suffix={stat.suffix}
                            delay={i * 0.15}
                            trigger={inView}
                          />
                        </div>
                        <div className="text-sm text-white/50">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Milestone Timeline ──────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Our Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[1.6rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-teal-500 via-blue-400 to-transparent hidden sm:block" />

            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-5 items-start"
                >
                  {/* Dot */}
                  <motion.div
                    whileInView={{ scale: [0.5, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                    className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg z-10`}
                  >
                    {m.year.slice(-2)}
                  </motion.div>
                  {/* Content */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-teal-600 font-bold text-sm">{m.year}</span>
                      <h3 className="text-base font-bold text-gray-900">{m.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ─────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">What Drives Us</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { icon: <FiAward className="text-xl" />,        title: 'Quality First',    desc: 'ISO certified products meeting highest standards', gradient: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.2)' },
              { icon: <FiHeart className="text-xl" />,        title: 'Customer Focus',   desc: 'Your satisfaction is our top priority',           gradient: 'from-rose-500 to-pink-600',   glow: 'rgba(244,63,94,0.2)' },
              { icon: <FiCheckCircle className="text-xl" />,  title: 'Integrity',        desc: 'Honest and transparent in all dealings',          gradient: 'from-emerald-500 to-green-600', glow: 'rgba(16,185,129,0.2)' },
              { icon: <FiTrendingUp className="text-xl" />,   title: 'Innovation',       desc: 'Constantly improving our solutions',              gradient: 'from-sky-500 to-blue-600',    glow: 'rgba(14,165,233,0.2)' },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: `0 20px 50px ${value.glow}` }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all h-full">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-11 h-11 mb-4 rounded-xl bg-gradient-to-br ${value.gradient} text-white flex items-center justify-center shadow-lg`}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Advantages</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Why Choose OM Marketing?
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { icon: <FiShield className="text-xl" />,      title: 'Authorized Dealer',   desc: 'Official dealer for top brands',               gradient: 'from-sky-500 to-blue-600' },
              { icon: <FiTarget className="text-xl" />,      title: 'Wide Range',          desc: '200+ models from table-top to industrial',     gradient: 'from-amber-500 to-orange-600' },
              { icon: <FiTruck className="text-xl" />,       title: 'Fast Delivery',       desc: 'Quick delivery across Gujarat & India',        gradient: 'from-emerald-500 to-green-600' },
              { icon: <FiTrendingUp className="text-xl" />,  title: 'Competitive Pricing', desc: 'Best prices with regular offers',              gradient: 'from-violet-500 to-purple-600' },
              { icon: <FiCheckCircle className="text-xl" />, title: 'After-Sales Support', desc: 'Maintenance & calibration services',           gradient: 'from-rose-500 to-pink-600' },
              { icon: <FiUsers className="text-xl" />,       title: 'Trusted by Thousands',desc: '5000+ satisfied customers',                   gradient: 'from-teal-500 to-cyan-600' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6, x: 3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all flex items-start gap-4 h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center shadow-sm flex-shrink-0`}
                  >
                    {feature.icon}
                  </motion.div>
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

      {/* ── Team / Services ─────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-3">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Dedicated Professionals
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our experienced team is here to help you find the perfect weighing solution.
              Deep industry knowledge with commitment to satisfaction.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { label: 'Expert Consultation', icon: <FiMessageCircle />, color: 'from-sky-500 to-blue-600',     service: 'consultation' },
              { label: 'Technical Support',   icon: <FiPhone />,         color: 'from-emerald-500 to-green-600', service: 'technical' },
              { label: 'After-Sales Care',    icon: <FiHeart />,         color: 'from-violet-500 to-purple-600', service: 'aftersales' },
            ].map((btn, i) => (
              <motion.button
                key={i}
                variants={fadeInUp}
                onClick={() => handleServiceClick(btn.service)}
                whileHover={{ scale: 1.05, y: -3 }}
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
              <a href="tel:9825247312" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors link-underline">
                <FiPhone className="text-sm" /> 98252 47312
              </a>
              <a href="mailto:ommarketing.weighingscale1@gmail.com" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors link-underline">
                <FiMail className="text-sm" /> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div
              className="absolute inset-0 animate-gradient"
              style={{
                background: 'linear-gradient(-45deg, #0f172a, #0c3644, #0d5e52, #0d9488)',
                backgroundSize: '400% 400%',
              }}
            />
            <div className="relative z-10 text-center py-16 px-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                Let&apos;s Work Together
              </h2>
              <p className="text-lg mb-10 text-white/60 max-w-xl mx-auto">
                Partner with us for all your weighing needs
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-xl text-base animate-glow-pulse"
                  >
                    Contact Us
                  </motion.button>
                </Link>
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
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
