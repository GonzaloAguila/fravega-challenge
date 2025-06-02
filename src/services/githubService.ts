import { User, UserDetail, Repository } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export const githubService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users`);
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw error;
    }
  },

  async searchUsers(query: string): Promise<{ items: User[] }> {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/search/users?q=${query}`);
      if (!response.ok) {
        throw new Error(`Error searching users: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in searchUsers:', error);
      throw error;
    }
  },

  async getUserDetails(username: string): Promise<UserDetail> {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
      if (!response.ok) {
        throw new Error(`Error fetching user details: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in getUserDetails:', error);
      throw error;
    }
  },

  async getUserRepositories(username: string): Promise<Repository[]> {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos`);
      if (!response.ok) {
        throw new Error(`Error fetching user repositories: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in getUserRepositories:', error);
      throw error;
    }
  }
}; 