import { useQuery } from '@tanstack/react-query';
import { searchUsers, getInitialUsers } from '@/services/github';
 

export const useUsers = (searchQuery?: string, limit: number = 40) => {
  return useQuery({
    queryKey: ['users', searchQuery, limit],
    queryFn: async () => {
      if (searchQuery) {
        return searchUsers(searchQuery, limit);
      }
      return getInitialUsers(limit);
    },
    enabled: true,
  });
}; 