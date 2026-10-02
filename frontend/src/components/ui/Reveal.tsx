// frontend/src/components/ui/Reveal.tsx

'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

/**
 * The only scroll animation in this design.
 *
 * One short upward reveal on a single easing curve — no springs, no scale,
 * no rotation. Scattering different motions across a page is what makes a
 * site read as assembled from templates; a single disciplined move reads as
 * considered.
 *
 * `index` staggers items in a row without each caller inventing a delay.
 */
export default function Reveal({
  children,
  index = 0,
  distance = 14,
  className,
  as = 'div',
  ...rest
}: {
  children: React.ReactNode;
  index?: number;
  distance?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'span';
} & Omit<HTMLMotionProps<'div'>, 'children'>) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index, 6) * 0.055,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
