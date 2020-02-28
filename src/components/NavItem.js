import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = styled.li`
  padding: 0 15px;
  font-size: 1.5rem;
  white-space: nowrap;
  transition: all 0.4s;
  position: relative;

  @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.tabLand}) {
    padding: 12px 15px;
    font-size: 2.3em;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: white;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

export default ({ children, title, to, click }) => (
    <NavItem onClick={click}>
        <StyledLink to={to}>{title}</StyledLink>
        {children}
    </NavItem>
);
