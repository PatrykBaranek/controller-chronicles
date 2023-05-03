import { type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { Children } from './types/types';

const theme = {
  colors: {
    white: '#ffffff',
    primary: '#ebebf5bf',
    secondary: '#ffffff99',
    yellow: '#F4BF4F',
    red: '#ED695E',
    mainGradient:
      'linear-gradient(234.73deg, #3c705599 12.85%, #221738 61.83%),#221475',
    secondaryGradient:
      'linear-gradient(131.88deg, #A73EE7 14.48%, #00EBFF 83.43%)',
    inputGradient: 'linear-gradient(135deg, #0f55e819 0%, #9ddff319 100%)',
    activeGradient:
      'radial-gradient(50% 128.57% at 50% -36.61%, #3C7055 0%, #52776468 9.38%, transparent 100%)',
    cardGradient: `linear-gradient(rgba(255, 255, 255, 0.5), #48319d33, #48319d10)
      50% 0% / calc(100% - 2px) no-repeat,
    linear-gradient(0deg, transparent 35%, rgba(255, 255, 255, 0.5) 100%);`,
  },
  fontWeights: {
    light: 300,
    medium: 400,
    semiBold: 500,
    bold: 600,
  },
};

const Theme = ({ children }: Children) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
