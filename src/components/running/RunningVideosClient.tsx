'use client';

import { useState } from 'react';
import { RunningVideoCard } from '@/components/running/RunningVideoCard';
import { Pagination } from '@/components/shared/Pagination';
import { Video, RunLog } from '@/types';

// ============================================
// Types
// ============================================

// Video paired with run data from Strava
interface VideoWithRun {
  video: Video;
  run?: RunLog;
}

interface RunningVideosClientProps {
  videosWithRuns: VideoWithRun[];
}

// ============================================
// Component
// ============================================

const ITEMS_PER_PAGE = 12;

export function RunningVideosClient({ videosWithRuns }: RunningVideosClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videosWithRuns.length / ITEMS_PER_PAGE);
  
  const paginatedVideos = videosWithRuns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedVideos.map((item) => (
          <RunningVideoCard key={item.video.id} video={item.video} run={item.run} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}