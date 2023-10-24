import { Outlet } from 'react-router-dom';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default Layout;
