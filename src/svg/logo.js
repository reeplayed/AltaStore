import React from 'react';
import styled from 'styled-components';

const LogoSvg = styled.svg`
  width: 188px;
  height: 60px;
`;

const Logo = () => (
  <LogoSvg viewBox="0 0 184 59" xmlns="http://www.w3.org/2000/svg">
    <g>
      <title>background</title>
      <rect
        fill="none"
        id="canvas_background"
        height="61"
        width="186"
        y="-1"
        x="-1"
      />
      <g
        display="none"
        overflow="visible"
        y="0"
        x="0"
        height="100%"
        width="100%"
        id="canvasGrid"
      >
        <rect
          fill="url(#gridpattern)"
          strokeWidth="0"
          y="0"
          x="0"
          height="100%"
          width="100%"
        />
      </g>
    </g>
    <g>
      <title>Layer 1</title>
      <text
        strokeWidth="0.2"
        textAnchor="start"
        fontFamily="'Shadows Into Light', serif"
        fontSize="22"
        id="svg_1"
        y="37.35096"
        x="30.58599"
        stroke="#fff"
        fill="#fff"
      >
        ALTA ARTE
      </text>
      <path
        stroke="#fff"
        id="svg_2"
        d="m2.25,29.75l38.57143,-27.5l102.85714,0l38.57142,27.5l-38.57142,27.5l-102.85714,0l-38.57143,-27.5z"
        strokeWidth="2.5"
        fill="none"
      />
    </g>
  </LogoSvg>
);
export const CheckMarkSvg = () => (
  <svg version="1.1" height="20px" width="20px" viewBox="0 0 20 20">
    <path
      d="M484.128,104.478l-16.116-16.116c-5.064-5.068-11.816-7.856-19.024-7.856c-7.208,0-13.964,2.788-19.028,7.856
			L203.508,314.81L62.024,173.322c-5.064-5.06-11.82-7.852-19.028-7.852c-7.204,0-13.956,2.792-19.024,7.852l-16.12,16.112
			C2.784,194.51,0,201.27,0,208.47c0,7.204,2.784,13.96,7.852,19.028l159.744,159.736c0.212,0.3,0.436,0.58,0.696,0.836
			l16.12,15.852c5.064,5.048,11.82,7.572,19.084,7.572h0.084c7.212,0,13.968-2.524,19.024-7.572l16.124-15.992
			c0.26-0.256,0.48-0.468,0.612-0.684l244.784-244.76C494.624,132.01,494.624,114.966,484.128,104.478z"
      fill="red"
    />
  </svg>
);
export const ArrowSvg = ({ rotate }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    transform={rotate ? 'rotate(180)' : ''}
    viewBox="0 0 24 24"
  >
    <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
  </svg>
);

export const Arrow = ({ rotate }) => (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    transform={rotate ? 'rotate(180)' : ''}
    viewBox="0 0 477.175 477.175"
  >
    <path
      fill="#ddd"
      d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "
    />
  </svg>
);

export const StarSvg = () => (
  <svg width="24" height="24" fillRule="evenodd" clipRule="evenodd">
    <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
  </svg>
);
export default Logo;
