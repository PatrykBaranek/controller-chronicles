import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  
  body {
    line-height: 1;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    background: linear-gradient(234.73deg, rgba(60, 112, 85, 0.6) 12.85%, #221738 61.83%), #221475;
    color: white;
  }
  ol, ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }

`;
