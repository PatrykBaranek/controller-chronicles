import styled, { css } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import useWindowWidth from './hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import NewReleases from './components/NewReleases/NewReleases';

type StyledProps = {
  isHome: boolean;
};

const StyledMain = styled.main<StyledProps>`
  display: flex;
  flex-direction: ${({ isHome }) => (isHome ? 'column' : 'row')};
  width: 100%;
  ${({ isHome }) =>
    isHome &&
    css`
      @media screen and (min-width: 900px) {
        display: grid;
        grid-template-columns: 30vw repeat(3, 1fr);
      }
      @media screen and (min-width: 1050px) {
        display: grid;
        grid-template-columns: 18vw repeat(3, 1fr);
      }
    `}
`;

const Layout = () => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <GlobalStyle />
      <Header />
      <StyledMain isHome={isHome}>
        {isDesktop && <Nav />}
        {isHome && <NewReleases />}
        <Outlet />
      </StyledMain>
    </>
  );
};

export default Layout;
