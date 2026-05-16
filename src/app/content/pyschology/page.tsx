import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentFeed } from '@/components/content/ContentFeed';
import { getContentByCategory } from '@/data/content';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Psychology',
  description: 'Content about psychology, behavior, and the human mind.',
};

// ============================================
// Psychology Content Page
// ============================================

export default async function PsychologyPage() {
  const content = await getContentByCategory('psychology');

  return (
    <>
      <PageHeader
        title="Psychology"
        description="Content about psychology, behavior, and understanding the human mind."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <ContentFeed
            content={content}
            columns={3}
            emptyMessage="No psychology content yet. Check back soon!"
          />
        </div>
      </section>
    </>
  );
}
