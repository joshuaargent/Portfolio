'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, createElement } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

// ============================================
// Component
// ============================================

const sizeStyles: Record<string, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-14 px-7 text-lg',
  icon: 'h-10 w-10',
};

const buttonBaseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // Build variant styles with explicit text colors
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return 'bg-accent text-white hover:bg-accent-hover shadow-sm [&>*]:text-white';
        case 'secondary':
          return 'bg-bg-secondary text-text-primary hover:bg-border border border-border';
        case 'outline':
          return 'border border-border bg-transparent text-text-primary hover:bg-bg-secondary';
        case 'ghost':
          return 'text-text-primary hover:bg-bg-secondary';
        case 'link':
          return 'text-accent hover:text-accent-hover underline-offset-4 hover:underline';
        case 'danger':
          return 'bg-red-600 text-white hover:bg-red-700 [&>*]:text-white';
        default:
          return 'bg-accent text-white hover:bg-accent-hover [&>*]:text-white';
      }
    };

    const buttonStyles = cn(buttonBaseStyles, getVariantStyles(), sizeStyles[size], className);

    // Content to render
    const content = (
      <>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </>
    );

    // If asChild is true, we need to handle it differently
    // We'll wrap the content in a span with the button styles
    if (asChild) {
      // Return a span styled as a button that wraps the Link
      return (
        <span className={buttonStyles} data-disabled={disabled || isLoading ? '' : undefined}>
          {content}
        </span>
      );
    }

    return (
      <button ref={ref} className={buttonStyles} disabled={disabled || isLoading} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
