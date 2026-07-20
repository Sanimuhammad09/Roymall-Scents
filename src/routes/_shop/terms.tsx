import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_shop/terms')({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-ivory min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-charcoal mb-2">Terms of Service</h1>
        <p className="text-sm text-neutral-500 mb-12">Last updated: July 14, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">1. Acceptance of Terms</h2>
            <p className="text-neutral-600 leading-relaxed">
              By accessing or using the Flairvigo website, you agree to be bound by these Terms of 
              Service and our Privacy Policy. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">2. Products & Pricing</h2>
            <p className="text-neutral-600 leading-relaxed">
              All product descriptions, images, and prices are subject to change without notice. 
              We reserve the right to modify or discontinue products at any time. Prices are listed 
              in USD and do not include applicable taxes or shipping charges.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">3. Orders & Payment</h2>
            <p className="text-neutral-600 leading-relaxed">
              By placing an order, you represent that you are authorized to use the payment method 
              provided. We reserve the right to cancel or refuse any order for any reason, including 
              suspected fraud or product availability issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">4. Shipping & Delivery</h2>
            <p className="text-neutral-600 leading-relaxed">
              Shipping times are estimates and not guarantees. We are not responsible for delays 
              caused by carriers, customs, or unforeseen circumstances. Risk of loss transfers 
              to you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">5. Returns & Refunds</h2>
            <p className="text-neutral-600 leading-relaxed">
              Items may be returned within 30 days of delivery in unworn, original condition with 
              tags attached. Personalized/embroidered items are final sale. Refunds are processed 
              to the original payment method within 5-10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">6. Intellectual Property</h2>
            <p className="text-neutral-600 leading-relaxed">
              All content on this website, including text, images, logos, and designs, is the 
              property of Flairvigo and protected by copyright and trademark laws. Unauthorized 
              use is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">7. Limitation of Liability</h2>
            <p className="text-neutral-600 leading-relaxed">
              Flairvigo shall not be liable for any indirect, incidental, special, or consequential 
              damages arising from the use of our products or services. Our total liability shall 
              not exceed the amount paid for the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-3">8. Contact</h2>
            <p className="text-neutral-600 leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:legal@flairvigo.com" className="text-charcoal font-semibold underline">
                legal@flairvigo.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
