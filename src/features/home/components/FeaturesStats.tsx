import React from 'react';
import { Truck, Sparkles, Gem } from 'lucide-react';
import { motion } from 'framer-motion';

export function FeaturesStats() {
  const features = [
    {
      icon: <Gem size={32} className="text-[#ff1da9]" />,
      title: "Premium Quality",
      description: "Our perfumes are crafted with the finest ingredients and excellent longevity.",
    },
    {
      icon: <Sparkles size={32} className="text-[#ff1da9]" />,
      title: "Luxury Packaging!",
      description: "We always add elegant packaging to any perfume you order from us.",
    },
    {
      icon: <Truck size={32} className="text-[#ff1da9]" />,
      title: "Fastest Shipping",
      description: "We deliver safely and securely even at the shortest notice.",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container-premium px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Top Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#ff1da9]/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-[#ff1da9] font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Counter */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#ff1da9] font-black text-6xl md:text-7xl mb-2">
            458,463
          </h2>
          <p className="text-[#ff1da9] font-bold text-xl">
            Successful Deliveries
          </p>
        </motion.div>
      </div>
    </section>
  );
}
