import { db } from '@/firebase';
import { arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { CommentsInterface, PostsProps } from './PostList';
import AuthContext from '@/context/AuthContext';

interface CommentProps {
  post: PostsProps | null;
  // eslint-disable-next-line no-unused-vars
  getPost: (id: string) => Promise<void>;
}

const Comment = ({ post, getPost }: CommentProps) => {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const comments = post?.comments;

  const onChanage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, 'posts', post.id);

        if (user?.uid) {
          const commentObject = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleString(),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObject),
            updatedAt: new Date()?.toLocaleString(),
          });
        }
        await getPost(post.id);
      }
      toast.success('댓글이 생성되었습니다.');
      setComment('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onDelete = async (data: CommentsInterface) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');

    if (confirm && post?.id) {
      const postRef = doc(db, 'posts', post.id);

      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.success('댓글을 삭제했습니다.');
      await getPost(post.id);
    }
  };

  return (
    <>
      <Comments>
        <CommentForm onSubmit={onSubmit}>
          <FormBlock>
            <CommentLabel htmlFor="comment">댓글</CommentLabel>
            <StyledText
              name="comment"
              id="comment"
              required
              value={comment}
              onChange={onChanage}
              placeholder="댓글을 입력해주세요."
            />
          </FormBlock>
          <BlockReverse>
            <SubmitBtn type="submit" value="입력" />
          </BlockReverse>
        </CommentForm>

        <CommentList>
          {comments?.map((comment, index) => (
            <CommentBox key={index}>
              <ProfileBox>
                <CommentEmail>{comment.email}</CommentEmail>
                <CommentDate>{comment.createdAt}</CommentDate>
                {comment.uid === user?.uid && (
                  <CommentDelete onClick={() => onDelete(comment)}>
                    삭제
                  </CommentDelete>
                )}
              </ProfileBox>
              <CommentText>{comment.content}</CommentText>
            </CommentBox>
          ))}
        </CommentList>
      </Comments>
    </>
  );
};

const Comments = styled.div`
  width: 100%;
`;

const CommentLabel = styled.label`
  font-weight: 600;
  display: block;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.content};
`;

const CommentForm = styled.form`
  min-height: 100px;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: block;
  width: 100%;
  max-width: 680px;
`;

const FormBlock = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

const StyledText = styled.textarea`
  font-size: 16px;
  border-radius: 0.3rem;
  width: 100%;
  line-height: 1.5;
  padding: 10px;
  display: block;
  margin-bottom: 10px;
  border: 1px solid #d3d3d3;
  outline: none;
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.content};
`;

const BlockReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const SubmitBtn = styled.input`
  width: 100px;
  height: 36px;
  cursor: pointer;
  font-weight: 500;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;

  &hover,
  &focus {
    background-color: #1945a4;
  }
`;

const CommentList = styled.div`
  margin-top: 40px;
  margin-bottom: 100px;
  color: ${(props) => props.theme.content};
`;

const CommentBox = styled.div`
  padding: 12px 0px;
  border-bottom: 1px solid #f2f2f2;
`;

const ProfileBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
`;

const CommentEmail = styled.div`
  font-weight: 500;
`;

const CommentDate = styled.div`
  color: ${(props) => props.theme.color};
`;

const CommentDelete = styled.div`
  color: ${(props) => props.theme.color};
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;

  &hover,
  &focus {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const CommentText = styled.div`
  font-size: 14px;
  padding-top: 4px;
`;

export default Comment;
