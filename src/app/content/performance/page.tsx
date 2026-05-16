import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentFeed } from '@/components/content/ContentFeed';
import { getContentByCategory } from '@/data/content';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Performance',
  description: 'Content about performance, productivity, and achieving your goals.',
};

// ============================================
// Performance Content Page
// ============================================

export default async function PerformancePage() {
  const content = await getContentByCategory('performance');

  return (
    <>
      <PageHeader
        title="Performance"
        description="Content about performance, productivity, and achieving your potential."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <ContentFeed
            content={content}
            columns={3}
            emptyMessage="No performance content yet. Check back soon!"
          />
        </div>
      </section>
    </>
  );
}
