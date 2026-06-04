'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Instagram as InstagramIcon,
  MessageCircle,
  Send,
  Check,
  ArrowUpRight,
} from 'lucide-react';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WHATSAPP_NUMBER = '919825247312';
const whatsappMessage = encodeURIComponent("Hello, I'd like to enquire about your collection.");

const contactDetails = [
  {
    icon: Phone,
    label: 'Telephone',
    value: '+91 98252 47312',
    href: 'tel:9825247312',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'ommarketing.weighingscale1@gmail.com',
    href: 'mailto:ommarketing.weighingscale1@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Atelier',
    value: 'Shop 15, JB Plaza · Naroda, Ahmedabad · Gujarat',
    href: 'https://maps.app.goo.gl/K3ACrfZPQM16rsh57',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@ommarketing_scales',
    href: 'https://instagram.com/ommarketing_scales',
  },
];

const hours = [
  { day: 'Monday — Saturday', range: '9:00 — 19:00' },
  { day: 'Sunday', range: '10:00 — 16:00' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

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

  return (
    <div>
      {/* ── Editorial header ── */}
      <section className="border-b border-[rgba(196,166,107,0.15)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-5">In Conversation</p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] lg:text-[4.2rem] leading-[1.05] text-brand-ivory">
              We would{' '}
              <em className="italic text-brand-gold font-light">love</em> to hear from you.
            </h1>
            <p className="mt-6 text-brand-muted leading-relaxed max-w-xl">
              Tell us about your requirements, request a quote, or visit the atelier
              in Naroda. Our team responds within one working day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">

            {/* ── Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: E }}
            >
              <p className="eyebrow text-brand-muted mb-8">Send a Message</p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <LuxuryField
                    id="name"
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <LuxuryField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <LuxuryField
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Telephone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <div>
                  <label
                    htmlFor="message"
                    className="block label-sm text-brand-muted mb-3"
                  >
                    How can we help you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="input-luxury"
                    placeholder="Share details about your enquiry"
                  />
                </div>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 py-3 px-4 border border-brand-gold/40 bg-[rgba(196,166,107,0.06)]"
                      style={{ borderRadius: 2 }}
                    >
                      <Check strokeWidth={1.25} size={16} className="text-brand-gold" />
                      <p className="text-sm text-brand-ivory">
                        Message received. We&apos;ll respond within one working day.
                      </p>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-3 px-4 border border-red-500/30 bg-red-500/[0.05] text-sm text-red-300"
                      style={{ borderRadius: 2 }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border border-brand-canvas/40 border-t-brand-canvas rounded-full animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send strokeWidth={1.25} size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* ── Contact info ── */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: E }}
              className="space-y-12 lg:pl-8 lg:border-l lg:border-[rgba(196,166,107,0.12)]"
            >
              {/* Atelier */}
              <div>
                <p className="eyebrow text-brand-muted mb-6">The Atelier</p>
                <ul className="space-y-5">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;
                    const isExternal = item.href.startsWith('http');
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target={isExternal ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 group"
                        >
                          <span className="text-brand-gold mt-1 flex-shrink-0">
                            <Icon strokeWidth={1} size={18} />
                          </span>
                          <span className="min-w-0">
                            <span className="block label-sm text-brand-muted mb-1">
                              {item.label}
                            </span>
                            <span className="block text-sm text-brand-ivory group-hover:text-brand-gold transition-colors break-words">
                              {item.value}
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* WhatsApp */}
              <div className="surface p-7">
                <span className="text-brand-gold mb-5 inline-flex">
                  <MessageCircle strokeWidth={1} size={26} />
                </span>
                <h3 className="font-display text-2xl text-brand-ivory mb-2">
                  WhatsApp Concierge
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  For instant assistance during business hours, message our concierge.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-gold inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-brand-ivory/85 hover:text-brand-gold"
                >
                  Start Conversation
                  <ArrowUpRight strokeWidth={1.25} size={14} />
                </a>
              </div>

              {/* Hours */}
              <div>
                <p className="eyebrow text-brand-muted mb-5">Hours</p>
                <dl className="space-y-3">
                  {hours.map((row) => (
                    <div
                      key={row.day}
                      className="flex justify-between text-sm border-b border-[rgba(196,166,107,0.12)] pb-3"
                    >
                      <dt className="text-brand-muted">{row.day}</dt>
                      <dd className="text-brand-ivory font-mono tabular-nums">{row.range}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="border-t border-[rgba(196,166,107,0.15)] py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: E }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <p className="eyebrow text-brand-muted mb-5">Visit Us</p>
                <h2 className="font-display text-[2.2rem] sm:text-[2.8rem] leading-[1.05] text-brand-ivory">
                  Shop 15, JB Plaza
                  <br />
                  <em className="italic text-brand-gold font-light">Naroda, Ahmedabad.</em>
                </h2>
              </div>
              <a
                href="https://maps.app.goo.gl/K3ACrfZPQM16rsh57"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline self-start"
              >
                Get Directions
                <ArrowUpRight strokeWidth={1.25} size={16} />
              </a>
            </div>

            <div className="surface overflow-hidden aspect-[16/8]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8901234567!2d72.71234567890123!3d22.64567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e1234567890%3A0x1234567890abcdef!2sJB%20PLAZA!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Atelier Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ── Luxury underline field ────────────────────────────────────── */
function LuxuryField({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  required = false,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block label-sm text-brand-muted mb-3">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="input-luxury"
        placeholder=" "
      />
    </div>
  );
}
