import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginInput } from '@/features/auth/api/schemas';
import { useLogin } from '@/features/auth/api/hooks';

export const Route = createFileRoute('/_auth/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
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
          Welcome Back
        </h1>
        <p className="text-neutral-500 text-sm">
          Sign in to your account to continue shopping.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" autoComplete="off">
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-500">
              Password
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-[11px] font-bold tracking-[0.1em] uppercase text-neutral-400 hover:text-charcoal transition-colors underline underline-offset-4"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className={`h-14 bg-neutral-50 border-transparent hover:border-neutral-200 focus:bg-white focus:border-charcoal transition-all pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-14 w-14 flex items-center justify-center text-neutral-400 hover:text-charcoal transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-4 w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <Loader2 className="animate-spin mr-2" size={18} />
          ) : null}
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-8">
        Don't have an account?{' '}
        <Link
          to="/auth/register"
          className="text-charcoal font-semibold hover:text-gold transition-colors"
        >
          Create one
        </Link>
      </p>
    </motion.div>
  );
}
