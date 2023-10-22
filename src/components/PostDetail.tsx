import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { PostsProps } from './PostList';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';

const PostDetailComponent = () => {
  const [post, setPost] = useState<PostsProps | null>(null);

  const params = useParams();

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

  const onDelete = () => {};

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
              <PostDelete role="presentation" onClick={onDelete}>
                삭제
              </PostDelete>
              <PostEdit>
                <Link to={`/posts/edit/${post.id}`}>수정</Link>
              </PostEdit>
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
