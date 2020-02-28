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

    color: ${({ theme: { colors } }) => colors.primary};
    box-sizing: border-box;
    background:${({ theme: { colors } }) => colors.body};

    line-height: 1.25;
    font-kerning: normal;
  }
//  ::selection {
//    background: ${({ theme: { colors } }) => colors.primary};
//    color: ${({ theme: { colors } }) => colors.white};
//  }
//  ::-webkit-scrollbar {
//    height: 16px;
//    width: 16px;
//    background: ${({ theme: { colors } }) => colors.light};
//}
//::-webkit-scrollbar-thumb {
//    background: ${({ theme: { colors } }) => colors.primary};
//    -webkit-border-radius: 1ex;
//    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
//}
//::-webkit-scrollbar-corner {
//    background: #000;
//`;

export default GlobalStyles;
