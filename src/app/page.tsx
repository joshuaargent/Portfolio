import { Hero } from '@/components/home/Hero';
import { NowSection } from '@/components/home/NowSection';
import { PillarCards } from '@/components/home/PillarCards';
import { LatestContent } from '@/components/home/LatestContent';
import { FeaturedProject } from '@/components/home/FeaturedProject';
import { NewsletterCTA } from '@/components/shared/NewsletterCTA';
import { getFeaturedProjects } from '@/data/projects';

// ============================================
// Homepage
// ============================================

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <NowSection />
      <PillarCards />

      <section className="py-8 md:py-12">
        <div className="container">
          <LatestContent />
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="bg-bg-secondary py-8 md:py-12">
          <div className="container">
            <FeaturedProject project={featuredProjects[0]} />
          </div>
        </section>
      )}

      <section className="py-8 md:py-12">
        <div className="container">
          <NewsletterCTA />
        </div>
      </section>
    </>
  );
}
