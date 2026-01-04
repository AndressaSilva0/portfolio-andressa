export interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    location: string;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export interface GitHubEvent {
    id: string;
    type: string;
    actor: {
        login: string;
        avatar_url: string;
    };
    repo: {
        name: string;
        url: string;
    };
    payload: any;
    created_at: string;
}

const BASE_URL = "https://api.github.com/users/AndressaSilva0";

export async function fetchGitHubProfile(): Promise<GitHubUser> {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
}

export async function fetchTopRepos(): Promise<GitHubRepo[]> {
    const res = await fetch(`${BASE_URL}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error("Failed to fetch repos");
    return res.json();
}

export async function fetchRecentActivity(): Promise<GitHubEvent[]> {
    const res = await fetch(`${BASE_URL}/events?per_page=10`);
    if (!res.ok) throw new Error("Failed to fetch activity");
    return res.json();
}
