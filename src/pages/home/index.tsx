import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Header>
        <Navbar>
          <Link to="/posts/new">글쓰기</Link>
          <Link to="/posts">게시글</Link>
          <Link to="/profile">프로필</Link>
        </Navbar>
      </Header>
      <PostNavigation>
        <PostAll>전체</PostAll>
        <PostMy>나의 글</PostMy>
      </PostNavigation>
      <PostList>
        {[...Array(10)].map((e, index) => (
          <PostBox key={index}>
            <Link to={`/posts/${index}`}>
              <PostProfileBox>
                <PostProfile />
                <PostAuthorName>패캠</PostAuthorName>
                <PostDate>2023</PostDate>
              </PostProfileBox>
              <PostTitle>게시글 {index}</PostTitle>
              <PostText>123</PostText>
              <PostSettings>
                <PostDelete>삭제</PostDelete>
                <PostEdit>수정</PostEdit>
              </PostSettings>
            </Link>
          </PostBox>
        ))}
      </PostList>
      <Footer>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </Footer>
    </>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  border-bottom: 1px solid #f2f2f2;
  padding: 10px 40px;
  min-height: 40px;
  align-items: center;
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;

  & > a {
    margin: 0px 10px;
    color: gray;

    &:hover,
    &:focus {
      color: black;
    }
  }
`;

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

const PostAll = styled.div`
  color: black;
  font-weight: 600;
`;

const PostMy = styled.div``;

const PostList = styled.div`
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

const PostText = styled.div`
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

const Footer = styled.footer`
  background-color: #f2f2f2;
  min-height: 40px;
  padding: 20px 40px;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  & > a {
    margin: 0px 10px;
    color: gray;

    &:hover,
    &:focus {
      color: black;
    }
  }
`;

export default Home;
