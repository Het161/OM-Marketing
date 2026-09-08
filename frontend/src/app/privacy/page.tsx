// frontend/src/app/privacy/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects the information you share through this website.`,
  alternates: { canonical: '/privacy' },
};

const updated = 'September 2026';

export default function PrivacyPage() {
  return (
    <div className="px-4 py-14 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-4xl font-extrabold">Privacy Policy</h1>
        <p className="mb-10 text-muted">Last updated: {updated}</p>

        <div className="space-y-8 leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-content [&_li]:mb-1.5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6">
          <section>
            <p>
              {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this
              website. This policy explains what information we collect when you
              contact us, why we collect it, and what we do with it. We keep it
              deliberately short, because our practices are simple.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <p>
              We only collect information you choose to give us through a form on
              this site — the contact form, a quote request or a service booking.
              That is:
            </p>
            <ul>
              <li>Your name</li>
              <li>Your email address and phone number</li>
              <li>Your company name, if you provide one</li>
              <li>The message, product list or service details you send</li>
              <li>Which page you submitted the form from</li>
            </ul>
            <p>
              We do not run advertising trackers, we do not sell data, and we do
              not build profiles on visitors.
            </p>
          </section>

          <section>
            <h2>Why we use it</h2>
            <p>We use what you send us only to:</p>
            <ul>
              <li>Reply to your enquiry and prepare your quotation</li>
              <li>Send you a confirmation email with your reference number</li>
              <li>Arrange and follow up a service or delivery visit</li>
              <li>Keep a record of the enquiry so nothing gets lost</li>
            </ul>
            <p>
              We will not send you marketing emails you did not ask for.
            </p>
          </section>

          <section>
            <h2>Where it is stored</h2>
            <p>
              Enquiries are stored in our own database and emailed to us. Email is
              delivered using Google&apos;s mail servers. Your browser also stores
              your quote list locally on your own device — that list stays on your
              device and only reaches us when you submit a quote request.
            </p>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <p>
              We keep enquiry records for as long as needed to serve you and to
              meet our tax and warranty obligations, and then delete them. You can
              ask us to delete your details sooner at any time.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can ask us to show you what we hold about you, correct it, or
              delete it. Email{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-primary-600 underline"
              >
                {site.email}
              </a>{' '}
              or call {site.phoneDisplay} and we will action it.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              This site does not use advertising or analytics cookies. Your quote
              list is saved in your browser&apos;s local storage purely so it
              survives a page refresh — clearing your browser data removes it.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about this policy? Write to {site.name},{' '}
              {site.addressFull}, email{' '}
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
