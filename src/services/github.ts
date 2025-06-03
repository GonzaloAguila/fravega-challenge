import { User, UserDetail, Repository } from '@/types';

const BASE_URL = 'https://api.github.com';

export const searchUsers = async (query: string): Promise<User[]> => {
  if (!query) return [];

  const response = await fetch(`${BASE_URL}/search/users?q=${query}`);

  if (!response.ok) {
    throw new Error('Error al buscar usuarios');
  }

  const data = await response.json();
  return data.items;
};

export const getUserDetails = async (username: string): Promise<UserDetail> => {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) {
    throw new Error('Error al obtener detalles del usuario');
  }

  return response.json();
};

export const getUserRepos = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);

  if (!response.ok) {
    throw new Error('Error al obtener repositorios del usuario');
  }

  return response.json();
};

export const getInitialUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users?since=0&per_page=10`);

  if (!response.ok) {
    throw new Error('Error al obtener usuarios iniciales');
  }

  return response.json();
}; 