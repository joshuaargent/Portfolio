import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { VideoGrid } from '@/components/video/VideoGrid';
import { getRunningShorts } from '@/data/videos';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Running Videos',
  description: 'All my daily running shorts and updates.',
};

// ============================================
// Running Videos Page
// ============================================

export default async function RunningVideosPage() {
  const videos = await getRunningShorts();

  return (
    <>
      <PageHeader
        title="Running Videos"
        description="Daily running shorts documenting my 5km journey."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <VideoGrid
            videos={videos}
            columns={3}
            emptyMessage="No running videos yet. Check back soon!"
          />
        </div>
      </section>
    </>
  );
}