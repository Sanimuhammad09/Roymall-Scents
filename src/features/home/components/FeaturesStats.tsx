import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, Gem, Clock } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function AnimatedCounter({ from, to }: { from: number, to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, to, { duration: 3, ease: "easeOut" });
    return controls.stop;
  }, []);

  return <motion.span>{rounded}</motion.span>;
}

export function FeaturesStats() {
  const features = [
    {
      icon: <Gem size={32} className="text-gold" />,
      title: "Premium Quality",
      description: "Our perfumes are crafted with the finest ingredients and excellent longevity.",
    },
    {
      icon: <Sparkles size={32} className="text-gold" />,
      title: "Luxury Packaging!",
      description: "We always add elegant packaging to any perfume you order from us.",
    },
    {
      icon: <Truck size={32} className="text-gold" />,
      title: "Fastest Shipping",
      description: "We deliver safely and securely even at the shortest notice.",
    },
  ];

  // Countdown Logic (e.g., resets every 24 hours, or just counts down to a specific time)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) return prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container-premium px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Countdown Timer */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-4 bg-gold/5 p-6 rounded-lg mb-16 border border-gold/20"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-gold font-bold text-lg">
            <Clock size={24} className="text-gold animate-pulse" />
            <span>Order within</span>
          </div>
          <div className="flex gap-2">
            <div className="bg-gold text-black font-bold text-xl px-3 py-1.5 rounded-md min-w-[50px] text-center">
              {String(timeLeft.hours).padStart(2, '0')}h
            </div>
            <span className="text-gold font-bold text-xl py-1.5">:</span>
            <div className="bg-gold text-black font-bold text-xl px-3 py-1.5 rounded-md min-w-[50px] text-center">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
            <span className="text-gold font-bold text-xl py-1.5">:</span>
            <div className="bg-gold text-black font-bold text-xl px-3 py-1.5 rounded-md min-w-[50px] text-center">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>
          <div className="text-gold font-bold text-lg">
            for <span className="underline decoration-2 underline-offset-4">Same Day Delivery!</span>
          </div>
        </motion.div>

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
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-gold font-bold text-lg mb-2">{feature.title}</h3>
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
          <h2 className="text-gold font-black text-6xl md:text-7xl mb-2">
            <AnimatedCounter from={0} to={458463} />
          </h2>
          <p className="text-gold font-bold text-xl">
            Successful Deliveries
          </p>
        </motion.div>
      </div>
    </section>
  );
}
