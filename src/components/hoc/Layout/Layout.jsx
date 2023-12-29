import { Outlet } from 'react-router-dom';
import NavMenu from '../../NavMenu/NavMenu';

const Layout = () => {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
};

export default Layout;
