import React from 'react';
import styled from 'styled-components';

export const Select = styled.select`
      width: 140px;
      height: 100%;
      border: 1px solid ${({ isFilterSet, theme: { colors } }) =>
        isFilterSet ? colors.primary : colors.shadow};
      font-size: 1.2rem;
      color: ${({ isFilterSet, theme: { colors } }) =>
        isFilterSet ? colors.primary : colors.shadow};
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: 8px;
      font-family:${({ theme }) => theme.fonts.heading};
      transition: all 0.3s;
      cursor: pointer;
      &:hover{
        color: ${({theme: { colors } }) => colors.primary};
      }
      @media (max-width:${({ theme })=>theme.breakpoints.mobile}){
        width: 90px;
      }
`;
export const Option = styled.option`
  font-weight: 400;
`;
