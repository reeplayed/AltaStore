import React from 'react';
import styled from 'styled-components';

const HamburgerButton = styled.button`
  height: 40px;
  width: 40px;
  position: relative;
  border: 0;
  margin: 0;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 10;
  cursor: pointer;
`;

const HamburgerInner = styled.span`
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ isOpen }) => (isOpen ? 'transparent' : 'white')};
  transition: background 0.5s;

  &,
  &:before,
  &:after {
    border-radius: 4px;
    position: absolute;
    width: 40px;
    height: 3px;
    left: 0;
    z-index: 10003;
  }

  &:before {
    content: '';
    top: -10px;
    background: ${({ theme, color }) =>
      color ? theme.colors.primary : 'white'};
    transform: ${({ isOpen }) =>
      isOpen ? 'translateY(10px) rotate(-45deg)' : ''};
    transition: transform 0.5s;
  }

  &:after {
    content: '';
    top: 10px;
    background: ${({ theme, color }) =>
      color ? theme.colors.primary : 'white'};
    transform: ${({ isOpen }) =>
      isOpen ? 'translateY(-10px) rotate(45deg)' : ''};
    transition: transform 0.5s;
  }
`;

const Hamburger = ({ click, isOpen, color }) => {
  return (
    <HamburgerButton onClick={click}>
      <HamburgerInner isOpen={isOpen} color={color} />
    </HamburgerButton>
  );
};

export default Hamburger;
