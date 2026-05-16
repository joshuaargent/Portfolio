import { GitHubRepo } from '@/types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const BASE_URL = 'https://api.github.com';

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  if (!GITHUB_USERNAME) {
    console.warn('GitHub username not configured');
    return [];
  }

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const repos: any[] = [];
    let page = 1;
    let hasNextPage = true;

    // Paginate through all pages (GitHub returns max 100 per page)
    while (hasNextPage) {
      const response = await fetch(
        `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&page=${page}&type=owner`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.length || data.length === 0) {
        hasNextPage = false;
      } else {
        repos.push(...data);
        page++;
        // Safety limit to prevent infinite loops
        if (page > 10) {
          console.warn('GitHub API: Reached max pages (10), truncating');
          hasNextPage = false;
        }
      }
    }

    return repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || repo.name,
        url: repo.html_url,
        homepage: repo.homepage || undefined,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || undefined,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        isFork: repo.fork,
      }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGitHubProfile() {
  if (!GITHUB_USERNAME) return null;

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 86400 },
    });

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

export async function getGitHubReadme(owner: string, repo: string): Promise<string | null> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.html+json',
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  } else {
    console.warn('No GitHub token configured - README fetch may be rate limited');
  }

  try {
    const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/readme`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`GitHub readme failed: ${response.status} for ${owner}/${repo}`);
      return null;
    }

    const data = await response.json();
    if (!data.content) {
      console.log(`Empty readme for ${owner}/${repo}`);
      return null;
    }
    
    console.log(`Successfully fetched readme for ${owner}/${repo}: ${data.content.length} chars`);
    return data.content;
  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    return null;
  }
}
