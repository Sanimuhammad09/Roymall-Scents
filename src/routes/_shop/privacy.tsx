import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_shop/privacy')({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 bg-ivory min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-charcoal mb-2">Privacy Policy</h1>
        <p className="text-sm text-neutral-500 mb-12">Last updated: July 14, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">1. Information We Collect</h2>
            <p className="text-neutral-600 leading-relaxed">
              We collect personal information you provide when you create an account, place an order, 
              subscribe to our newsletter, or contact us. This may include your name, email address, 
              shipping address, phone number, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">2. How We Use Your Information</h2>
            <p className="text-neutral-600 leading-relaxed">
              We use your information to process orders, provide customer support, send marketing 
              communications (with your consent), improve our products and services, and comply with 
              legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">3. Information Sharing</h2>
            <p className="text-neutral-600 leading-relaxed">
              We do not sell your personal information. We share data only with trusted service 
              providers (payment processors, shipping carriers) necessary to fulfill orders and 
              operate our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">4. Data Security</h2>
            <p className="text-neutral-600 leading-relaxed">
              We implement industry-standard security measures including SSL encryption, secure 
              payment processing through Stripe, and regular security audits to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">5. Cookies</h2>
            <p className="text-neutral-600 leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze 
              site traffic, and personalize content. You can manage cookie preferences through your 
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">6. Your Rights</h2>
            <p className="text-neutral-600 leading-relaxed">
              You have the right to access, correct, or delete your personal data at any time. 
              You may also opt out of marketing communications. Contact us at privacy@flairvigo.com 
              to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">7. Contact Us</h2>
            <p className="text-neutral-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@flairvigo.com" className="text-charcoal font-semibold underline">
                privacy@flairvigo.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
