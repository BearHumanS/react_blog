import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

import styled from 'styled-components';
import AuthContext from '@/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { PostsProps } from './PostList';
import { CATEGORYS, CategoryType } from '@/lib/constants';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [post, setPost] = useState<PostsProps | null>(null);
  const [category, setCategory] = useState<CategoryType>('free');
  const { user } = useContext(AuthContext);

  const params = useParams();

  const navigate = useNavigate();

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'summary') {
      setSummary(value);
    }
    if (name === 'content') {
      setContent(value);
    }
    if (name === 'category') {
      setCategory(value as CategoryType);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        const postRef = doc(db, 'posts', post.id);

        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: new Date()?.toLocaleString(),
          category,
        });

        toast.success('게시글을 수정했습니다.');
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, 'posts'), {
          title,
          summary,
          content,
          createdAt: new Date()?.toLocaleString(),
          email: user?.email,
          uid: user?.uid,
          category,
        });

        toast.success('게시글을 생성했습니다.');
        navigate('/');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error(error?.code);
    }
  };

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

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
      setCategory(post.category as CategoryType);
    }
  }, [post]);

  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <FormBlock>
          <StyledLabel htmlFor="title">제목</StyledLabel>
          <StyledInput
            type="text"
            name="title"
            id="title"
            required
            onChange={onChange}
            value={title}
          />
        </FormBlock>
        <FormBlock>
          <StyledLabel htmlFor="summary">요약</StyledLabel>
          <StyledInput
            type="text"
            name="summary"
            id="summary"
            required
            onChange={onChange}
            value={summary}
          />
        </FormBlock>
        <FormBlock>
          <StyledLabel htmlFor="category">카테고리</StyledLabel>
          <StyledSelect
            name="category"
            id="category"
            onChange={onChange}
            defaultValue=""
          >
            <option value="">선택</option>
            {CATEGORYS.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </StyledSelect>
        </FormBlock>
        <FormBlock>
          <StyledLabel htmlFor="content">내용</StyledLabel>
          <StyledTextarea
            name="content"
            id="content"
            required
            onChange={onChange}
            value={content}
          />
        </FormBlock>
        <FormBlock>
          <SubmitBtn type="submit" value={post ? '수정' : '제출'} />
        </FormBlock>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  margin: 0 auto;
  max-width: 680px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 64px;
`;

const FormBlock = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  width: 100%;
  max-width: 680px;
`;

const StyledSelect = styled.select`
  border: 1px solid lightgray;
  max-width: 680px;
  min-width: 120px;
  height: 40px;
  padding: 0 5px;
  border-radius: 0.3rem;
  text-align: center;
`;

const StyledTextarea = styled.textarea`
  min-height: 400px;
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  width: 100%;
  max-width: 680px;
  line-height: 1.5;
`;

const SubmitBtn = styled.input`
  width: 100%;
  height: 48px;
  padding: 10px;
  margin: 0 auto;
  cursor: pointer;
  background-color: #2563eb;
  color: #fff;
  border-radius: 0.3rem;
  border: none;

  &:hover,
  &:focus {
    background-color: #1945a4;
  }
`;

export default PostForm;
