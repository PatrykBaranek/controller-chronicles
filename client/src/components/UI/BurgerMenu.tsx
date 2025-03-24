import useStore from '#/store/store';
import { twMerge } from 'tailwind-merge';

const BurgerMenu = () => {
  const { isMenuOpen, toggleMenuOpen } = useStore();

  return (
    <div
      onClick={toggleMenuOpen}
      className={twMerge('relative z-10 h-4 w-[1.18rem] cursor-pointer md:hidden')}
    >
      <span
        className={twMerge(
          `relative top-1/2 block h-0.5 w-1/2 -translate-y-1/2 rounded-[10px] bg-white transition-all duration-100 ease-in-out before:absolute before:top-0 before:h-0.5 before:w-[200%] before:rounded-[10px] before:bg-white before:transition-all before:duration-500 before:ease-in-out before:content-[''] after:absolute after:bottom-0 after:h-0.5 after:w-[200%] after:rounded-[10px] after:bg-white after:transition-all after:duration-500 after:ease-in-out after:content-['']`,
          isMenuOpen &&
            `h-0 before:top-1/2 before:-translate-y-1/2 before:rotate-45 after:top-1/2 after:-translate-y-1/2 after:-rotate-45`
        )}
      />
    </div>
  );
};

export default BurgerMenu;
