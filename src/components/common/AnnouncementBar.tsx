import React, { useState } from 'react';
import { X } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white py-2.5 px-4 text-center relative z-[51]">
      <div className="max-w-xl mx-auto">
        <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase">
          FREE SHIPPING ON ALL FRAGRANCES OVER $50
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
