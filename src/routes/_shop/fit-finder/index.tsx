import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/auth.store';

export const Route = createFileRoute('/_shop/fit-finder/')({
  component: FitFinderPage,
});

function FitFinderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    heightCm: '',
    weightKg: '',
    bodyShape: '',
    preferredFit: '',
  });
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        await api.post('/fit-profile', {
          ...formData,
          heightCm: Number(formData.heightCm),
          weightKg: Number(formData.weightKg),
        });
        const res = await api.get('/fit-profile');
        setRecommendation(res.data.data.recommendedSize);
      } else {
        // Mock recommendation for guests
        setTimeout(() => setRecommendation('M'), 1500);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setStep(5);
    }
  };

  const steps = [
    {
      title: "Let's find your perfect fit",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-500 mb-6">Select the option that best describes you.</p>
          <div className="grid grid-cols-2 gap-4">
            {['Women', 'Men'].map(gender => (
              <button
                key={gender}
                onClick={() => {
                  setFormData({ ...formData, gender: gender.toLowerCase() });
                  handleNext();
                }}
                className={`p-6 border-2 text-center font-medium transition-colors ${
                  formData.gender === gender.toLowerCase() ? 'border-charcoal bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Your measurements",
      content: (
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2 block">Height (cm)</label>
            <Input 
              type="number" 
              placeholder="e.g. 170" 
              value={formData.heightCm} 
              onChange={e => setFormData({ ...formData, heightCm: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-2 block">Weight (kg)</label>
            <Input 
              type="number" 
              placeholder="e.g. 65" 
              value={formData.weightKg} 
              onChange={e => setFormData({ ...formData, weightKg: e.target.value })}
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrev}>Back</Button>
            <Button onClick={handleNext} disabled={!formData.heightCm || !formData.weightKg}>Next</Button>
          </div>
        </div>
      ),
    },
    {
      title: "Body shape",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {['Slim', 'Average', 'Broad'].map(shape => (
              <button
                key={shape}
                onClick={() => {
                  setFormData({ ...formData, bodyShape: shape.toLowerCase() });
                  handleNext();
                }}
                className={`p-4 border-2 text-center text-sm font-medium transition-colors ${
                  formData.bodyShape === shape.toLowerCase() ? 'border-charcoal bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
          <div className="pt-4">
            <Button variant="outline" onClick={handlePrev}>Back</Button>
          </div>
        </div>
      ),
    },
    {
      title: "What is your preferred scent intensity?",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { id: 'slim', label: 'Light & Subtle', desc: 'Closer to the body' },
              { id: 'regular', label: 'Moderate & Lasting', desc: 'Classic, comfortable fit' },
              { id: 'relaxed', label: 'Strong & Powerful', desc: 'Looser, more room to move' },
            ].map(fit => (
              <button
                key={fit.id}
                onClick={() => {
                  setFormData({ ...formData, preferredFit: fit.id });
                }}
                className={`w-full p-4 border-2 text-left transition-colors flex justify-between items-center ${
                  formData.preferredFit === fit.id ? 'border-charcoal bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="font-semibold text-charcoal">{fit.label}</div>
                  <div className="text-xs text-neutral-500 mt-1">{fit.desc}</div>
                </div>
                {formData.preferredFit === fit.id && <CheckCircle2 className="text-charcoal" />}
              </button>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrev}>Back</Button>
            <Button onClick={handleSubmit} disabled={!formData.preferredFit || isLoading}>
              {isLoading ? 'Calculating...' : 'See My Size'}
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Your Perfect Fit",
      content: (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-charcoal text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
            {recommendation || 'M'}
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-2">We recommend size {recommendation || 'M'}</h3>
          <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
            Based on millions of data points and your unique preferences, this size will give you the best fit.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Button onClick={() => navigate({ to: '/collections/all' })}>Shop Recommended Size</Button>
            {isAuthenticated && (
              <p className="text-xs text-neutral-400 mt-4">We've saved this to your profile for easy shopping.</p>
            )}
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
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className={`h-1.5 w-12 rounded-full transition-colors duration-500 ${
                i <= step && step < 5 ? 'bg-charcoal' : i < step ? 'bg-neutral-300' : 'bg-neutral-200'
              } ${step === 5 ? 'opacity-0' : ''}`}
            />
          ))}
        </div>

        <motion.div 
          className="bg-white p-8 sm:p-12 rounded-sm shadow-xl border border-neutral-100 min-h-[400px] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {step < 5 && (
            <div className="flex items-center justify-center w-12 h-12 bg-neutral-50 rounded-full mb-6 mx-auto text-charcoal">
              <Ruler size={24} />
            </div>
          )}
          
          <h1 className={`text-2xl font-bold text-charcoal mb-8 ${step === 5 ? 'text-center hidden' : 'text-center'}`}>
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
