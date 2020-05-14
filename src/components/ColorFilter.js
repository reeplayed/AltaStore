import React, { useState } from 'react';
import styled from 'styled-components';

import _ from 'lodash';

const Wrapper = styled.div`
  margin: 5px 5px 0 0;
  position: relative;
  
`;
const ColorButton = styled.button`
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.white};
  border: 0;
  padding: 0 24px;
  margin: 0;
  color: ${({ isFilterSet, theme: { colors } }) =>
        isFilterSet ? colors.primary : colors.shadow};
  border: 1px solid
    ${({ isFilterSet, theme: { colors } }) =>
        isFilterSet ? colors.primary : colors.shadow};
  border-radius: 8px;
  height: 42px;
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;
  &:hover{
    color: ${({theme: { colors } }) => colors.primary};
  }
  @media (max-width:${({ theme })=>theme.breakpoints.tabPort}){
    height: 33px;
  }
  @media (max-width:${({ theme })=>theme.breakpoints.mobile}){
    padding: 0 13px;
  }
`;
const ColorsWrapper = styled.div`
  position: absolute;
  top: 107%;
  z-index: 999999;
  left: 0;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  display: ${({ open }) => (open ? 'block' : 'none')};
  color: ${({ theme }) => theme.colors.primary};
  border: ${({ open }) => (open ? '1px' : '0')} solid
    ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  transition: all 0.3s;
`;
const ItemContent = styled.li`
    display:block;
    padding-left: 25px; 
    position: relative;
    opacity: ${({ checked }) => (checked ? '1' : '0.4')};
    color: ${({ theme }) => theme.colors.primary}
    font-size: 1.3rem;
    margin-bottom:5px;
    text-transform: capitalize;
    cursor:pointer;
    margin: 13px 0;
`;
const ColorList = styled.ul`
  padding: 5px;
`;

const ColorInput = styled.input`
  height: 20px;
  width: 20px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`;
const InputSpan = styled.span`
  display: block;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
`;

const ColorFilterComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [colors, setColors] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const openHandler = () => {
        setIsOpen(!isOpen);
    };

    window.onclick = e => {
        if (!e.target.matches('.color-filter')) {
            setIsOpen(false);
        }
    };

    const setColorHandler = value => {
        let copyColors = [...colors];
        if (_.includes(colors, value)) {
            setColors(copyColors.filter(color => color !== value));
        } else {
            copyColors.push(value);
            setColors(copyColors);
        }
    };

    const ColorItem = ({ value, color }) => (
        <ItemContent
            className="color-filter"
            checked={_.includes(colors, value)}
            onClick={() => setColorHandler(value)}
        >
            {value}

            <InputSpan color={color} />
            <ColorInput className="color-filter" type="checkbox" />
        </ItemContent>
    );
    const ColorFilter = () => (
        <Wrapper>
            <ColorButton
                className="color-filter"
                isFilterSet={colors.length !== 0}
                onClick={openHandler}
            >
        Kolor :
            </ColorButton>

            <ColorsWrapper className="color-filter" open={isOpen}>
                <ColorList>
                    {allColors.map(item => (
                        <ColorItem value={item[0]} color={item[1]} />
                    ))}
                </ColorList>
            </ColorsWrapper>
        </Wrapper>
    );
    return [colors, setColors, setAllColors, ColorFilter];
};

export default ColorFilterComponent;
