// frontend/src/services/enquiries.ts

/**
 * Client for the enquiry endpoints (contact, quote, service).
 *
 * Every call returns a friendly, user-facing error message rather than
 * throwing a raw axios error — forms show these directly.
 */

import axios from 'axios';

import api from './api';

export interface EnquiryAck {
  id: number;
  reference: string;
  message: string;
}

interface BaseEnquiry {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
  /** Honeypot — must stay empty. */
  website?: string;
}

export interface ContactPayload extends BaseEnquiry {
  subject?: string;
  message: string;
}

export interface QuoteItemPayload {
  product_id?: number;
  name: string;
  quantity: number;
  price?: number;
}

export interface QuotePayload extends BaseEnquiry {
  items: QuoteItemPayload[];
}

export interface ServicePayload extends BaseEnquiry {
  service_type: string;
  preferred_date?: string;
}

/** Turn any failure into a sentence a customer can act on. */
export function friendlyError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'That took too long. Please check your connection and try again.';
    }
    if (!error.response) {
      return `We couldn't reach our server. Please try again, or call us on 98252 47312.`;
    }

    const { status, data } = error.response;
    const detail = (data as { detail?: unknown } | undefined)?.detail;

    if (status === 429 && typeof detail === 'string') return detail;

    // FastAPI validation errors come back as an array of issues
    if (status === 422 && Array.isArray(detail)) {
      const first = detail[0] as { msg?: string; loc?: unknown[] } | undefined;
      const field = Array.isArray(first?.loc) ? String(first.loc.at(-1)) : '';
      const msg = first?.msg?.replace(/^Value error,\s*/, '') ?? 'Please check your details.';
      return field ? `${field}: ${msg}` : msg;
    }

    if (typeof detail === 'string') return detail;

    return `Something went wrong on our side (error ${status}). Please try again or call 98252 47312.`;
  }

  return 'Something unexpected went wrong. Please try again, or call us on 98252 47312.';
}

async function post<T>(path: string, payload: T): Promise<EnquiryAck> {
  const response = await api.post<EnquiryAck>(`/api/enquiries/${path}`, payload, {
    timeout: 20000,
  });
  return response.data;
}

export const enquiryApi = {
  contact: (payload: ContactPayload) => post('contact', payload),
  quote: (payload: QuotePayload) => post('quote', payload),
  service: (payload: ServicePayload) => post('service', payload),
};
