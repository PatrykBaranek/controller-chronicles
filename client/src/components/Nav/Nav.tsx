import NavMenu from './NavMenu';
import useStore from '#/store/store';
import { twMerge } from 'tailwind-merge';

function Nav() {
  const { isMenuOpen } = useStore();

  return (
    <nav
      className={twMerge(
        'fixed top-0 left-0 z-10 w-full bg-[linear-gradient(234.73deg,_rgba(60,112,85,0.45)_12.85%,_rgba(34,23,56,0.75)_61.83%)_rgba(34,20,117,0.4)] backdrop-blur-[6px] min-[900px]:static min-[900px]:w-[30vw] min-[900px]:bg-none min-[900px]:backdrop-filter-none min-[1050px]:w-[18vw]',
        !isMenuOpen ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-200%] opacity-0'
      )}
    >
      {<NavMenu />}
    </nav>
  );
}

export default Nav;
