import { User, UserDetail, Repository } from '@/types';
import toast from 'react-hot-toast';

const BASE_URL = 'https://api.github.com';

const statusErrorMessageMapper: Record<number, string> = {
  403: 'Has superado el límite de peticiones a la API de GitHub. Intenta más tarde.',
  404: 'No se encontraron resultados para tu búsqueda.',
  500: 'Error interno del servidor de GitHub.',
};

const getErrorMessage = (status: number, defaultMsg: string) => {
  return statusErrorMessageMapper[status] || defaultMsg;
};

export const searchUsers = async (query: string, limit: number = 40): Promise<User[]> => {
  if (!query) return [];

  const response = await fetch(`${BASE_URL}/search/users?q=${query}&per_page=${limit}`);

  if (!response.ok) {
    const msg = getErrorMessage(response.status, 'Error al buscar usuarios');
    toast.error(msg);
    console.error('Error al buscar usuarios', response.status, response.statusText);
    throw new Error(msg);
  }

  const data = await response.json();
  return data.items;
};

export const getUserDetails = async (username: string): Promise<UserDetail> => {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) {
    const msg = getErrorMessage(response.status, 'Error al obtener detalles del usuario');
    toast.error(msg);
    console.error('Error al obtener detalles del usuario', response.status, response.statusText);
    throw new Error(msg);
  }

  return response.json();
};

export const getUserRepos = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);

  if (!response.ok) {
    const msg = getErrorMessage(response.status, 'Error al obtener repositorios del usuario');
    toast.error(msg);
    console.error('Error al obtener repositorios del usuario', response.status, response.statusText);
    throw new Error(msg);
  }

  return response.json();
};

export const getInitialUsers = async (limit: number = 40): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users?since=0&per_page=${limit}`);

  if (!response.ok) {
    const msg = getErrorMessage(response.status, 'Error al obtener usuarios iniciales');
    toast.error(msg);
    console.error('Error al obtener usuarios iniciales', response.status, response.statusText);
    throw new Error(msg);
  }

  return response.json();
}; 