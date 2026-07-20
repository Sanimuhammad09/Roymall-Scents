import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerSchema, type RegisterInput } from '@/features/auth/api/schemas';
import { useRegister } from '@/features/auth/api/hooks';

export const Route = createFileRoute('/_auth/auth/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    const { confirmPassword, ...payload } = data;
    registerMutation.mutate(payload);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-10 text-center">
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-charcoal mb-3 uppercase tracking-wider">
          Create Account
        </h1>
        <p className="text-neutral-500 text-sm">
          Join the Flairvigo community and discover premium fashion.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-500">
              First Name
            </label>
            <Input
              id="firstName"
              placeholder="Jane"
              autoComplete="given-name"
              {...register('firstName')}
              className={`h-14 bg-neutral-50 border-transparent hover:border-neutral-200 focus:bg-white focus:border-charcoal transition-all ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.firstName && (
              <span className="text-xs text-red-500 mt-1">{errors.firstName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-500">
              Last Name
            </label>
            <Input
              id="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              {...register('lastName')}
              className={`h-14 bg-neutral-50 border-transparent hover:border-neutral-200 focus:bg-white focus:border-charcoal transition-all ${errors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.lastName && (
              <span className="text-xs text-red-500 mt-1">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-500">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
            className={`h-14 bg-neutral-50 border-transparent hover:border-neutral-200 focus:bg-white focus:border-charcoal transition-all ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {errors.email && (
            <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-500">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              {...register('password')}
              className={`h-14 bg-neutral-50 border-transparent hover:border-neutral-200 focus:bg-white focus:border-charcoal transition-all pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-14 w-14 flex items-center justify-center text-neutral-400 hover:text-charcoal transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-500">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            {...register('confirmPassword')}
            className={`h-14 bg-neutral-50 border-transparent hover:border-neutral-200 focus:bg-white focus:border-charcoal transition-all ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</span>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-4 w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <Loader2 className="animate-spin mr-2" size={18} />
          ) : null}
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-8">
        Already have an account?{' '}
        <Link
          to="/auth/login"
          className="text-charcoal font-semibold hover:text-gold transition-colors"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
