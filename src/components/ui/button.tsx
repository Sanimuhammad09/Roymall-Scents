import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-heading',
  {
    variants: {
      variant: {
        default: 'bg-charcoal text-white hover:bg-charcoal-light shadow-premium hover:shadow-none',
        secondary: 'bg-transparent text-charcoal border-2 border-charcoal hover:bg-charcoal hover:text-white',
        gold: 'bg-gold text-white hover:bg-gold-dark shadow-glow hover:shadow-none',
        outline: 'border-2 border-neutral-200 bg-transparent hover:border-charcoal hover:bg-transparent text-charcoal',
        ghost: 'hover:bg-neutral-100 hover:text-charcoal text-neutral-600',
        link: 'text-charcoal underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-8 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

type MotionButtonProps = HTMLMotionProps<'button'> & VariantProps<typeof buttonVariants>;

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      />
    );
  }
);
MotionButton.displayName = 'MotionButton';

export { Button, MotionButton, buttonVariants };
