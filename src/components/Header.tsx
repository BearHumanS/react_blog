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
  border-bottom: 1px solid lightgray;
  padding: 10px 40px;
  min-height: 80px;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.secondaryBackgroundColor};
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.content};
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;

  & > a {
    margin: 0px 10px;
    color: ${(props) => props.theme.color};

    &:hover,
    &:focus {
      color: ${(props) => props.theme.hoverColor};
    }
  }
`;

export default HeaderComponent;
