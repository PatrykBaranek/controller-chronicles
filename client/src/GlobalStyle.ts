import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    scrollbar-width: thin;         
  }
  
  body {
    line-height: 1;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    background: linear-gradient(234.73deg, rgba(60, 112, 85, 0.6) 12.85%, #221738 61.83%), #221475;
    color: white;
    scroll-behavior:smooth;
    position: relative;
    scrollbar-color: rgba(255, 255, 255, 0.2) linear-gradient(180deg, rgba(60, 112, 85, 0.6) 12.85%, rgba(60, 112, 85, 0.35) 61.83%);
    &::-webkit-scrollbar {
    width: 8px;               
    }

  &::-webkit-scrollbar-track {
    background: linear-gradient(180deg, rgba(60, 112, 85, 0.6) 12.85%, rgba(60, 112, 85, 0.35) 61.83%);
          
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;       
  }
  }
  /* faint grain overlay for atmosphere/depth */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.04;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  #root {
    position: relative;
    z-index: 1;
  }
  ::selection {
    background: rgba(0, 235, 255, 0.3);
    color: #ffffff;
  }
  ol, ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }

`;
