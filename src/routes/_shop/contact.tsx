import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_shop/contact')({
  component: ContactPage,
});

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent! We\'ll get back to you within 24 hours.');
    }, 1500);
  };

  const contactMethods = [
    {
      title: "EMAIL SUPPORT",
      value: "support@roymallscents.com",
    },
    {
      title: "PHONE",
      value: "+1 (555) 0199",
    },
    {
      title: "HEADQUARTERS",
      value: "123 Fragrance District, NY 10001",
    },
    {
      title: "BUSINESS HOURS",
      value: "Mon - Fri, 9am - 6pm EST",
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#282828] font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_perfume.png" 
            alt="Roymall Scents Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="container-premium relative z-10 px-4 sm:px-8 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[0.1em] text-white mb-6">
            Contact Us
          </h1>
          <p className="text-[14px] md:text-[18px] font-bold tracking-[0.05em] text-white/90 max-w-2xl mx-auto leading-relaxed">
            HAVE A QUESTION OR NEED HELP WITH AN ORDER? FILL OUT THE FORM BELOW AND OUR AWESOME TEAM WILL GET BACK TO YOU SOON.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="container-premium px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Form Section */}
            <div className="lg:col-span-8 bg-white p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 rounded-sm">
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#282828] mb-8 pb-4 border-b-2 border-[#282828]">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#282828] block">First Name</label>
                    <Input className="h-14 rounded-[4px] border-2 border-neutral-200 focus-visible:ring-0 focus-visible:border-[#282828] bg-white px-4 text-[14px] font-medium transition-colors" placeholder="Jane" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#282828] block">Last Name</label>
                    <Input className="h-14 rounded-[4px] border-2 border-neutral-200 focus-visible:ring-0 focus-visible:border-[#282828] bg-white px-4 text-[14px] font-medium transition-colors" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#282828] block">Email Address</label>
                  <Input type="email" className="h-14 rounded-[4px] border-2 border-neutral-200 focus-visible:ring-0 focus-visible:border-[#282828] bg-white px-4 text-[14px] font-medium transition-colors" placeholder="jane@example.com" required />
                </div>

                <div className="space-y-3">
                  <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#282828] block">Subject</label>
                  <Input className="h-14 rounded-[4px] border-2 border-neutral-200 focus-visible:ring-0 focus-visible:border-[#282828] bg-white px-4 text-[14px] font-medium transition-colors" placeholder="How can we help you today?" required />
                </div>

                <div className="space-y-3">
                  <label className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#282828] block">Message</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Please provide as much detail as possible..."
                    className="w-full rounded-[4px] border-2 border-neutral-200 bg-white px-4 py-4 text-[14px] font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-[#282828] resize-none transition-colors"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-w-[240px] h-14 bg-[#282828] text-white hover:bg-black rounded-[2px] font-black uppercase tracking-[0.15em] text-[13px] transition-all mt-4 px-8">
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </Button>
              </form>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#282828] mb-8 pb-4 border-b-2 border-[#282828]">
                Get in Touch
              </h2>
              
              <div className="flex flex-col gap-10 pt-2">
                {contactMethods.map((method, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <h3 className="text-[12px] font-black text-[#282828] uppercase tracking-[0.15em]">{method.title}</h3>
                    <p className="text-[15px] text-[#525252] font-semibold tracking-[0.05em]">{method.value}</p>
                  </div>
                ))}
              </div>

              {/* Promise Block */}
              <div className="mt-16 bg-[#282828] text-white p-10 rounded-[2px] shadow-2xl shadow-black/10">
                <h3 className="text-lg font-black uppercase tracking-[0.15em] mb-5 border-b border-white/20 pb-4">
                  OUR PROMISE
                </h3>
                <p className="text-[13px] font-medium tracking-[0.05em] leading-[1.8] text-neutral-300">
                  WE STRIVE TO PROVIDE THE BEST POSSIBLE SUPPORT FOR OUR COMMUNITY. EVERY MESSAGE IS PERSONALLY READ AND HANDLED BY OUR DEDICATED IN-HOUSE TEAM. YOU CAN EXPECT A THOUGHTFUL RESPONSE WITHIN 24 HOURS ON REGULAR BUSINESS DAYS.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
