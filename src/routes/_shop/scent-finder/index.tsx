import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_shop/scent-finder/')({
  component: ScentFinderPage,
});

function ScentFinderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    family: '',
    occasion: '',
    intensity: '',
  });
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = () => {
    setIsLoading(true);
    // Mock recommendation logic based on intensity/family
    setTimeout(() => {
      setRecommendation("Midnight Bloom Extrait");
      setIsLoading(false);
      setStep(4);
    }, 1500);
  };

  const steps = [
    {
      title: "Discover Your Scent Profile",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-500 mb-6 text-center">What type of fragrance notes naturally draw you in?</p>
          <div className="grid grid-cols-2 gap-4">
            {['Floral & Sweet', 'Woody & Earthy', 'Fresh & Citrus', 'Oriental & Spicy'].map(family => (
              <button
                key={family}
                onClick={() => {
                  setFormData({ ...formData, family });
                  handleNext();
                }}
                className={`p-6 border-2 text-center text-sm font-bold transition-colors ${
                  formData.family === family ? 'border-charcoal bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Primary Occasion",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-500 mb-6 text-center">When do you plan on wearing this fragrance the most?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Everyday Wear', 'Office & Professional', 'Date Night'].map(occ => (
              <button
                key={occ}
                onClick={() => {
                  setFormData({ ...formData, occasion: occ });
                  handleNext();
                }}
                className={`p-4 border-2 text-center text-sm font-medium transition-colors ${
                  formData.occasion === occ ? 'border-charcoal bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
          <div className="pt-4 flex justify-between">
            <Button variant="outline" onClick={handlePrev}>Back</Button>
          </div>
        </div>
      ),
    },
    {
      title: "Scent Intensity",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-500 mb-6 text-center">How noticeable do you want your fragrance to be?</p>
          <div className="space-y-3">
            {[
              { id: 'light', label: 'Light & Intimate', desc: 'Sits close to the skin, noticeable only to those very close.' },
              { id: 'moderate', label: 'Moderate & Lasting', desc: 'Leaves a pleasant trail without overwhelming the room.' },
              { id: 'strong', label: 'Strong & Powerful', desc: 'Bold projection, commands attention and lasts all day.' },
            ].map(int => (
              <button
                key={int.id}
                onClick={() => {
                  setFormData({ ...formData, intensity: int.id });
                }}
                className={`w-full p-4 border-2 text-left transition-colors flex justify-between items-center ${
                  formData.intensity === int.id ? 'border-charcoal bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="font-semibold text-charcoal">{int.label}</div>
                  <div className="text-xs text-neutral-500 mt-1">{int.desc}</div>
                </div>
                {formData.intensity === int.id && <CheckCircle2 className="text-charcoal" />}
              </button>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrev}>Back</Button>
            <Button onClick={handleSubmit} disabled={!formData.intensity || isLoading}>
              {isLoading ? 'Analyzing...' : 'Find My Scent'}
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Your Signature Scent",
      content: (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-charcoal text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
            <Sparkles size={32} />
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-2">We recommend: {recommendation}</h3>
          <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
            Based on your preference for {formData.intensity} intensity and {formData.family.split(' ')[0].toLowerCase()} notes, this fragrance is your perfect match.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Button onClick={() => navigate({ to: '/collections/all' })}>Shop This Match</Button>
          </div>
        </div>
      ),
    }
  ];

  return (
    <div className="min-h-[80vh] bg-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        
        {/* Progress Bar */}
        <div className="mb-8 flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-1.5 w-12 rounded-full transition-colors duration-500 ${
                i <= step && step < 4 ? 'bg-charcoal' : i < step ? 'bg-neutral-300' : 'bg-neutral-200'
              } ${step === 4 ? 'opacity-0' : ''}`}
            />
          ))}
        </div>

        <motion.div 
          className="bg-white p-8 sm:p-12 rounded-sm shadow-xl border border-neutral-100 min-h-[400px] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {step < 4 && (
            <div className="flex items-center justify-center w-12 h-12 bg-neutral-50 rounded-full mb-6 mx-auto text-charcoal">
              <Sparkles size={24} />
            </div>
          )}
          
          <h1 className={`text-2xl font-bold text-charcoal mb-8 ${step === 4 ? 'text-center hidden' : 'text-center'}`}>
            {steps[step - 1].title}
          </h1>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[step - 1].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
