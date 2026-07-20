import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Route = createFileRoute('/_shop/faq')({
  component: FaqPage,
});

const faqData = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. Free shipping is available on orders over ₦50,000.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order from your account dashboard.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'We currently ship to the US, Canada, UK, and Australia. International shipping times vary by destination.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy for unworn items in original packaging. Embroidered items are final sale.',
      },
      {
        q: 'How do I exchange an item?',
        a: 'Start a return from your account dashboard and place a new order for the size/color you need. We\'ll refund the original as soon as we receive it.',
      },
    ],
  },
  {
    category: 'Product & Sizing',
    questions: [
      {
        q: 'How do I find my size?',
        a: 'Use our Fit Finder tool for personalized recommendations based on your body measurements and fit preferences. It takes less than 60 seconds!',
        q: 'How do I find my scent?',
        a: 'Use our Fragrance Finder tool for personalized recommendations based on your scent preferences and occasion. It takes less than 60 seconds!',
      },
      {
        q: 'What ingredients do you use?',
        a: 'Our signature scents use high-quality essential oils and aromatic compounds. All our perfumes are cruelty-free and vegan-friendly.',
      },
      {
        q: 'Can I personalize my perfumes?',
        a: 'Yes! We offer custom engraving on our glass bottles for an additional fee. This makes our perfumes the perfect customized gift.',
      },
    ],
  },
  {
    category: 'Account & Payments',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and PayPal.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All transactions are encrypted with 256-bit SSL and processed through Stripe, a PCI DSS Level 1 certified payment processor.',
      },
    ],
  },
];

function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div className="pt-24 pb-20 bg-ivory min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Frequently Asked Questions</h1>
          <p className="text-neutral-500">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-charcoal font-semibold underline">Contact us</a>.
          </p>
        </div>

        <div className="space-y-10">
          {faqData.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4 pb-2 border-b border-neutral-200">
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.questions.map((item, idx) => {
                  const key = `${section.category}-${idx}`;
                  const isOpen = openItem === key;
                  return (
                    <div
                      key={key}
                      className="bg-white border border-neutral-100 rounded-sm shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-semibold text-charcoal pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp size={18} className="text-neutral-400 shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-neutral-400 shrink-0" />
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-sm text-neutral-600 leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
