import Link from 'next/link';
import { Youtube, Instagram } from 'lucide-react';
import { getYouTubeStats } from '@/lib/youtube';
import { formatCompactNumber } from '@/lib/utils';

// ============================================
// Social Stats Bar Component
// ============================================

export async function SocialStatsBar() {
  const ytStats = await getYouTubeStats();
  
  if (!ytStats) {
    // Only show minimal bar if no stats available
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-t border-border py-2">
      <div className="container flex items-center justify-center gap-6 md:gap-8">
        {/* YouTube */}
        <Link 
          href="https://youtube.com/@joshua_argent"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <Youtube className="h-4 w-4" />
          <span className="font-medium">{formatCompactNumber(ytStats.subscriberCount)}</span>
          <span className="text-text-muted text-xs">subscribers</span>
        </Link>
        
        <span className="text-border">|</span>
        
        {/* Instagram */}
        <Link 
          href="https://instagram.com/joshua_argent"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <Instagram className="h-4 w-4" />
          <span className="text-xs text-text-muted">Follow</span>
        </Link>
      </div>
    </div>
  );
}