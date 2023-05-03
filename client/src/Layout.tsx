import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import useWindowWidth from './hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
const StyledMain = styled.main`
  display: flex;
  padding-inline: clamp(1.625rem, 5vw, 3.25rem);
  width: 100%;
  @media screen and (min-width: 900px) {
    padding-left: 0;
  }
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
