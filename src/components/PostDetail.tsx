import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostDetailComponent = () => {
  return (
    <>
      <PostDetail>
        <PostBox>
          <PostTitle>adfsfdsfsfs</PostTitle>
          <PostProfileBox>
            <PostProfile />
            <PostAuthorName>패캠</PostAuthorName>
            <PostDate>2023</PostDate>
          </PostProfileBox>
          <PostSettings>
            <PostDelete>삭제</PostDelete>
            <PostEdit>
              <Link to={`/posts/edit/1`}>수정 </Link>
            </PostEdit>
          </PostSettings>
          <PostText>asdfsdfdsfadsfdsf</PostText>
        </PostBox>
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
