import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import styled from 'styled-components';
import { db } from '@/firebase';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { CATEGORYS, CategoryType } from '@/lib/constants';

interface PostListComponentProps {
  Navigation?: boolean;
  defaultTap?: TabType | CategoryType;
}

interface TabProps {
  $active: boolean;
}

type TabType = 'all' | 'my';

export interface PostsProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
}

const PostListComponent = ({
  Navigation = true,
  defaultTap = 'all',
}: PostListComponentProps) => {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTap,
  );
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const getPosts = useCallback(async () => {
    const postRef = collection(db, 'posts');
    let postQuery;

    if (activeTab === 'my' && user) {
      postQuery = query(
        postRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc'),
      );
    } else if (activeTab === 'all') {
      postQuery = query(postRef, orderBy('createdAt', 'desc'));
    } else {
      postQuery = query(
        postRef,
        where('category', '==', activeTab),
        orderBy('createdAt', 'desc'),
      );
    }

    const data = await getDocs(postQuery);

    setPosts([]);

    data?.forEach((doc) => {
      const dataObject = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObject as PostsProps]);
    });
  }, [activeTab, user, setPosts]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const onDelete = async (id: string) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');

    if (confirm && id) {
      await deleteDoc(doc(db, 'posts', id));

      toast.success('게시글을 삭제했습니다.');
      navigate('/');
      getPosts();
    }
  };

  return (
    <>
      {Navigation && (
        <PostNavigation>
          <Tab
            role="presentation"
            $active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            전체
          </Tab>
          <Tab
            role="presentation"
            $active={activeTab === 'my'}
            onClick={() => setActiveTab('my')}
          >
            나의 글
          </Tab>
          {CATEGORYS.map((category, index) => (
            <Tab
              key={index}
              role="presentation"
              $active={activeTab === category}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </Tab>
          ))}
        </PostNavigation>
      )}

      <PostList>
        {posts.length > 0 ? (
          posts?.map((post, index) => (
            <PostBox key={index}>
              <Link to={`/posts/${post?.id}`}>
                <PostProfileBox>
                  <PostProfile />
                  <PostAuthorName>{post.email}</PostAuthorName>
                  <PostDate>{post.updatedAt || post.createdAt}</PostDate>
                </PostProfileBox>
                <PostTitle> {post.title}</PostTitle>
                <PostSummary>{post.summary}</PostSummary>
              </Link>

              {post.email === user?.email && (
                <PostSettings>
                  <PostDelete
                    role="presentation"
                    onClick={() => onDelete(post.id as string)}
                  >
                    삭제
                  </PostDelete>
                  <PostEdit to={`/posts/edit/${post.id}`}>수정</PostEdit>
                </PostSettings>
              )}
            </PostBox>
          ))
        ) : (
          <NoPost>게시글이 없습니다.</NoPost>
        )}
      </PostList>
    </>
  );
};

const PostNavigation = styled.div`
  display: flex;
  gap: 12px;
  margin: 0 auto;
  max-width: 680px;
  font-size: 16px;
  color: gray;
  cursor: pointer;
  padding: 48px 20px 0 20px;
`;

const Tab = styled.div<TabProps>`
  cursor: pointer;
  padding: 10px;
  color: ${(props) => (props.$active ? 'black' : 'gray')};
`;

/* const PostAll = styled.div`
  color: black;
  font-weight: 600;
`;

const PostMy = styled.div``; */

const PostList = styled.div`
  min-height: 90vh;
  padding: 20px;
  text-align: left;
  line-height: 24px;
  max-width: 680px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const PostBox = styled.div`
  padding: 24px 0;
  border-top: 1px solid #f2f2f2;
`;

const PostProfileBox = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  align-items: center;
`;

const PostProfile = styled.div`
  width: 36px;
  height: 36px;
  background-color: #f2f2f2;
  border-radius: 50%;
`;

const PostAuthorName = styled.div`
  color: gray;
`;

const PostDate = styled.div`
  color: gray;
`;

const PostTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 14px 0px;
`;

const PostSummary = styled.div`
  color: dimgray;
  font-size: 16px;
`;

const PostSettings = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  font-size: 14px;
  color: gray;
`;

const PostDelete = styled.div`
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
  }
`;

const PostEdit = styled(Link)`
  &:hover,
  &:focus {
    color: black;
  }
`;

const NoPost = styled.div`
  padding: 24px;
  text-align: center;
  color: gray;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
`;

export default PostListComponent;
