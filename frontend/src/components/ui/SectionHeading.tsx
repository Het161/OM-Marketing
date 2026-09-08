// frontend/src/components/ui/SectionHeading.tsx

'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-primary-600">
          {eyebrow}
        </span>
      )}
      <Tag className="text-3xl font-extrabold sm:text-4xl">{title}</Tag>
      {description && (
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{description}</p>
      )}
    </motion.div>
  );
}
