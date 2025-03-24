import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import useWindowWidth from './hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import NewReleases from './components/NewReleases/NewReleases';
import { Toaster } from 'sonner';
import { scan } from 'react-scan';
import { twMerge } from 'tailwind-merge';
import { Outlet, useLocation } from 'react-router';

scan({ enabled: true });

function Layout() {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Header />
      <main
        className={twMerge(
          'flex w-full',
          isHome
            ? 'flex-col min-[900px]:grid min-[900px]:grid-cols-[30vw_1fr_1fr_1fr] min-[1050px]:grid-cols-[18vw_1fr_1fr_1fr]'
            : 'flex-row'
        )}
      >
        {isDesktop && <Nav />}
        {isHome && <NewReleases />}
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

export default Layout;
