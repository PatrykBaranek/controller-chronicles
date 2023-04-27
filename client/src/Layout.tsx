import { GlobalStyle } from './GlobalStyle';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
