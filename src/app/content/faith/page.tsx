import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentFeed } from '@/components/content/ContentFeed';
import { getContentByCategory } from '@/data/content';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Faith',
  description: 'Content about faith, spirituality, and finding meaning.',
};

// ============================================
// Faith Content Page
// ============================================

export default async function FaithPage() {
  const content = await getContentByCategory('faith');

  return (
    <>
      <PageHeader
        title="Faith"
        description="Content about faith, spirituality, and finding meaning in life."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <ContentFeed
            content={content}
            columns={3}
            emptyMessage="No faith content yet. Check back soon!"
          />
        </div>
      </section>
    </>
  );
}
