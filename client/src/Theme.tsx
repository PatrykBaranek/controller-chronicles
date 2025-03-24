import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import type { Children } from './types/types';

const styledComponentsTheme = {
  colors: {
    white: '#ffffff',
    primary: '#ebebf5bf',
    secondary: '#ffffff99',
    yellow: '#F4BF4F',
    red: '#ED695E',
    mainGradient: 'linear-gradient(234.73deg, #3c705599 12.85%, #221738 61.83%),#221475',
    secondaryGradient: 'linear-gradient(131.88deg, #A73EE7 14.48%, #00EBFF 83.43%)',
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

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          marginBlock: '1rem',
        },
        outlined: {
          button: {
            fontFamily: 'Inter',
            fontSize: '.8rem',
            background: 'transparent',
            color: 'white',
            borderColor: 'rgba(235, 235, 245, 0.2)',
            '&:hover': {
              background: `linear-gradient(131.88deg, rgba(167, 62, 231, 0.15) 14.48%, rgba(0, 235, 255, 0.15) 83.43%)`,
            },
          },
        },
        ul: {
          gap: '.2rem',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'white',

          '&.Mui-selected': {
            background: `linear-gradient(131.88deg, rgba(167, 62, 231, 0.15) 14.48%, rgba(0, 235, 255, 0.15) 83.43%)`,
          },
        },

        sizeSmall: {
          borderRadius: '14px',
          margin: '0 2px',
          padding: '0 5px',
          minWidth: '28px',
          height: '28px',
        },
      },
    },
  },
});

const Theme = ({ children }: Children) => {
  return (
    <ThemeProvider theme={styledComponentsTheme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  );
};

export default Theme;
