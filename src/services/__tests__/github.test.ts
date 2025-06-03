import { searchUsers, getUserDetails, getUserRepos, getInitialUsers } from '../github';

// Mock fetch
global.fetch = jest.fn();

describe('GitHub Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('searchUsers', () => {
    it('returns empty array when query is empty', async () => {
      const result = await searchUsers('');
      expect(result).toEqual([]);
    });

    it('returns users when search is successful', async () => {
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

    it('throws error when search fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(searchUsers('test')).rejects.toThrow('Error al buscar usuarios');
    });
  });

  describe('getUserDetails', () => {
    it('returns user details when successful', async () => {
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

    it('throws error when request fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getUserDetails('user1')).rejects.toThrow('Error al obtener detalles del usuario');
    });
  });

  describe('getUserRepos', () => {
    it('returns user repositories when successful', async () => {
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

    it('throws error when request fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getUserRepos('user1')).rejects.toThrow('Error al obtener repositorios del usuario');
    });
  });

  describe('getInitialUsers', () => {
    it('returns initial users when successful', async () => {
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

    it('throws error when request fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getInitialUsers()).rejects.toThrow('Error al obtener usuarios iniciales');
    });
  });
}); 