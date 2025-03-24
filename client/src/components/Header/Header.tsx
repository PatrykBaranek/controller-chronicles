import BurgerMenu from '../UI/BurgerMenu';
import logo from '#/assets/logo.svg';
import Searchbar from './Searchbar';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useLocation } from 'react-router';
import isDesktopWidth from '../../utils/isDesktopWidth';
import Nav from '../Nav/Nav';
import useStore from '#/store/store';
// import filterIcon from '#/assets/filterIcon.svg';
// import FilterDrawer from '../FilterDrawer/FilterDrawer';

function Header() {
  const windowWidth = useWindowWidth();
  const location = useLocation();
  const { toggleFiltersOpen } = useStore();

  const isGamesPage = location.pathname.includes('/games');

  return (
    <header className='flex w-full flex-col items-center justify-center overflow-hidden px-9 py-6 md:pb-0'>
      {!isDesktopWidth(windowWidth) && <Nav />}
      <div className='grid h-[50%] w-full grid-cols-3 grid-rows-1 items-center pb-4'>
        <BurgerMenu />
        <img
          src={logo}
          alt='Controller chronicles logo'
          className='w-[10vw] max-w-[18.75rem] min-w-[10.6rem]'
        />
        {isDesktopWidth(windowWidth) && isGamesPage && <Searchbar />}
        {/* {isLocationSearchable(location) && (
          <>
            <img src={filterIcon} className="w-[1.18rem] self-center justify-self-center cursor-pointer" alt='Filters' onClick={toggleFiltersOpen} />
            <FilterDrawer />
          </>
        )} */}
      </div>
      {!isDesktopWidth(windowWidth) && isGamesPage && <Searchbar />}
    </header>
  );
}

export default Header;
