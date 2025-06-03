import { useQuery } from '@tanstack/react-query';
import { searchUsers, getInitialUsers } from '@/services/github';
 

export const useUsers = (searchQuery?: string) => {
  return useQuery({
    queryKey: ['users', searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        return searchUsers(searchQuery);
      }
      return getInitialUsers();
    },
    enabled: true,
  });
}; 