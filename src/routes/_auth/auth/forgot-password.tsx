import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/features/auth/api/schemas';
import { useForgotPassword } from '@/features/auth/api/hooks';

export const Route = createFileRoute('/_auth/auth/forgot-password')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const forgotMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotMutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-10">
        <h1 className="heading-display text-3xl sm:text-4xl text-charcoal mb-3">
          Reset Password
        </h1>
        <p className="text-neutral-500 text-sm">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      {forgotMutation.isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-charcoal mb-2">Check Your Email</h3>
          <p className="text-sm text-neutral-500 mb-6">
            If your email is registered, you'll receive a password reset link shortly.
          </p>
          <Link to="/auth/login" className="text-sm font-semibold text-charcoal hover:text-gold transition-colors">
            ← Back to Sign In
          </Link>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-neutral-600">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full"
            disabled={forgotMutation.isPending}
          >
            {forgotMutation.isPending ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : null}
            Send Reset Link
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-neutral-500 mt-8">
        <Link
          to="/auth/login"
          className="text-charcoal font-semibold hover:text-gold transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </p>
    </motion.div>
  );
}
