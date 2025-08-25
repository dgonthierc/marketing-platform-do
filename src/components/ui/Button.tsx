'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  // Base classes - Mobile-optimized with 44px minimum touch target
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] touch-manipulation select-none',
  {
    variants: {
      variant: {
        default: 
          'bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] shadow-lg hover:shadow-xl focus-visible:ring-[var(--color-primary-500)]',
        destructive: 
          'bg-[var(--color-error)] text-white hover:bg-red-600 focus-visible:ring-red-500',
        outline: 
          'border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] focus-visible:ring-[var(--color-primary-500)]',
        secondary: 
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
        ghost: 
          'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
        cta: 
          'bg-gradient-to-r from-[var(--color-primary-600)] to-blue-600 text-white shadow-2xl hover:from-[var(--color-primary-700)] hover:to-blue-700 transform hover:-translate-y-0.5 focus-visible:ring-[var(--color-primary-500)]',
        success:
          'bg-[var(--color-success)] text-white hover:bg-green-600 focus-visible:ring-green-500',
      },
      size: {
        default: 'h-11 px-6 py-2 text-base', // 44px height for mobile
        sm: 'h-9 px-4 text-sm',
        lg: 'h-14 px-8 text-lg', // Premium CTA size
        xl: 'h-16 px-10 text-xl', // Extra large for hero CTAs
        icon: 'h-11 w-11', // Square touch target
        full: 'h-11 w-full', // Mobile-friendly full width
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2" aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };