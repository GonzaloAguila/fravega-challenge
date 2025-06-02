export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface UserDetail extends User {
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
} 