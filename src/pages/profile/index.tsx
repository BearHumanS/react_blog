import Profile from '@/components/Profile';
import PostList from '@/components/PostList';

const ProfilePage = () => {
  return (
    <>
      <Profile />
      <PostList Navigation={false} />
    </>
  );
};

export default ProfilePage;
