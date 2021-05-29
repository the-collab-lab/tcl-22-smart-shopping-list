import { createGlobalStyle } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

// --- THEME FONTS AND COLORS ---

export const hFont = 'Maven Pro';

export const pFont = 'Lato';

export const backupFont = 'sans-serif';

export const primary = {
  main: '#4F7E3A',
  light: '#A6CF93',
  dark: '#29620F',
};

export const accent = {
  main: '#FFC344',
  light: '#FFE5AD',
  dark: '#DC9600',
};

export const neutral = {
  main: '#707070', // dark-grey
  light: '#F2F3F2', // light-grey
  extraLight: '#FAFAF9', // white
  dark: '#161A14', // black
};

// --- MATERIAL UI ---

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: primary.light,
      main: primary.main,
      dark: primary.dark,
      contrastText: neutral.extraLight,
    },
    secondary: {
      light: accent.light,
      main: accent.main,
      dark: accent.dark,
      contrastText: neutral.extraLight,
    },
    // Use primary colour for Success in Notistack to unify the shades of green:
    success: {
      light: primary.light,
      main: primary.main,
      dark: primary.dark,
      contrastText: neutral.extraLight,
    },
    background: {
      default: neutral.light,
      paper: neutral.extraLight,
    },
    text: {
      primary: neutral.dark,
      secondary: neutral.main,
    },
  },
  typography: {
    htmlFontSize: 18,
    fontFamily: [pFont, backupFont].join(','),
    h1: {
      fontFamily: '"Maven Pro", sans-serif',
      fontWeight: 500,
      fontSize: 35.16,
      '@media (max-width:400px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontFamily: '"Maven Pro", sans-serif',
      fontWeight: 700,
      lineHeight: 1.3,
      fontSize: 22.5,
      '@media (max-width:400px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontFamily: '"Maven Pro", sans-serif',
      fontWeight: 500,
      lineHeight: 1.3,
      fontSize: 22.5,
      '@media (max-width:400px)': {
        fontSize: '1.5rem',
      },
    },
    body1: {
      fontFamily: '"Lato", sans-serif',
    },
  },
});

// --- STYLED_COMPONENTS ---

const GlobalStyle = createGlobalStyle`
  li {
    list-style: none;
  }
  html, 
  body, 
  #root {
    height: 100%;
  }
  body{
    margin: 0;
  }
  .App {
    flex: 0 0 50vh;
    width: 100%;
    padding: 3.5em 0;
    background-color: ${theme.palette.background.paper};
    border-radius: 12px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1),
                0px 4px 8px rgba(0, 0, 0, 0.08),
                0px 1px 12px rgba(0, 0, 0, 0.04); 
    text-align: center; 
  }
`;

export default GlobalStyle;
