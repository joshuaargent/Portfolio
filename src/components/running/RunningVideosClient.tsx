'use client';

import { useState } from 'react';
import { VideoGrid } from '@/components/video/VideoGrid';
import { Pagination } from '@/components/shared/Pagination';
import { Video } from '@/types';

// ============================================
// Types
// ============================================

interface RunningVideosClientProps {
  videos: Video[];
}

// ============================================
// Component
// ============================================

const ITEMS_PER_PAGE = 12;

export function RunningVideosClient({ videos }: RunningVideosClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
  
  const paginatedVideos = videos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <VideoGrid
        videos={paginatedVideos}
        columns={3}
        emptyMessage="No running videos yet. Check back soon!"
      />
      
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