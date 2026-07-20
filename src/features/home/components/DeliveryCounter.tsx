import React, { useEffect, useState } from 'react';

export function DeliveryCounter() {
  const [count, setCount] = useState(0);
  const target = 458463;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-white border-y border-neutral-100">
      <div className="container-premium text-center">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">
          Successful Perfume Deliveries
        </h2>
        <div className="text-4xl sm:text-5xl font-bold text-gold tabular-nums tracking-tight">
          {count.toLocaleString()}
        </div>
      </div>
    </section>
  );
}
