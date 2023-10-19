import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterComponent = () => {
  return (
    <Footer>
      <Link to="/posts/new">글쓰기</Link>
      <Link to="/posts">게시글</Link>
      <Link to="/profile">프로필</Link>
    </Footer>
  );
};

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

export default FooterComponent;
