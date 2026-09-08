// frontend/src/lib/validation.ts

/**
 * Small, dependency-free form validation.
 * The same rules run on the backend, so this is purely for fast feedback.
 */

export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Return the 10-digit Indian mobile number, or null if it isn't valid.
 *
 * People write numbers every which way — "98252 47312", "+91-9825247312",
 * "09825247312" — so strip everything that isn't a digit and check what's
 * left, rather than trying to match the formatting. Mirrors the backend.
 */
export function normaliseIndianMobile(raw: string): string | null {
  let digits = (raw ?? '').replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  return digits.length === 10 && '6789'.includes(digits[0]) ? digits : null;
}

export function validateName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Please enter your name';
  if (v.length < 2) return 'Name looks too short';
  if (v.length > 120) return 'Name is too long';
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Please enter your email address';
  if (!EMAIL_RE.test(v)) return 'Enter a valid email, like name@example.com';
  return undefined;
}

export function validatePhone(value: string, required = true): string | undefined {
  const v = value.trim();
  if (!v) return required ? 'Please enter your phone number' : undefined;
  if (!normaliseIndianMobile(v)) return 'Enter a valid 10-digit Indian mobile number';
  return undefined;
}

export function validateMessage(
  value: string,
  { required = true, min = 5 } = {},
): string | undefined {
  const v = value.trim();
  if (!v) return required ? 'Please tell us what you need' : undefined;
  if (v.length < min) return `Please add a little more detail (at least ${min} characters)`;
  if (v.length > 4000) return 'Message is too long — please shorten it';
  return undefined;
}

export function validateRequired(value: string, label: string): string | undefined {
  return value.trim() ? undefined : `Please choose ${label}`;
}

/** True when every value in the errors object is undefined. */
export function isClean<T>(errors: Errors<T>): boolean {
  return Object.values(errors).every((e) => !e);
}
