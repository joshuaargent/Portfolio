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

    const response = await fetch(
      `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const data = await response.json();

    return data
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
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.html+json',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/readme`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // README might not exist
      if (response.status === 404) return null;
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content || null;
  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    return null;
  }
}
