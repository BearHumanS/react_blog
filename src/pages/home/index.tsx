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
      <PostList>postlist</PostList>
      <Footer>
        <div>menu1</div>
        <div>menu2</div>
        <div>menu3</div>
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

const PostList = styled.div`
  min-height: 90vh;
  padding: 20px 40px;
  text-align: center;
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
`;

export default Home;
