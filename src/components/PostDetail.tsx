import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostsProps } from './PostList';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';

const PostDetailComponent = () => {
  const [post, setPost] = useState<PostsProps | null>(null);
  const { user } = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostsProps) });
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost(params.id);
    }
  }, [params.id]);

  const onDelete = async () => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');

    if (confirm && post && post.id) {
      await deleteDoc(doc(db, 'posts', post.id));

      toast.success('게시글을 삭제했습니다.');
      navigate('/');
    }
  };

  const onCategoryClick = () => {
    navigate('/', {
      state: {
        selectedCategory: post?.category === 'free' ? 'all' : post?.category,
      },
    });
  };

  return (
    <>
      <PostDetail>
        {post ? (
          <PostBox>
            <PostTitle>{post.title}</PostTitle>
            <PostProfileBox>
              <PostProfile />
              <PostAuthorName>{post.email}</PostAuthorName>
              <PostDate>{post.createdAt}</PostDate>
            </PostProfileBox>
            <PostSettings>
              {post.category && (
                <PostCategory onClick={onCategoryClick}>
                  {post.category}
                </PostCategory>
              )}

              {post.email === user?.email && (
                <>
                  <PostDelete role="presentation" onClick={onDelete}>
                    삭제
                  </PostDelete>
                  <PostEdit>
                    <Link to={`/posts/edit/${post.id}`}>수정</Link>
                  </PostEdit>
                </>
              )}
            </PostSettings>
            <PostText>{post.content}</PostText>
          </PostBox>
        ) : (
          <Loading />
        )}
      </PostDetail>
    </>
  );
};

const PostDetail = styled.div`
  min-height: 90vh;
  padding: 20px;
  text-align: left;
  line-height: 24px;
  max-width: 680px;
  margin: 0 auto;
`;

const PostBox = styled.div`
  padding: 24px 0;
  border-top: 1px solid #f2f2f2;
`;

const PostTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 14px 0px;
  line-height: 40px;
`;

const PostProfileBox = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  align-items: center;
  padding: 10px 0;
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

const PostText = styled.div`
  color: dimgray;
  font-size: 16px;
  padding: 20px 0;
  white-space: pre-wrap;
`;

const PostSettings = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: gray;
  padding: 10px 0;
  border-top: 1px solid #f2f2f2;
  flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
`;

const PostCategory = styled.div`
  cursor: pointer;
  color: gray;
  border: 1px solid lightgray;
  background: #f2f2f2;
  padding: 0px 4px;
  border-radius: 10px;
  font-size: 12px;
`;

const PostDelete = styled.div`
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
  }
`;

const PostEdit = styled.div`
  &:hover,
  &:focus {
    color: black;
  }
`;

export default PostDetailComponent;
