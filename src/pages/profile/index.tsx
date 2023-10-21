import Profile from '@/components/Profile.1';
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
