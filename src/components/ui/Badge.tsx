import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-background-elevated text-text-secondary border border-border',
        cosmic: 'bg-cosmic-500/10 text-cosmic-400 border border-cosmic-500/20',
        accent: 'bg-accent-500/10 text-accent-400 border border-accent-500/20',
        energy: 'bg-energy-500/10 text-energy-400 border border-energy-500/20',
        success: 'bg-success-muted text-success border border-success/20',
        warning: 'bg-warning-muted text-warning border border-warning/20',
        error: 'bg-error-muted text-error border border-error/20',
        outline: 'border border-border text-text-secondary',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded-md',
        md: 'px-2.5 py-1 text-sm rounded-lg',
        lg: 'px-3 py-1.5 text-sm rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              variant === 'cosmic' && 'bg-cosmic-400',
              variant === 'accent' && 'bg-accent-400',
              variant === 'energy' && 'bg-energy-400',
              variant === 'success' && 'bg-success',
              variant === 'warning' && 'bg-warning',
              variant === 'error' && 'bg-error',
              (!variant || variant === 'default' || variant === 'outline') &&
                'bg-text-secondary'
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
