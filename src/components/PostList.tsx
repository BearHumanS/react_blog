import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { CATEGORYS, CategoryType, useAdmin } from '@/lib/constants';
import ThemeContext from '@/context/ThemeContext';

interface PostListComponentProps {
  Navigation?: boolean;
  defaultTap?: TabType | CategoryType;
}

export interface TabProps {
  $active: boolean;
}

type TabType = 'all' | 'my';

export interface CommentsInterface {
  uid: string;
  content: string;
  email: string;
  createdAt: string;
}

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
  comments?: CommentsInterface[];
}

interface StyledProps {
  theme?: string;
  $minHeight?: string;
}

const PostListComponent = ({
  Navigation = true,
  defaultTap = 'all',
}: PostListComponentProps) => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;

  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    selectedCategory || defaultTap,
  );
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const { user } = useContext(AuthContext);
  const context = useContext(ThemeContext);

  const isAdmin = useAdmin();

  useEffect(() => {
    if (!selectedCategory) {
      setActiveTab(defaultTap);
    }
  }, [selectedCategory, defaultTap]);

  let minHeight;
  if (location.pathname === '/') {
    minHeight = '28vh';
  } else if (location.pathname === '/posts') {
    minHeight = '85vh';
  } else if (location.pathname === '/profile') {
    minHeight = '68vh';
  }

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
      postQuery = query(postRef, orderBy('createdAt', 'asc'));
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
        <PostNavigation theme={context.theme}>
          <Tab
            role="presentation"
            $active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            전체
          </Tab>
          {isAdmin && (
            <Tab
              role="presentation"
              $active={activeTab === 'my'}
              onClick={() => setActiveTab('my')}
            >
              나의 글
            </Tab>
          )}

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

      <PostList $minHeight={minHeight}>
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

const PostNavigation = styled.div<StyledProps>`
  display: flex;
  gap: 12px;
  margin: 0 auto;
  max-width: 680px;
  font-size: 16px;
  color: gray;
  cursor: pointer;
  padding: 48px 20px 0 20px;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 15px;
`;

const Tab = styled.div<TabProps>`
  cursor: pointer;
  padding: 10px;
  color: ${(props) => (props.$active ? props.theme.content : 'gray')};
  font-weight: ${(props) => (props.$active ? '600' : '400')};
`;

/* const PostAll = styled.div`
  color: black;
  font-weight: 600;
`;

const PostMy = styled.div``; */

const PostList = styled.div<StyledProps>`
  padding: 20px;
  text-align: left;
  line-height: 24px;
  max-width: 680px;
  margin: 0 auto;
  margin-bottom: 40px;
  min-height: ${(props) => props.$minHeight};
`;

const PostBox = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #f2f2f2;
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
  color: ${(props) => props.theme.profile};
`;

const PostDate = styled.div`
  color: ${(props) => props.theme.profile};
`;

const PostTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 14px 0px;
  color: ${(props) => props.theme.content};
`;

const PostSummary = styled.div`
  color: dimgray;
  font-size: 16px;
  color: ${(props) => props.theme.content};
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
  color: ${(props) => props.theme.color};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const PostEdit = styled(Link)`
  color: ${(props) => props.theme.color};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const NoPost = styled.div`
  padding: 24px;
  text-align: center;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
  color: ${(props) => props.theme.color};
`;

export default PostListComponent;
