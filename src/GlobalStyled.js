import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  &:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    outline: none;
  }
  html {
    font-size: 62.5%;
    height: 100%;
    @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
        breakpoints.tabPort}) {
      font-size: 67.5%;
    }
    @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
        breakpoints.tabLand}) {
      font-size: 71%;
    }
    @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
        breakpoints.desktop}) {
      font-size: 75%;
    }
    @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
        breakpoints.width2k}) {
      font-size: 90.5%;
    }
  }
 
  body {

    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    color: ${({ theme: { colors } }) => colors.primary};
    box-sizing: border-box;
    background:${({ theme: { colors } }) => colors.body};
    margin-bottom: 20px;
    // line-height: 1.25;
    // font-kerning: normal;
  }

  button{
    cursor: pointer;
  }
`;

export default GlobalStyles;
