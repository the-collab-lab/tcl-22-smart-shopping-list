import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #5F9645;
    --primaryLight: #A6CF93;
    --primaryDark: #29620F;
    --accent: #FFC344;
    --accentLight: #FFE5AD;
    --accentDark: #DC9600;
    --neutral: #8D8E8D;
    --neutralLight: #F2F3F2;
    --neutralExtraLight: #FAFAF9;
    --neutralDark: #161A14;
    --headerFont: 'Maven Pro', sans-serif;
    --contentFont: 'Lato', sans-serif;
  }
  html {
    font-size: 10px;
  }
  body {
    font-size: 2rem;
    font-family: var(--contentFont);
    font-weight: 400;
  }

  h1, h2, h3 {
    font-family: var(--headerFont);
  }

`;

export default GlobalStyle;
