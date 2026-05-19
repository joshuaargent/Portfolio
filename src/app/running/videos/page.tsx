import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { RunningVideosClient } from '@/components/running/RunningVideosClient';
import { getRunningVideosWithRuns } from '@/data/running';

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
  const videosWithRuns = await getRunningVideosWithRuns();

  return (
    <>
      <PageHeader
        title="Running Videos"
        description="Daily running shorts documenting my 5km journey."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <RunningVideosClient videosWithRuns={videosWithRuns} />
        </div>
      </section>
    </>
  );
}