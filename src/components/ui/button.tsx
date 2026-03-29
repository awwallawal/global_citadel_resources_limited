import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-neutral-300 disabled:text-neutral-500',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md',
        secondary:
          'border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-50',
        tertiary: 'group gap-2 text-primary-600 hover:text-primary-700',
        gold: 'bg-gold-600 text-primary-900 hover:bg-gold-400 motion-safe:hover:-translate-y-px',
        ghost: 'text-neutral-700 hover:bg-neutral-100',
      },
      size: {
        default: 'px-8 py-4 text-base',
        sm: 'px-6 py-3 text-sm',
        lg: 'px-10 py-5 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
