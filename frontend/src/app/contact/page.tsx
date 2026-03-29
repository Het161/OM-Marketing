'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiSend, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.detail || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to send message. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              <span className="text-white/80 text-sm font-medium">We&apos;d love to hear from you</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Get in touch with our team for inquiries, custom orders, and support
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Contact Form — 3 cols */}
            <motion.div
              variants={fadeInUp} initial="hidden" animate="visible"
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1.5">Name</label>
                      <input
                        type="text" id="name" name="name"
                        value={formData.name} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1.5">Phone</label>
                    <input
                      type="tel" id="phone" name="phone"
                      value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-all"
                      placeholder="+91 98252 47312"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1.5">Message</label>
                    <textarea
                      id="message" name="message"
                      value={formData.message} onChange={handleChange} required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {success && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium"
                    >
                      ✓ Message sent successfully! We&apos;ll get back to you soon.
                    </motion.div>
                  )}

                  {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="spinner !w-5 !h-5 !border-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info — 2 cols */}
            <motion.div
              variants={fadeInUp} initial="hidden" animate="visible"
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Contact Cards */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Get in Touch</h3>

                {[
                  {
                    icon: <FiPhone className="text-lg" />,
                    label: 'Phone',
                    value: '98252 47312',
                    href: 'tel:9825247312',
                    color: 'bg-sky-50 text-sky-600',
                  },
                  {
                    icon: <FiMail className="text-lg" />,
                    label: 'Email',
                    value: 'ommarketing.weighingscale1@gmail.com',
                    href: 'mailto:ommarketing.weighingscale1@gmail.com',
                    color: 'bg-teal-50 text-teal-600',
                  },
                  {
                    icon: <FiMapPin className="text-lg" />,
                    label: 'Location',
                    value: 'Shop 15, JB Plaza, Kathal, Kheda, Gujarat',
                    href: 'https://maps.app.goo.gl/K3ACrfZPQM16rsh57',
                    color: 'bg-violet-50 text-violet-600',
                  },
                  {
                    icon: <FiInstagram className="text-lg" />,
                    label: 'Instagram',
                    value: '@ommarketing_scales',
                    href: 'https://instagram.com/ommarketing_scales',
                    color: 'bg-pink-50 text-pink-600',
                  },
                ].map((item, i) => (
                  <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">{item.label}</div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors truncate">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="rounded-2xl overflow-hidden" style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}>
                <div className="p-6 text-white">
                  <FaWhatsapp className="text-3xl mb-3" />
                  <h3 className="text-xl font-bold mb-1.5">Chat on WhatsApp</h3>
                  <p className="text-white/70 text-sm mb-4">Get instant responses</p>
                  <a
                    href="https://wa.me/919825247312?text=Hi%2C%20I'm%20interested%20in%20your%20products"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <button className="bg-white text-green-700 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
                      Start Chat
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Visit Our Store</h2>
            <p className="text-center text-gray-400 text-sm mb-6">
              Shop 15, JB Plaza, Kathal, District Kheda, Gujarat
            </p>
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8901234567!2d72.71234567890123!3d22.64567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e1234567890%3A0x1234567890abcdef!2sJB%20PLAZA!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-5 text-center">
              <a href="https://maps.app.goo.gl/K3ACrfZPQM16rsh57" target="_blank" rel="noopener noreferrer">
                <button className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2">
                  <FiMapPin /> Get Directions
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
