import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModelPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
}

export function ModelPreviewModal({ isOpen, onClose, productImage }: ModelPreviewModalProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedSkinTone, setSelectedSkinTone] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const skinTones = [
    { name: 'Light', hex: '#FAD6B1' },
    { name: 'Medium', hex: '#C68642' },
    { name: 'Deep', hex: '#8D5524' },
    { name: 'Rich', hex: '#3C200B' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock AI generation delay
    setTimeout(() => {
      // Just reuse the product image with a filter/opacity effect as a mock
      setPreviewImage(productImage);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl rounded-sm shadow-xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 bg-neutral-100 relative min-h-[400px] flex items-center justify-center">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center text-neutral-400">
                  <Sparkles size={32} className="animate-pulse mb-4" />
                  <p className="text-sm font-semibold tracking-wider uppercase">Generating AI Preview...</p>
                </div>
              ) : previewImage ? (
                <img 
                  src={previewImage} 
                  alt="AI Model Preview" 
                  className="w-full h-full object-cover mix-blend-multiply" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-neutral-400">
                  <UserCircle size={48} className="mb-4 text-neutral-300" />
                  <p className="text-sm">Select options and click generate</p>
                </div>
              )}
            </div>

            {/* Right Side - Controls */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl font-bold text-charcoal flex items-center gap-2">
                    <Sparkles size={20} className="text-charcoal" /> AI Model Preview
                  </h2>
                  <p className="text-sm text-neutral-500">See how it looks on different body types.</p>
                </div>
                <button onClick={onClose} className="p-2 -mr-2 text-neutral-400 hover:text-charcoal transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-8 flex-1">
                {/* Size Selection */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3 block">
                    Model Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 border text-center transition-colors text-sm font-semibold ${
                          selectedSize === size ? 'border-charcoal bg-neutral-50 text-charcoal' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skin Tone Selection */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-3 block">
                    Skin Tone
                  </label>
                  <div className="flex gap-4">
                    {skinTones.map(tone => (
                      <button
                        key={tone.name}
                        onClick={() => setSelectedSkinTone(tone.name)}
                        className={`w-12 h-12 rounded-full border-2 transition-transform ${
                          selectedSkinTone === tone.name ? 'border-charcoal scale-110' : 'border-transparent hover:scale-105'
                        }`}
                      >
                        <span 
                          className="block w-full h-full rounded-full border border-neutral-200"
                          style={{ backgroundColor: tone.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                <Button 
                  className="w-full py-6 text-lg flex items-center justify-center gap-2" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : (
                    <>
                      <Sparkles size={18} /> Generate Preview
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
