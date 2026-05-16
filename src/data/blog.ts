import { BlogPost } from "@/types";

// ============================================
// Blog Posts Data - Add your blog posts here
// ============================================

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-run-every-day",
    title: "Why I Run Every Day",
    excerpt:
      "The story behind my daily 5km running habit and what it has taught me about consistency, discipline, and showing up.",
    content: `
      <p>I started running every day on October 20, 2024. As of today, I'm on day 87. Here's why I started and what I've learned.</p>
      
      <h2>The Beginning</h2>
      <p>It wasn't a dramatic decision. I just decided to run 5km every day for a week. That week turned into a month, and a month turned into a habit.</p>
      
      <h2>What Running Has Taught Me</h2>
      <p>Running every day has taught me more about discipline than anything else I've done. Here are the key lessons:</p>
      
      <h3>1. Start Small</h3>
      <p>5km is achievable on even the worst days. It's not about the distance—it's about showing up.</p>
      
      <h3>2. Consistency Beats Intensity</h3>
      <p>A moderate effort every day beats a heroic effort once a week. The compound effect is real.</p>
      
      <h3>3. You Don't Always Feel Like It</h3>
      <p>Some days you feel great. Some days you don't. You run anyway. That's the point.</p>
      
      <h2>The Results</h2>
      <p>After 87 days:</p>
      <ul>
        <li>435km total distance</li>
        <li>Better sleep</li>
        <li>More energy throughout the day</li>
        <li>Improved mental clarity</li>
        <li>A deeper understanding of discipline</li>
      </ul>
      
      <h2>Should You Try It?</h2>
      <p>If you're curious, start with a week. Just one week of daily running. See how it feels. You might surprise yourself.</p>
    `,
    publishedAt: "2025-01-12",
    tags: ["running", "habits", "consistency", "personal"],
    category: ["health", "performance"],
    readingTime: "5 min read",
    featured: true,
    coverImage: "/images/blog/running.jpg",
  },
  {
    slug: "books-read-2024",
    title: "52 Books in 52 Weeks: My 2024 Reading Journey",
    excerpt:
      "A look back at the books I read in 2024, my favorites, and what I learned from reading one book per week.",
    content: `
      <p>In 2024, I set a goal to read one book per week. 52 books in 52 weeks. Here's how it went.</p>
      
      <h2>The Challenge</h2>
      <p>Reading one book per week sounds ambitious, but it's actually quite achievable when you break it down. Most books are 200-300 pages, which works out to about 30-40 pages per day.</p>
      
      <h2>My Top 5 Books of 2024</h2>
      <ol>
        <li><strong>Man's Search for Meaning</strong> by Viktor Frankl</li>
        <li><strong>Atomic Habits</strong> by James Clear</li>
        <li><strong>Deep Work</strong> by Cal Newport</li>
        <li><strong>The Courage to Be Disliked</strong> by Kishimi & Koga</li>
        <li><strong>Thinking, Fast and Slow</strong> by Daniel Kahneman</li>
      </ol>
      
      <h2>What I Learned</h2>
      <p>Reading consistently has transformed how I think and approach problems. Here are the key takeaways:</p>
      <ul>
        <li>Reading widely exposes you to diverse perspectives</li>
        <li>Taking notes helps retention</li>
        <li>Sharing what you learn reinforces understanding</li>
      </ul>
    `,
    publishedAt: "2024-12-30",
    tags: ["reading", "books", "learning", "personal"],
    category: ["learning", "performance"],
    readingTime: "8 min read",
    featured: false,
    coverImage: "/images/blog/books.jpg",
  },
  {
    slug: "building-in-public",
    title: "Building in Public: Why I Share My Journey",
    excerpt:
      "The benefits of sharing your work and progress publicly, and how it has helped me grow.",
    content: `
      <p>I've been building in public for the past year—sharing my running progress, book summaries, and coding projects. Here's why I think everyone should try it.</p>
      
      <h2>What is Building in Public?</h2>
      <p>Building in public means sharing your work, progress, and learnings openly as you create them, rather than waiting until everything is perfect.</p>
      
      <h2>Why I Do It</h2>
      <p>There are several reasons I've embraced this approach:</p>
      
      <h3>Accountability</h3>
      <p>When you share your goals publicly, you're more likely to follow through.</p>
      
      <h3>Feedback</h3>
      <p>Sharing early and often gives you valuable feedback that helps you improve.</p>
      
      <h3>Connection</h3>
      <p>Building in public attracts like-minded people and creates opportunities.</p>
      
      <h2>How to Start</h2>
      <p>You don't need a large audience to benefit from building in public. Start small:</p>
      <ul>
        <li>Share one thing you learned today</li>
        <li>Post about your progress on a project</li>
        <li>Write about your failures and what you learned</li>
      </ul>
    `,
    publishedAt: "2024-12-15",
    tags: ["content", "growth", "community"],
    category: ["learning", "performance"],
    readingTime: "6 min read",
    featured: false,
  },
  // Add more blog posts here...
];

// ============================================
// Helper Functions
// ============================================

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  return blogPosts.find((p) => p.slug === slug);
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getBlogPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  return blogPosts
    .filter((p) => p.category.includes(category as any))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getRecentBlogPosts(
  limit: number = 5,
): Promise<BlogPost[]> {
  return blogPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}
