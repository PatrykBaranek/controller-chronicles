import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { useLocation } from 'react-router';

type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
};

function Form({ children, onSubmit }: Props) {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const currentLocation = useLocation().pathname.slice(1);
  const isLoginPage = currentLocation === 'login';

  return isDesktop ? (
    <div className="before:mask-composite-xor before:mask-composite-exclude relative overflow-hidden p-[1px] pb-20 transition-all duration-200 ease-in-out before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:via-white/20 before:via-30% before:to-transparent before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:p-[1px] before:content-['']">
      <h1>{isLoginPage ? 'Log in' : 'Sign up'}</h1>
      <form
        onSubmit={onSubmit}
        className='flex w-full flex-col items-center gap-14 md:min-w-[25vw] md:px-12 md:pb-4'
      >
        {children}
      </form>
      <span className='pointer-events-none absolute top-0 left-0 h-full w-full rounded-2xl bg-gradient-to-r from-[#a73ee7] to-transparent to-80% opacity-10'></span>
    </div>
  ) : (
    <>
      <h1>{isLoginPage ? 'Log in' : 'Sign up'}</h1>
      <form onSubmit={onSubmit} className='flex w-full flex-col items-center gap-14'>
        {children}
      </form>
    </>
  );
}

export default Form;
