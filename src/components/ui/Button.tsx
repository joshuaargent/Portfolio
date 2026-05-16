'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
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
    // Build variant styles with explicit text colors using !important
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return 'bg-[#0D9488] !text-white hover:bg-[#0F766E] shadow-sm';
        case 'secondary':
          return 'bg-[#F5F5F4] !text-[#1C1917] hover:bg-[#E7E5E4] border border-[#E7E5E4]';
        case 'outline':
          return 'border border-[#E7E5E4] bg-transparent !text-[#1C1917] hover:bg-[#F5F5F4]';
        case 'ghost':
          return '!text-[#1C1917] hover:bg-[#F5F5F4]';
        case 'link':
          return '!text-[#0D9488] hover:!text-[#0F766E] underline-offset-4 hover:underline';
        case 'danger':
          return 'bg-red-600 !text-white hover:bg-red-700';
        default:
          return 'bg-[#0D9488] !text-white hover:bg-[#0F766E]';
      }
    };

    const buttonStyles = cn(buttonBaseStyles, getVariantStyles(), sizeStyles[size], className);

    if (asChild) {
      // When asChild is true, we render a wrapper that applies button styles
      // The child (Link) will inherit the text color
      return (
        <button ref={ref} className={buttonStyles} disabled={disabled || isLoading} {...props}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
          <span className="contents">{children}</span>
          {!isLoading && rightIcon}
        </button>
      );
    }

    return (
      <button ref={ref} className={buttonStyles} disabled={disabled || isLoading} {...props}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
