import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      primary: string;
      secondary: string;
      yellow: string;
      red: string;
      mainGradient: string;
      secondaryGradient: string;
      inputGradient: string;
      activeGradient: string;
      cardGradient: string;
    };
    fontWeights: {
      light: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
  }
}

declare module '@splidejs/react-splide';