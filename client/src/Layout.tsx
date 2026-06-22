import styled from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import useWindowWidth from './hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { Toaster } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';
import PageErrorFallback from './components/UI/PageErrorFallback';

const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledToaster = styled(Toaster)`
  .default {
    background: ${({ theme }) => theme.colors.secondaryGradient} !important;
    color: #ebebeb;
    border: none;
    .login {
      filter: invert(83%) sepia(92%) saturate(703%) hue-rotate(317deg) brightness(100%)
        contrast(92%);
    }
  }
`;

const Layout = () => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const location = useLocation();

  return (
    <>
      <GlobalStyle />
      <Header />
      <StyledMain>
        {isDesktop && <Nav />}
        <ErrorBoundary FallbackComponent={PageErrorFallback} resetKeys={[location.pathname]}>
          <Outlet />
        </ErrorBoundary>
      </StyledMain>
      <StyledToaster />
    </>
  );
};

export default Layout;
