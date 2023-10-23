import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsSun, BsMoonFill } from 'react-icons/bs';
import ThemeContext from '@/context/ThemeContext';

const FooterComponent = () => {
  const context = useContext(ThemeContext);

  return (
    <Footer>
      <LinkBox>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </LinkBox>

      <IconBox>
        {context.theme === 'light' ? (
          <BsSun onClick={context.toggleMode} />
        ) : (
          <BsMoonFill onClick={context.toggleMode} />
        )}
      </IconBox>
    </Footer>
  );
};

const Footer = styled.footer`
  background-color: ${(props) => props.theme.secondaryBackgroundColor};
  min-height: 3.75rem;
  padding: 1.25rem 2.5rem;
  font-size: 0.875rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  bottom: 0rem;
  position: fixed;
  width: 100%;
  border-top: 1px solid lightgray;
`;

const LinkBox = styled.div`
  display: flex;
  gap: 20px;

  & > a {
    margin: 0px 10px;
    color: ${(props) => props.theme.color};

    &:hover,
    &:focus {
      color: ${(props) => props.theme.hoverColor};
    }
  }
`;

const IconBox = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.content};
  font-size: 20px;
`;

export default FooterComponent;
