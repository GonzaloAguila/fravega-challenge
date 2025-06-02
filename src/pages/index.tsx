import { HomeLayout } from '@/layouts/Home/HomeLayout';
import { searchUsers, getInitialUsers } from '@/services/github';
import { User } from '@/types';
import { GetServerSideProps } from 'next';

interface HomePageProps {
  users: User[];
  searchQuery?: string;
}

export default function HomePage({ users, searchQuery }: HomePageProps) {
  return <HomeLayout users={users} searchQuery={searchQuery} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const searchQuery = query.q as string;
    let users: User[] = [];

    if (searchQuery) {
      users = await searchUsers(searchQuery);
    } else {
      users = await getInitialUsers();
    }

    return {
      props: {
        users,
        searchQuery: searchQuery || null,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        users: [],
        searchQuery: null,
      },
    };
  }
}; 