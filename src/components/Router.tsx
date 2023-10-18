import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '@/pages/home';
import PostList from '@/pages/posts';
import Detail from '@/pages/posts/Detail';
import NewPost from '@/pages/posts/NewPost';
import EditPost from '@/pages/posts/EditPost';
import ProfilePage from '@/pages/profile';
import LoginPage from '@/pages/login';
import SignUpPage from '@/pages/signup';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<Detail />} />
      <Route path="/posts/new" element={<NewPost />} />
      <Route path="/posts/edit/:id" element={<EditPost />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
