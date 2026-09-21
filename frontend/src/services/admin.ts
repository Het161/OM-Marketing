// frontend/src/services/admin.ts

/**
 * Client for the admin billing portal.
 *
 * The session token lives in localStorage under `auth_token`, which the axios
 * request interceptor in `api.ts` attaches to every call.
 */

import axios from 'axios';

import api from './api';
import { site, whatsappLink } from '@/lib/site';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'om_admin_user';

/* ------------------------------------------------------------------ types */

export interface InvoiceItem {
  id?: number;
  position?: number;
  description: string;
  unit?: string;
  quantity: number;
  rate: number;
  amount?: number;
}

export interface PaymentDetail {
  label: string;
  value: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  public_token: string;
  customer_name: string;
  customer_email?: string | null;
  customer_phone?: string | null;
  customer_address?: string | null;
  business_name?: string | null;
  business_gstin?: string | null;
  business_notes?: string | null;
  subtotal: number;
  discount_amount: number;
  delivery_charge: number;
  total: number;
  amount_in_words?: string | null;
  payment_mode?: string | null;
  notes?: string | null;
  terms?: string | null;
  status: InvoiceStatus;
  issued_at: string;
  created_at?: string;
  emailed_at?: string | null;
  items: InvoiceItem[];
  /** Bank details, supplied by the server — never stored in this repo. */
  payment_details?: PaymentDetail[];
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'cancelled';

export interface InvoiceSummary {
  id: number;
  invoice_number: string;
  public_token: string;
  customer_name: string;
  business_name?: string | null;
  customer_phone?: string | null;
  customer_email?: string | null;
  total: number;
  status: InvoiceStatus;
  issued_at: string;
  emailed_at?: string | null;
}

export interface InvoiceStats {
  count: number;
  billed: number;
  paid: number;
  outstanding: number;
  by_status: Record<string, number>;
}

export interface InvoicePayload {
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  customer_address?: string;
  business_name?: string;
  business_gstin?: string;
  business_notes?: string;
  discount_amount: number;
  delivery_charge: number;
  payment_mode?: string;
  notes?: string;
  terms?: string;
  status?: InvoiceStatus;
  items: InvoiceItem[];
}

/* ------------------------------------------------------------------- auth */

export const adminAuth = {
  async login(username: string, password: string) {
    const { data } = await api.post('/api/auth/login', { username, password });
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN_KEY, data.access_token);
      window.localStorage.setItem(
        USER_KEY,
        JSON.stringify({ username: data.username, full_name: data.full_name }),
      );
    }
    return data;
  },

  logout() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  },

  token(): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },

  storedUser(): { username: string; full_name?: string } | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /** Confirm the token is still accepted by the server. */
  async verify() {
    const { data } = await api.get('/api/auth/me');
    return data;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    // The endpoint reuses the login schema: `username` = current password.
    await api.post('/api/auth/change-password', {
      username: currentPassword,
      password: newPassword,
    });
  },
};

/* --------------------------------------------------------------- invoices */

export const invoiceApi = {
  async list(params?: { search?: string; status?: string }) {
    const { data } = await api.get<InvoiceSummary[]>('/api/invoices/', { params });
    return data;
  },

  async stats() {
    const { data } = await api.get<InvoiceStats>('/api/invoices/stats');
    return data;
  },

  async get(id: number) {
    const { data } = await api.get<Invoice>(`/api/invoices/${id}`);
    return data;
  },

  async create(payload: InvoicePayload) {
    const { data } = await api.post<Invoice>('/api/invoices/', payload);
    return data;
  },

  async update(id: number, payload: InvoicePayload) {
    const { data } = await api.put<Invoice>(`/api/invoices/${id}`, payload);
    return data;
  },

  async setStatus(id: number, status: InvoiceStatus) {
    const { data } = await api.patch<Invoice>(`/api/invoices/${id}/status`, { status });
    return data;
  },

  async remove(id: number) {
    await api.delete(`/api/invoices/${id}`);
  },

  async email(id: number) {
    const { data } = await api.post<{ message: string }>(`/api/invoices/${id}/email`);
    return data;
  },

  /** Download the PDF through axios so the auth header is sent. */
  async downloadPdf(id: number, invoiceNumber: string) {
    const response = await api.get(`/api/invoices/${id}/pdf`, { responseType: 'blob' });
    const url = URL.createObjectURL(response.data as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${invoiceNumber.replace(/\//g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },
};

export function publicBillUrl(token: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/bill/${token}`;
}

/* -------------------------------------------------- ready-made messages */

const inr = (value: number) =>
  `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const onDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

/** The WhatsApp message sent with a bill. */
export function billWhatsappMessage(invoice: InvoiceSummary | Invoice): string {
  const name = (invoice.customer_name || '').split(' ')[0] || 'Sir/Madam';
  return [
    `Namaste ${name} 🙏`,
    ``,
    `Thank you for your business with *OM Marketing*.`,
    ``,
    `*Invoice ${invoice.invoice_number}*`,
    `Date: ${onDate(invoice.issued_at)}`,
    `Amount: *${inr(invoice.total)}*`,
    ``,
    `View or download your bill here:`,
    publicBillUrl(invoice.public_token),
    ``,
    `Payment is due within 45 days (MSMED Act, 2006).`,
    `Any questions? Just call us on ${site.phoneDisplay}.`,
    ``,
    `— OM Marketing, ${site.addressLine}`,
  ].join('\n');
}

/** A general WhatsApp message to a customer, not tied to a bill. */
export function customerWhatsappMessage(name?: string | null): string {
  const first = (name || '').split(' ')[0] || 'Sir/Madam';
  return [
    `Namaste ${first} 🙏`,
    ``,
    `This is *OM Marketing* (${site.addressLine}) — weighing scales, note counters, service and calibration.`,
    ``,
    `How can we help you today?`,
    ``,
    `📞 ${site.phoneDisplay}`,
  ].join('\n');
}

export function billWhatsappLink(invoice: InvoiceSummary | Invoice): string {
  const digits = (invoice.customer_phone || '').replace(/\D/g, '');
  const number = digits.length === 10 ? `91${digits}` : digits;
  const text = encodeURIComponent(billWhatsappMessage(invoice));
  return number ? `https://wa.me/${number}?text=${text}` : whatsappLink(billWhatsappMessage(invoice));
}

/** mailto: fallback — used when there's no address on file to send to. */
export function billMailtoLink(invoice: InvoiceSummary | Invoice): string {
  const subject = `Invoice ${invoice.invoice_number} from OM Marketing`;
  const body = [
    `Dear ${invoice.customer_name},`,
    ``,
    `Thank you for your business with OM Marketing.`,
    ``,
    `Invoice: ${invoice.invoice_number}`,
    `Date: ${onDate(invoice.issued_at)}`,
    `Amount: ${inr(invoice.total)}`,
    ``,
    `You can view or download your bill here:`,
    publicBillUrl(invoice.public_token),
    ``,
    `Payment is due within 45 days as per the MSMED Act, 2006.`,
    `GST is not applicable — OM Marketing is not registered under GST.`,
    ``,
    `Kind regards,`,
    `Het Patel`,
    `OM Marketing, ${site.addressFull}`,
    `${site.phoneDisplay} · ${site.email}`,
  ].join('\n');

  return `mailto:${invoice.customer_email ?? ''}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/** Turn an axios failure into something worth showing the user. */
export function adminError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Can't reach the server. Is the backend running?";
    }
    const { status, data } = error.response;
    const detail = (data as { detail?: unknown } | undefined)?.detail;

    // The server's own message is always the most useful one — a 401 from the
    // login form means "wrong password", not "session expired".
    if (typeof detail === 'string') return detail;
    if (status === 401) return 'Your session has expired. Please sign in again.';
    if (Array.isArray(detail)) {
      const first = detail[0] as { msg?: string; loc?: unknown[] } | undefined;
      const field = Array.isArray(first?.loc) ? String(first.loc.at(-1)) : '';
      const msg = first?.msg?.replace(/^Value error,\s*/, '') ?? 'Please check the form.';
      return field ? `${field}: ${msg}` : msg;
    }
    return `Something went wrong (error ${status}).`;
  }
  return 'Something unexpected went wrong.';
}
