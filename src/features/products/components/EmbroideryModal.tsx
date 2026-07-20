import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';

interface EmbroideryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: { text: string; font: string; color: string; price: number }) => void;
}

export function EmbroideryModal({ isOpen, onClose, onSave }: EmbroideryModalProps) {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Classic');
  const [color, setColor] = useState('Navy');
  
  const price = 15; // $15 flat fee for embroidery

  const fonts = ['Classic', 'Script', 'Modern', 'Block'];
  const colors = [
    { name: 'Navy', hex: '#1B2A4A' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Charcoal', hex: '#333333' },
    { name: 'Burgundy', hex: '#722F37' },
  ];

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({ text, font, color, price });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg rounded-sm shadow-xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl font-bold text-charcoal">Add Custom Embroidery</h2>
                  <p className="text-sm text-neutral-500">+{formatCurrency(price)} • Up to 20 characters</p>
                </div>
                <button onClick={onClose} className="p-2 -mr-2 text-neutral-400 hover:text-charcoal transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-8 overflow-y-auto max-h-[60vh]">
                {/* Text Input */}
                <div>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                    <Type size={14} /> Text
                  </label>
                  <Input 
                    placeholder="e.g. Dr. Jane Smith" 
                    value={text}
                    onChange={(e) => setText(e.target.value.substring(0, 20))}
                    className="text-lg py-6"
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs ${text.length === 20 ? 'text-red-500' : 'text-neutral-400'}`}>
                      {text.length}/20
                    </span>
                  </div>
                </div>

                {/* Font Selection */}
                <div>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                    Font Style
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {fonts.map(f => (
                      <button
                        key={f}
                        onClick={() => setFont(f)}
                        className={`p-3 border text-center transition-colors ${
                          font === f ? 'border-charcoal bg-neutral-50 text-charcoal font-semibold' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}
                        style={{ fontFamily: f === 'Script' ? 'cursive' : f === 'Modern' ? 'sans-serif' : 'serif' }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3">
                    <Palette size={14} /> Thread Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        className={`group relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                          color === c.name ? 'border-charcoal' : 'border-transparent hover:border-neutral-300'
                        }`}
                        title={c.name}
                      >
                        <span 
                          className="w-10 h-10 rounded-full border border-neutral-200 shadow-sm"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Preview Area */}
                <div className="bg-neutral-50 p-6 rounded-sm border border-neutral-200 flex flex-col items-center justify-center min-h-[120px]">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 font-semibold">Preview</p>
                  <p 
                    className="text-2xl break-all text-center max-w-full"
                    style={{ 
                      fontFamily: font === 'Script' ? 'cursive' : font === 'Modern' ? 'sans-serif' : 'serif',
                      color: colors.find(c => c.name === color)?.hex,
                      textShadow: color === 'White' ? '0 0 2px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    {text || 'Your Text Here'}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-neutral-50 flex gap-4">
                <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                <Button className="flex-1" disabled={!text.trim()} onClick={handleSave}>
                  Save Embroidery
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
