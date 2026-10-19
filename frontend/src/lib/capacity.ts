// frontend/src/lib/capacity.ts

/**
 * Reading the capacities a scale is sold in, out of its specification blob.
 *
 * Capacities are written the way the trade writes them — "100 / 200 kg",
 * "1 / 2 ton", "15 Ton (15000kg)", "600 g" — and each value in a list is a
 * real variant you can order, not a range. So a 600×600 platform listed as
 * "100 / 200 / 300 / 500 kg" should appear under every one of those weights.
 */

/** One kilogram figure a product is actually sold in. */
export type Kg = number;

const TONNE = 1000;

/**
 * Pull the kilogram figures out of a capacity string.
 *
 * Returns an empty list for anything we cannot read with confidence — a
 * product with no capacity simply never matches a weight filter, which is
 * better than guessing it into the wrong bracket.
 */
export function parseCapacities(raw?: string | null): Kg[] {
  if (!raw) return [];

  const text = String(raw).toLowerCase();

  // "15 ton (15000kg)" — the bracketed figure repeats the tonnage, so prefer
  // the leading value and ignore the parenthetical.
  const cleaned = text.replace(/\([^)]*\)/g, ' ');

  // The unit is written once, at the end of a list: "100 / 200 kg".
  const unit: 'kg' | 'ton' | 'g' = /\bton(ne)?s?\b/.test(cleaned)
    ? 'ton'
    : /\bkgs?\b/.test(cleaned)
      ? 'kg'
      : /\bg\b|\bgram/.test(cleaned)
        ? 'g'
        : 'kg';

  const out: Kg[] = [];
  for (const match of cleaned.matchAll(/(\d+(?:\.\d+)?)\s*(kgs?|ton(?:ne)?s?|g\b)?/g)) {
    const value = Number(match[1]);
    if (!Number.isFinite(value) || value <= 0) continue;

    // A unit written against this particular number wins over the list's.
    const own = match[2];
    const effective = own
      ? /ton/.test(own)
        ? 'ton'
        : /kg/.test(own)
          ? 'kg'
          : 'g'
      : unit;

    const kg =
      effective === 'ton' ? value * TONNE : effective === 'g' ? value / 1000 : value;
    if (!out.includes(kg)) out.push(kg);
  }

  return out.sort((a, b) => a - b);
}

/** The capacity figures for a product, read from its spec blob. */
export function capacitiesOf(specifications?: string | null): Kg[] {
  if (!specifications) return [];
  try {
    const parsed = JSON.parse(specifications);
    if (!parsed || typeof parsed !== 'object') return [];
    // Only the capacity field. `counting_capacity` is notes per minute and
    // `seal_length` is millimetres — neither is a weight.
    return parseCapacities(parsed.capacity);
  } catch {
    return [];
  }
}

/** How a weight is written on a filter button. */
export function formatKg(kg: Kg): string {
  if (kg < 1) return `${Math.round(kg * 1000)} g`;
  if (kg >= TONNE) {
    const t = kg / TONNE;
    return `${Number.isInteger(t) ? t : t.toFixed(1)} ton`;
  }
  return `${kg} kg`;
}
