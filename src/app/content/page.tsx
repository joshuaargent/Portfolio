import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentFeed } from '@/components/content/ContentFeed';
import { CategoryFilterWrapper } from '@/components/content/CategoryFilterWrapper';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { getContentPieces } from '@/data/content';
import { contentCategories } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Videos and articles about faith, learning, psychology, health, and performance.',
};

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
          <div className="mb-8">
            <SectionHeading title="Categories" />
            <div className="mt-4">
              <CategoryFilterWrapper
                categories={categories}
                onCategoryChange={(categoryId) => {
                  console.log('Selected category:', categoryId);
                }}
              />
            </div>
          </div>

          <ContentFeed content={content} columns={3} emptyMessage="No content found." />

          <div className="mt-16">
            <SectionHeading title="Content Schedule" subtitle="What I create each week." />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <h3 className="text-text-primary font-semibold">1 Long-form Video</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Deep dive into the book of the week
                </p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">7 Short Videos</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Key ideas and insights from the book
                </p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">Daily Running Shorts</h3>
                <p className="text-text-secondary mt-1 text-sm">Quick updates from my daily 5km</p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">Weekly Blog Post</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Longer thoughts on learning and growth
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
