// frontend/src/app/terms/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `The terms that apply when you use the ${site.name} website, request a quote or book a service.`,
  alternates: { canonical: '/terms' },
};

const updated = 'September 2026';

export default function TermsPage() {
  return (
    <div className="px-4 py-14 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-extrabold">Terms &amp; Conditions</h1>
        <p className="mb-10 text-muted">Last updated: {updated}</p>

        <div className="space-y-8 leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-content [&_li]:mb-1.5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6">
          <section>
            <p>
              These terms apply when you use this website, request a quotation or
              book a service from {site.name}, {site.addressFull}.
            </p>
          </section>

          <section>
            <h2>Prices shown on this site are indicative</h2>
            <p>
              Prices displayed against products are a starting guide only. They are
              not an offer and do not form a contract. Your final price depends on
              quantity, configuration, current stock, applicable GST, and delivery
              or installation charges, and is confirmed only in a written
              quotation from us.
            </p>
          </section>

          <section>
            <h2>Quote requests</h2>
            <p>
              Adding items to your quote list and submitting a request does not
              place an order and does not reserve stock. It is a request for
              pricing. An order exists only once we have issued a quotation and you
              have confirmed it in writing.
            </p>
          </section>

          <section>
            <h2>Product information</h2>
            <p>
              We take care to describe specifications accurately, but manufacturers
              change models and images are illustrative. Capacities, platform sizes
              and accuracy classes should be confirmed with us before you order,
              particularly where the equipment must meet a compliance requirement.
            </p>
          </section>

          <section>
            <h2>Warranty</h2>
            <p>
              Unless stated otherwise in your quotation, equipment carries a
              one-year warranty against manufacturing defects from the date of
              delivery. The warranty does not cover:
            </p>
            <ul>
              <li>Physical damage, overloading or misuse</li>
              <li>Water or chemical ingress on equipment not rated for it</li>
              <li>Repairs or modifications carried out by anyone else</li>
              <li>Consumables such as batteries and printer rolls</li>
              <li>Routine calibration, which is a service rather than a fault</li>
            </ul>
          </section>

          <section>
            <h2>Legal Metrology</h2>
            <p>
              Scales used for trade in India must be verified and stamped under the
              Legal Metrology Act, 2009. We supply verification-ready equipment and
              will guide you through the process, but obtaining and maintaining
              valid stamping for your premises remains your responsibility.
            </p>
          </section>

          <section>
            <h2>Service visits</h2>
            <p>
              Service and calibration bookings are confirmed by phone. We give
              indicative response times in good faith; they are not guaranteed
              unless set out in a signed annual maintenance contract. Charges for
              a visit are confirmed before any work begins.
            </p>
          </section>

          <section>
            <h2>Delivery and returns</h2>
            <p>
              Delivery timelines are estimates and depend on stock and location.
              Please inspect goods on delivery and report transit damage
              immediately. Custom-built, made-to-order and stamped equipment cannot
              be returned once supplied unless it is faulty.
            </p>
          </section>

          <section>
            <h2>Liability</h2>
            <p>
              Our liability in connection with any product or service is limited to
              repairing or replacing the equipment supplied, or refunding what you
              paid for it. We are not liable for indirect or consequential loss,
              including lost production or lost profit. Nothing here limits
              liability that cannot lawfully be limited.
            </p>
          </section>

          <section>
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of India, and the courts at
              Ahmedabad, Gujarat have jurisdiction over any dispute.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Email{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-primary-600 underline"
              >
                {site.email}
              </a>{' '}
              or call{' '}
              <a
                href={`tel:${site.phoneDial}`}
                className="font-semibold text-primary-600 underline"
              >
                {site.phoneDisplay}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <Link href="/contact" className="btn-primary">
            Contact us
          </Link>
        </div>
      </article>
    </div>
  );
}
