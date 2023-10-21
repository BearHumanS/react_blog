import { EMAIL_REGEX } from '@/lib/constants';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { app } from '@/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailValidRegex = EMAIL_REGEX;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);

      if (!value?.match(emailValidRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);

      if (value?.length < 8) {
        setError('비밀번호는 최소 8자리 이상입니다.');
      } else {
        setError('');
      }
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('로그인에 성공했습니다.');
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
        <StyledLogin>로그인</StyledLogin>
        <FormBlock>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            type="email"
            name="email"
            id="email"
            required
            onChange={onChange}
            value={email}
          />
        </FormBlock>
        <FormBlock>
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput
            type="password"
            name="password"
            id="password"
            required
            onChange={onChange}
            value={password}
          />
        </FormBlock>
        {error && error?.length > 0 && (
          <FormBlock>
            <FormError>{error}</FormError>
          </FormBlock>
        )}
        <FormBlock>
          <>
            계정이 없으신가요?{' '}
            <StyledSignUp to="/signup">회원가입</StyledSignUp>
          </>
        </FormBlock>
        <FormBlock>
          <SubmitBtn
            type="submit"
            value="로그인"
            disabled={error?.length > 0}
          />
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
  min-height: 70vh;
  margin-top: 10vh;

  & > div {
    &:nth-last-child(2) {
      display: flex;
    }
  }
`;

const StyledLogin = styled.h1`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4px;
`;

const FormBlock = styled.div`
  margin-top: 20px;
  width: 100%;
  white-space: pre-wrap;
`;

const StyledLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const FormError = styled.div`
  color: red;
`;

const StyledInput = styled.input`
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  width: 100%;
  max-width: 680px;
`;

const StyledSignUp = styled(Link)`
  color: gray;
  text-decoration: underline;

  &:hover {
    color: #2563eb;
    font-weight: 500;
  }
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

export default LoginForm;
