import steam from '#/assets/steamLogo.svg';
import psStore from '#/assets/psStoreLogo.svg';
import xbox from '#/assets/xboxLogo.svg';
import appStore from '#/assets/appStoreLogo.svg';
import gog from '#/assets/gogLogo.svg';
import nintendo from '#/assets/nintendoLogo.svg';
import googlePlay from '#/assets/googlePlayLogo.svg';
import epic from '#/assets/epicLogo.svg';

const iconFilter = (slug: string) => {
  switch (slug) {
    case 'steam':
      return steam;
    case 'playstation-store':
      return psStore;

    case 'xbox-store' || 'xbox360':
      return xbox;

    case 'apple-store':
      return appStore;

    case 'gog':
      return gog;

    case 'nintendo':
      return nintendo;

    case 'google-play':
      return googlePlay;

    case 'epic-games':
      return epic;

    default:
      return undefined;
  }
};

export default iconFilter;
