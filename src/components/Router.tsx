import { useState } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '@/pages/home';
import PostList from '@/pages/posts';
import PostDetailPage from '@/pages/posts/detail';
import NewPostPage from '@/pages/posts/newPost';
import EditPostPage from '@/pages/posts/editPost';
import ProfilePage from '@/pages/profile';
import LoginPage from '@/pages/login';
import SignUpPage from '@/pages/signup';
import Layout from './Layout';

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route element={<Layout />}>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="/posts/edit/:id" element={<EditPostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default Router;
