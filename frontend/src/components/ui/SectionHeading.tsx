// frontend/src/components/ui/SectionHeading.tsx

'use client';

import Reveal from '@/components/ui/Reveal';

/**
 * Section masthead: an indexed rule, then the title.
 *
 * The numbered rule is doing the work a coloured eyebrow pill used to do —
 * it gives the page a visible spine and reads as a document rather than a
 * stack of marketing blocks.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  tone = 'light',
  action,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  tone?: 'light' | 'dark';
  action?: React.ReactNode;
}) {
  const dark = tone === 'dark';

  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : ''}>
      <div
        className={`flex items-center gap-4 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        {index && (
          <span className={`section-index ${dark ? 'text-steel-400' : ''}`}>
            {index}
          </span>
        )}
        {eyebrow && (
          <span className={`label ${dark ? 'text-steel-400' : 'label-accent'}`}>
            {eyebrow}
          </span>
        )}
        <span
          aria-hidden
          className={`h-px flex-1 ${dark ? 'bg-white/15' : 'bg-line'}`}
        />
      </div>

      <div
        className={`mt-6 flex flex-wrap items-end justify-between gap-6 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <div className={align === 'center' ? '' : 'max-w-2xl'}>
          <Tag
            className={`text-[clamp(1.875rem,3.4vw,2.875rem)] ${
              dark ? 'text-white' : 'text-content'
            }`}
          >
            {title}
          </Tag>
          {description && (
            <p
              className={`mt-4 max-w-xl text-[1.0625rem] leading-relaxed ${
                dark ? 'text-steel-300' : 'text-muted'
              }`}
            >
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
    </Reveal>
  );
}
