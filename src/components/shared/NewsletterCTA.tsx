'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// ============================================
// Types
// ============================================

export interface NewsletterCTAProps {
  className?: string;
  variant?: 'default' | 'compact';
}

// ============================================
// Component
// ============================================

export function NewsletterCTA({ className, variant = 'default' }: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setIsSubscribed(true);
      toast.success('Thanks for subscribing!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn('bg-bg-secondary rounded-xl p-6', className)}>
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-accent-light rounded-lg p-2">
            <Mail className="text-accent h-5 w-5" />
          </div>
          <div>
            <h3 className="text-text-primary font-semibold">Stay updated</h3>
            <p className="text-text-secondary text-sm">Get my latest content in your inbox</p>
          </div>
        </div>
        {isSubscribed ? (
          <div className="text-accent flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span className="font-medium">You&apos;re subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button type="submit" isLoading={isLoading} style={{ color: '#ffffff' }}>
              Subscribe
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className={cn('bg-bg-secondary rounded-2xl p-8 md:p-12', className)}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="bg-accent-light mb-4 inline-flex rounded-xl p-3">
          <Mail className="text-accent h-6 w-6" />
        </div>
        <h2 className="text-text-primary text-2xl font-bold md:text-3xl">Stay in the loop</h2>
        <p className="text-text-secondary mt-3">
          Get my latest videos, book summaries, and thoughts on faith, learning, and performance
          delivered to your inbox. No spam, unsubscribe anytime.
        </p>
        {isSubscribed ? (
          <div className="bg-accent-light text-accent mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3">
            <Check className="h-5 w-5" />
            <span className="font-medium">You&apos;re subscribed!</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex w-full max-w-xs flex-col items-center gap-3"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full text-center"
              required
            />
            <Button type="submit" isLoading={isLoading} style={{ color: '#ffffff' }}>
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
