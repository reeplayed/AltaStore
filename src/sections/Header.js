import React from 'react';
import styled from 'styled-components';
import Content from '../helpers/Content';

const Banner = styled.div`
  height: 85vh;
  width: 100%;
  position: relative;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url('https://i.meble.com.pl/i/02/76/13/027613_1920.jpg');
  background-size: cover;
  background-position: bottom center;
`;
const HeaderGroup = styled.hgroup`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20rem;
`;
const MainHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 100;
  font-family: ${({ theme }) => theme.fonts.logo};
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap;

  @media (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.tabPort}) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.xxl};
  }
  @media (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.mobile}) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.lg};
  }
`;

const SecondaryHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 100;
  font-family: ${({ theme }) => theme.fonts.logo};
  white-space: nowrap;

  @media (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.tabPort}) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.lg};
  }
  @media (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.mobile}) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.md};
  }
`;

const Header = () => (
    <Content>
        <Banner>
            <HeaderGroup>
                <MainHeader>Alta Arte</MainHeader>
                <SecondaryHeader>Meble dla twojego mieszkania</SecondaryHeader>
            </HeaderGroup>
        </Banner>
    </Content>
);

export default Header;
