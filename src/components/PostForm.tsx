import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

import styled from 'styled-components';
import AuthContext from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleString(),
        email: user?.email,
      });

      navigate('/');
      toast.success('게시글을 생성했습니다.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error(error?.code);
    }
  };

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
          <SubmitBtn type="submit" value="제출" />
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
