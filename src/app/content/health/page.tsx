import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentFeed } from '@/components/content/ContentFeed';
import { getContentByCategory } from '@/data/content';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Health',
  description: 'Content about health, fitness, and taking care of your body.',
};

// ============================================
// Health Content Page
// ============================================

export default async function HealthPage() {
  const content = await getContentByCategory('health');

  return (
    <>
      <PageHeader
        title="Health"
        description="Content about health, fitness, and taking care of your body and mind."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <ContentFeed
            content={content}
            columns={3}
            emptyMessage="No health content yet. Check back soon!"
          />
        </div>
      </section>
    </>
  );
}
