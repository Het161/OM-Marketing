// frontend/src/app/scale-finder/page.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FiArrowLeft, FiCheck, FiFilePlus, FiMessageCircle, FiRefreshCw } from 'react-icons/fi';

import ProductCard, { type Product } from '@/components/products/ProductCard';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import SectionHeading from '@/components/ui/SectionHeading';
import { site, whatsappLink } from '@/lib/site';
import { productApi } from '@/services/api';

/* -------------------------------------------------------------------------
   The questionnaire
   ---------------------------------------------------------------------- */

interface Choice {
  value: string;
  label: string;
  hint: string;
  icon: string;
}

interface Question {
  id: 'use' | 'capacity' | 'environment';
  title: string;
  help: string;
  choices: Choice[];
}

const QUESTIONS: Question[] = [
  {
    id: 'use',
    title: 'What will you be weighing?',
    help: 'This tells us the platform size and precision you need.',
    choices: [
      {
        value: 'retail',
        label: 'Shop / retail goods',
        hint: 'Grocery, kirana, sweets, vegetables',
        icon: '🛒',
      },
      {
        value: 'warehouse',
        label: 'Sacks, cartons, drums',
        hint: 'Godown, warehouse, dispatch',
        icon: '📦',
      },
      {
        value: 'industrial',
        label: 'Heavy or suspended loads',
        hint: 'Factory, scrap, crane lifting',
        icon: '🏗️',
      },
      {
        value: 'cash',
        label: 'Cash / banknotes',
        hint: 'Counting notes, not weighing',
        icon: '💵',
      },
    ],
  },
  {
    id: 'capacity',
    title: 'How heavy does it get?',
    help: 'Pick roughly 25% above your heaviest routine load.',
    choices: [
      { value: 'upto30', label: 'Up to 30 kg', hint: 'Counter-top loads', icon: '🪶' },
      { value: 'upto200', label: '30 – 200 kg', hint: 'Sacks and cartons', icon: '⚖️' },
      { value: 'upto500', label: '200 – 500 kg', hint: 'Pallets and drums', icon: '🛢️' },
      { value: 'heavy', label: 'Over 500 kg', hint: 'Industrial and crane loads', icon: '🏭' },
    ],
  },
  {
    id: 'environment',
    title: 'Where will it live?',
    help: 'Wet, dusty and hazardous areas need different builds.',
    choices: [
      { value: 'indoor', label: 'Clean indoor counter', hint: 'Shop or office', icon: '🏪' },
      { value: 'rough', label: 'Warehouse floor', hint: 'Dust, knocks, forklifts', icon: '🚜' },
      { value: 'wet', label: 'Wet or washdown area', hint: 'Food, dairy, fish, chemicals', icon: '💧' },
      { value: 'hazard', label: 'Hazardous / explosive zone', hint: 'Chemical, paint, solvent plants', icon: '⚠️' },
    ],
  },
];

/* -------------------------------------------------------------------------
   Recommendation logic — scores the live catalogue against the answers
   ---------------------------------------------------------------------- */

type Answers = Partial<Record<Question['id'], string>>;

interface Recommendation {
  headline: string;
  reasoning: string;
  /** Keywords matched against product names/descriptions, best first. */
  keywords: string[];
  category: string;
}

function recommend(answers: Answers): Recommendation {
  const { use, capacity, environment } = answers;

  if (use === 'cash') {
    return {
      headline: 'A banknote counter',
      reasoning:
        'You are counting cash rather than weighing it, so a note counter with fake-note detection is the right machine — far faster and more reliable than counting by hand.',
      keywords: ['note', 'counter', 'banknote'],
      category: 'note_counter',
    };
  }

  if (environment === 'hazard') {
    return {
      headline: 'An explosion-proof weighing system',
      reasoning:
        'Hazardous and explosive atmospheres need flameproof-rated indicators and enclosures. Standard scales are not safe or legal in these zones.',
      keywords: ['explosion', 'proof', 'indicator'],
      category: 'weighing_scale',
    };
  }

  if (use === 'industrial' || capacity === 'heavy') {
    return {
      headline: 'A crane scale or heavy platform scale',
      reasoning:
        'Above 500 kg you want either a crane scale for suspended loads or a heavy-duty floor platform with a mild-steel chequered plate. Both include overload protection.',
      keywords: ['crane', 'ocs', 'ton', 'platform'],
      category: 'weighing_scale',
    };
  }

  if (capacity === 'upto500' || environment === 'wet') {
    return {
      headline: 'A stainless-steel platform scale',
      reasoning:
        environment === 'wet'
          ? 'Wet and washdown areas corrode mild steel quickly. A stainless-steel platform with a sealed load cell will last far longer.'
          : 'For pallets and drums in the 200–500 kg range, a 500×500 mm or 600×600 mm platform scale gives you the surface area and the accuracy you need.',
      keywords: ['ss', 'stainless', 'platform', 'chekar', '600', '500'],
      category: 'weighing_scale',
    };
  }

  if (capacity === 'upto200' || use === 'warehouse') {
    return {
      headline: 'A 400×400 mm platform scale',
      reasoning:
        'Sacks and cartons up to 200 kg sit best on a 400×400 mm platform with a pole-mounted digital indicator, so the display stays readable when the load is bulky.',
      keywords: ['platform', '400', '200kg'],
      category: 'weighing_scale',
    };
  }

  return {
    headline: 'A table-top or tebal-top scale',
    reasoning:
      'For counter use up to 30 kg, a table-top scale gives you fine graduation, a rechargeable battery and a compact footprint — ideal for shops and kitchens.',
    keywords: ['tebal', 'table', 'mini', 'ms', '30kg', '10'],
    category: 'weighing_scale',
  };
}

function scoreProduct(product: Product, rec: Recommendation): number {
  const haystack = `${product.name} ${product.description ?? ''}`.toLowerCase();
  let score = product.category === rec.category ? 10 : 0;

  rec.keywords.forEach((keyword, index) => {
    if (haystack.includes(keyword.toLowerCase())) {
      // earlier keywords matter more
      score += rec.keywords.length - index;
    }
  });

  return score;
}

/* -------------------------------------------------------------------------
   Page
   ---------------------------------------------------------------------- */

export default function ScaleFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const isDone = step >= QUESTIONS.length;

  useEffect(() => {
    let cancelled = false;

    productApi
      .getAll({ limit: 100 })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const recommendation = useMemo(
    () => (isDone ? recommend(answers) : null),
    [isDone, answers],
  );

  const matches = useMemo(() => {
    if (!recommendation) return [];
    return [...products]
      .map((product) => ({ product, score: scoreProduct(product, recommendation) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.product);
  }, [products, recommendation]);

  const choose = (questionId: Question['id'], value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setStep((prev) => prev + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const progress = Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100);
  const question = QUESTIONS[step];

  return (
    <>
      <header className="gradient-primary relative overflow-hidden px-4 py-14 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-accent-300">
            Takes under a minute
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Which scale do I need?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-100">
            Three quick questions and we&apos;ll shortlist the models that actually
            fit your job — no jargon.
          </p>
        </div>
      </header>

      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-muted">
                {isDone ? 'Done' : `Question ${step + 1} of ${QUESTIONS.length}`}
              </span>
              <span className="text-subtle">{progress}%</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-surface-3"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Scale finder progress"
            >
              <motion.div
                className="h-full rounded-full bg-primary-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <fieldset>
                  <legend className="mb-1.5 text-2xl font-extrabold sm:text-3xl">
                    {question.title}
                  </legend>
                  <p className="mb-7 text-muted">{question.help}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {question.choices.map((choice) => (
                      <button
                        key={choice.value}
                        type="button"
                        onClick={() => choose(question.id, choice.value)}
                        className="card group flex items-start gap-4 p-5 text-left transition-transform duration-200 hover:-translate-y-1 hover:border-primary-400"
                      >
                        <span className="text-3xl" aria-hidden>
                          {choice.icon}
                        </span>
                        <span>
                          <span className="block font-bold transition-colors group-hover:text-primary-600">
                            {choice.label}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted">
                            {choice.hint}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="btn-ghost mt-6"
                  >
                    <FiArrowLeft aria-hidden /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                aria-live="polite"
              >
                <div className="card mb-8 p-6 sm:p-8">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <FiCheck size={26} aria-hidden />
                  </span>
                  <span className="mb-2 block text-[13px] font-bold uppercase tracking-[0.14em] text-primary-600">
                    Our recommendation
                  </span>
                  <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl">
                    {recommendation?.headline}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {recommendation?.reasoning}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={whatsappLink(
                        `Hello OM Marketing, I used your scale finder and it suggested: ${recommendation?.headline}. Could you help me choose the exact model?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <FiMessageCircle aria-hidden /> Confirm on WhatsApp
                    </a>
                    <button type="button" onClick={restart} className="btn-outline">
                      <FiRefreshCw aria-hidden /> Start over
                    </button>
                  </div>
                </div>

                <SectionHeading
                  align="left"
                  eyebrow="Best matches"
                  title="Models that fit"
                  description="Add them to your quote list and we'll send pricing — usually the same day."
                  as="h2"
                />

                <div className="mt-8">
                  {loading ? (
                    <ProductGridSkeleton count={3} />
                  ) : matches.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {matches.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  ) : (
                    <div className="card p-8 text-center">
                      <p className="mb-2 font-semibold">
                        {failed
                          ? "We couldn't load the catalogue just now."
                          : 'We stock this, but not in the online catalogue yet.'}
                      </p>
                      <p className="mb-6 text-muted">
                        Tell us your requirement and we&apos;ll send options and
                        pricing directly.
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/contact" className="btn-primary">
                          <FiFilePlus aria-hidden /> Request a quote
                        </Link>
                        <a href={`tel:${site.phoneDial}`} className="btn-outline">
                          Call {site.phoneDisplay}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-center">
                  <Link href="/products" className="btn-ghost">
                    Or browse the full catalogue
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
