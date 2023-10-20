import styled from 'styled-components';

const PostForm = () => {
  return (
    <>
      <StyledForm action="/post" method="POST">
        <FormBlock>
          <StyledLabel htmlFor="title">제목</StyledLabel>
          <StyledInput type="text" name="title" id="title" required />
        </FormBlock>
        <FormBlock>
          <StyledLabel htmlFor="summary">요약</StyledLabel>
          <StyledInput type="text" name="summary" id="summary" required />
        </FormBlock>
        <FormBlock>
          <StyledLabel htmlFor="content">내용</StyledLabel>
          <StyledTextarea name="content" id="content" required />
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
  height: 20px;
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
