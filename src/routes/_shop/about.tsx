import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Sparkles, Heart, Globe2, Leaf } from 'lucide-react';

export const Route = createFileRoute('/_shop/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-white py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Crafting Your Signature Scent
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Roymall Scents was born from a simple idea: everyone deserves a signature scent. 
            We combine premium ingredients, masterful blending, and sustainable practices 
            to create fragrances you'll actually love wearing.
          </p>
        </div>
      </section>

      {/* Mission */}
      <ScrollReveal>
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4 block">
                Our Mission
              </span>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Elevating the Standard of Luxury Fragrances
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                We believe that what you wear as your scent shouldn't be an afterthought. Every note, 
                every essence, every bottle design is intentional — crafted from feedback 
                from thousands of fragrance enthusiasts across the globe.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                From everyday moments to special occasions, our goal is to make you feel confident, 
                comfortable, and ready to leave a lasting impression.
              </p>
            </div>
            <div className="bg-neutral-100 aspect-[4/5] rounded-sm flex items-center justify-center overflow-hidden">
              <img src="/images/hero_perfume.png" alt="Mission" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Values */}
      <ScrollReveal>
        <section className="py-20 px-6 bg-ivory">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">What Drives Us</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Our core values shape every decision, from formulation to delivery.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Sparkles, title: 'Quality First', desc: 'Premium ethically sourced ingredients blended to last all day.' },
                { icon: Heart, title: 'Human-Centered', desc: 'Every scent is designed with input from real fragrance lovers globally.' },
                { icon: Globe2, title: 'Inclusive Design', desc: 'Scents crafted for every individual and personality type.' },
                { icon: Leaf, title: 'Sustainability', desc: 'Recycled packaging, ethical sourcing, and clean ingredients.' },
              ].map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="bg-white p-6 rounded-sm border border-neutral-100 shadow-sm">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-primary mb-2">{value.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Team / CTA */}
      <ScrollReveal>
        <section className="py-20 px-6 bg-primary text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Roymall Scents Community</h2>
            <p className="text-neutral-300 mb-8 leading-relaxed">
              Over 50,000 fragrance enthusiasts trust Roymall Scents for their signature scent. 
              Join them and experience the difference premium blending makes.
            </p>
            <a
              href="/collections/women"
              className="inline-block bg-gold text-white font-bold px-8 py-4 rounded-sm hover:bg-white hover:text-primary transition-colors"
            >
              Shop the Collection
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
