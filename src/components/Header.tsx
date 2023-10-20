import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderComponent = () => {
  return (
    <Header>
      <StyledLink to="/">Blog</StyledLink>
      <Navbar>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </Navbar>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  padding: 10px 40px;
  min-height: 40px;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 18px;
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

export default HeaderComponent;
