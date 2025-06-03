import { UserDetailLayout } from '@/layouts/UserDetail/UserDetailLayout';
import { getUserDetails, getUserRepos } from '@/services/github';
import { Repository, UserDetail } from '@/types';
import { GetServerSideProps } from 'next';

interface UserDetailPageProps {
  user: UserDetail;
  repositories: Repository[];
}

export default function UserDetailPage({ user, repositories }: UserDetailPageProps) {
  return <UserDetailLayout user={user} repos={repositories} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const username = params?.username as string;
    const [user, repositories] = await Promise.all([
      getUserDetails(username),
      getUserRepos(username),
    ]);

    return {
      props: {
        user,
        repositories,
      },
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    return {
      notFound: true,
    };
  }
}; 