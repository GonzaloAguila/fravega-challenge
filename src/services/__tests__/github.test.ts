import { searchUsers, getUserDetails, getUserRepos, getInitialUsers } from '../github';

// Mock fetch
global.fetch = jest.fn();

describe('Servicio de GitHub', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('searchUsers', () => {
    it('devuelve un array vacío cuando la búsqueda está vacía', async () => {
      const result = await searchUsers('');
      expect(result).toEqual([]);
    });

    it('devuelve usuarios cuando la búsqueda es exitosa', async () => {
      const mockUsers = [
        { id: 1, login: 'user1', avatar_url: 'url1', html_url: 'html1' },
        { id: 2, login: 'user2', avatar_url: 'url2', html_url: 'html2' },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ items: mockUsers }),
      });

      const result = await searchUsers('test');
      expect(result).toEqual(mockUsers);
    });

    it('da un error cuando la búsqueda falla', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'rate limit exceeded',
      });

      await expect(searchUsers('test')).rejects.toThrow('Has superado el límite de peticiones a la API de GitHub. Intenta más tarde.');
    });
  });

  describe('getUserDetails', () => {
    it('devuelve los detalles del usuario cuando es exitoso', async () => {
      const mockUser = {
        id: 1,
        login: 'user1',
        avatar_url: 'url1',
        html_url: 'html1',
        name: 'User One',
        bio: 'Test bio',
        followers: 100,
        following: 50,
        public_repos: 20,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });

      const result = await getUserDetails('user1');
      expect(result).toEqual(mockUser);
    });

    it('da un error cuando la request falla', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(getUserDetails('user1')).rejects.toThrow('No se encontraron resultados para tu búsqueda.');
    });
  });

  describe('getUserRepos', () => {
    it('devuelve los repositorios del usuario cuando es exitoso', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          description: 'Test repo 1',
          html_url: 'url1',
          stargazers_count: 100,
          language: 'JavaScript',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      });

      const result = await getUserRepos('user1');
      expect(result).toEqual(mockRepos);
    });

    it('da un error cuando la request falla', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(getUserRepos('user1')).rejects.toThrow('Error interno del servidor de GitHub.');
    });
  });

  describe('getInitialUsers', () => {
    it('devuelve los usuarios iniciales cuando es exitoso', async () => {
      const mockUsers = [
        { id: 1, login: 'user1', avatar_url: 'url1', html_url: 'html1' },
        { id: 2, login: 'user2', avatar_url: 'url2', html_url: 'html2' },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });

      const result = await getInitialUsers();
      expect(result).toEqual(mockUsers);
    });

    it('da un error cuando la request falla', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'rate limit exceeded',
      });

      await expect(getInitialUsers()).rejects.toThrow('Has superado el límite de peticiones a la API de GitHub. Intenta más tarde.');
    });
  });
}); 