import homeIco from '#/assets/homeIco.svg';
import gamepadIco from '#/assets/gamepadIco.svg';
import podcastIco from '#/assets/podcastsIco.svg';
import loginIco from '#/assets/loginIcon.svg';
import loggedIco from '#/assets/loggedIco.svg';
import collectionIco from '#/assets/collectionIco.svg';
import NavbarLink from '../UI/NavbarLink';

function NavMenu() {
  const isAuthenticated = false;

  return (
    <ul className='w-full h-full flex flex-col pt-[15vh] nth-last-of-type-[3]:mr-10 lg:pt-8 lg:h-[unset]'>
      <NavbarLink icon={homeIco} text='Home' />
      <NavbarLink icon={gamepadIco} text='Games' />
      <NavbarLink icon={podcastIco} text='Podcasts' />
      {!isAuthenticated ? (
        <NavbarLink icon={loginIco} text={'Login'} />
      ) : (
        <>
          <NavbarLink icon={loginIco} text={'Profile'} />
          <NavbarLink icon={collectionIco} text={'Collections'} />
          <NavbarLink icon={loggedIco} text={'Logout'} isLogoutButton={true} />
        </>
      )}
    </ul>
  );
};

export default NavMenu;
