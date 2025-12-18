
// frontend/src/app/contact/page.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiSend, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

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
      // Actually call the backend API
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://om-marketing.onrender.com';
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      setError('Failed to send message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stunning Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50" />
        
        {/* Animated Orbs */}
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
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-teal-300/30 to-green-400/30 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl"
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            style={{
              backgroundImage: `
                linear-gradient(to right, #06b6d4 1px, transparent 1px),
                linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            className="w-full h-full"
          />
        </div>
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
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
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
              📞
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white" style={{
              textShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}>
              Contact Us
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto font-medium" style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              We'd love to hear from you! Get in touch with our team
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

      {/* Main Content Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      placeholder="+91 98252 47312"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none bg-white/80 backdrop-blur-sm"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl"
                    >
                      ✅ Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}

                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                      ❌ {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all">
                      <FiPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      <a href="tel:9825247312" className="text-gray-600 hover:text-teal-600 transition-colors">
                        98252 47312
                      </a>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all">
                      <FiMail className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:ommarketing.weighingscale1@gmail.com" className="text-gray-600 hover:text-teal-600 transition-colors break-all">
                        ommarketing.weighingscale1@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all">
                      <FiMapPin className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                      <a 
                        href="https://maps.app.goo.gl/K3ACrfZPQM16rsh57" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-teal-600 transition-colors"
                      >
                        Shop 15, JB Plaza, Kathal,<br />
                        District- Kheda, Gujarat
                      </a>
                    </div>
                  </motion.div>

                  {/* Instagram */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all">
                      <FiInstagram className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Instagram</h3>
                      <a href="https://instagram.com/ommarketing_scales" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 transition-colors">
                        @ommarketing_scales
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative"
              >
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
                  className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                />
                
                <div className="relative z-10">
                  <FaWhatsapp className="text-5xl mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Chat with us on WhatsApp</h3>
                  <p className="mb-6 text-white/90">Get instant responses to your queries</p>
                  <a
                    href="https://wa.me/919825247312?text=Hi%2C%20I'm%20interested%20in%20your%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Start Chat
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Visit Our Store
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Shop 15, JB Plaza, Kathal, District- Kheda, Gujarat
            </p>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8901234567!2d72.71234567890123!3d22.64567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e1234567890%3A0x1234567890abcdef!2sJB%20PLAZA!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-6 text-center">
              <a 
                href="https://maps.app.goo.gl/K3ACrfZPQM16rsh57"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <FiMapPin />
                  Get Directions
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
