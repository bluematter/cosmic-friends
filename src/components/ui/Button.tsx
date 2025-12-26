'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-cosmic-gradient text-white shadow-glow-sm hover:shadow-glow-md hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-background-elevated border border-border text-text-primary hover:bg-background-hover hover:border-border-strong',
        ghost:
          'text-text-secondary hover:text-text-primary hover:bg-background-hover',
        outline:
          'border border-cosmic-500/50 text-cosmic-400 hover:bg-cosmic-500/10 hover:border-cosmic-400',
        accent:
          'bg-accent-500 text-white hover:bg-accent-600 shadow-glow-accent',
        energy:
          'bg-energy-500 text-white hover:bg-energy-600 shadow-glow-energy',
        destructive:
          'bg-error text-white hover:bg-error/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-lg',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-12 px-6 text-base rounded-xl',
        xl: 'h-14 px-8 text-lg rounded-xl',
        icon: 'h-10 w-10 rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
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
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className='h-4 w-4 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {rightIcon && !loading ? rightIcon : null}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
