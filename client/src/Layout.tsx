import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import useWindowWidth from './hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
const StyledMain = styled.main`
  display: flex;
  width: 100%;
`;

const Layout = () => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  return (
    <>
      <GlobalStyle />
      <Header />
      <StyledMain>
        {isDesktop && <Nav />}
        <Outlet />
      </StyledMain>
    </>
  );
};

export default Layout;
