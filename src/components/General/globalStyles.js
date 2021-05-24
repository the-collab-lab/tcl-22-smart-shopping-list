import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  li {
    list-style: none;
  }
`;

export default GlobalStyle;

export const hFont = 'Maven Pro';

export const pFont = 'Lato';

export const backupFont = 'sans-serif';

export const primary = {
  main: '#5F9645',
  light: '#A6CF93',
  dark: '#29620F',
};

export const accent = {
  main: '#FFC344',
  light: '#FFE5AD',
  dark: '#DC9600',
};

export const neutral = {
  main: '#8D8E8D',
  light: '#F2F3F2',
  extraLight: '#FAFAF9',
  dark: '#161A14',
};
