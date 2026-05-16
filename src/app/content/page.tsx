import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentFeed } from '@/components/content/ContentFeed';
import { CategoryFilter } from '@/components/content/CategoryFilter';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getContentPieces } from '@/data/content';
import { contentCategories } from '@/lib/constants';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Content',
  description: 'Videos and articles about faith, learning, psychology, health, and performance.',
};

// ============================================
// Content Page
// ============================================

export default async function ContentPage() {
  const content = await getContentPieces();

  const categories = contentCategories.map((cat) => ({
    id: cat.id,
    label: cat.label,
  }));

  return (
    <>
      <PageHeader
        title="Content"
        description="I create content about things that matter: faith, learning, psychology, health, and performance."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {/* Categories */}
          <div className="mb-8">
            <SectionHeading title="Categories" />
            <div className="mt-4">
              <CategoryFilter
                categories={categories}
                selected={null}
                onSelect={(category) => {
                  // TODO: Implement category filtering
                  console.log('Selected category:', category);
                }}
              />
            </div>
          </div>

          {/* Content Feed */}
          <ContentFeed content={content} columns={3} emptyMessage="No content found." />

          {/* Content Schedule */}
          <div className="mt-16">
            <SectionHeading title="Content Schedule" subtitle="What I create each week." />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-bg-card border-border rounded-xl border p-4">
                <h3 className="text-text-primary font-semibold">1 Long-form Video</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Deep dive into the book of the week
                </p>
              </div>
              <div className="bg-bg-card border-border rounded-xl border p-4">
                <h3 className="text-text-primary font-semibold">7 Short Videos</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Key ideas and insights from the book
                </p>
              </div>
              <div className="bg-bg-card border-border rounded-xl border p-4">
                <h3 className="text-text-primary font-semibold">Daily Running Shorts</h3>
                <p className="text-text-secondary mt-1 text-sm">Quick updates from my daily 5km</p>
              </div>
              <div className="bg-bg-card border-border rounded-xl border p-4">
                <h3 className="text-text-primary font-semibold">Weekly Blog Post</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Longer thoughts on learning and growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
