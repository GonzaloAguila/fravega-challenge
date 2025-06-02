import { Repository, User, UserDetail } from '@/types';

const GITHUB_API_URL = 'https://api.github.com';

export async function getInitialUsers(): Promise<User[]> {
  const response = await fetch(
    `${GITHUB_API_URL}/users?per_page=40`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener usuarios iniciales');
  }

  return response.json();
}

export async function searchUsers(query: string): Promise<User[]> {
  const response = await fetch(
    `${GITHUB_API_URL}/search/users?q=${encodeURIComponent(query)}&per_page=10`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al buscar usuarios');
  }

  const data = await response.json();
  return data.items;
}

export async function getUserDetails(username: string): Promise<UserDetail> {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener detalles del usuario');
  }

  return response.json();
}

export async function getUserRepositories(username: string): Promise<Repository[]> {
  const response = await fetch(
    `${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=10`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener repositorios del usuario');
  }

  return response.json();
} 