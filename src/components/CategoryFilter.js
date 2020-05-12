import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  display: flex;
  border: 0.8px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  max-width: 800px;
  overflow: hidden;
  
`;
const Item = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  width: 200px;
  background: ${({ theme }) => theme.colors.primary};
  
`;
const RadioButtonLabel = styled.label`
  color: white;
  font-size: 1.4rem;
  padding: 5px;
  width: 100%;
  text-align: center;
`;
const RadioButton = styled.input`
    height:100%;
    width:100%;
    position:absolute;
    opacity:0;
    cursor: pointer;
    &:checked+${RadioButtonLabel}{
        color:${({ theme }) => theme.colors.primary};;
        background: ${({ theme }) => theme.colors.white};;
    }}
`;

const CategoryFilterComponent = initialCategory => {
    const [select, setSelect] = useState(initialCategory);

    const RadioButtons = () => (
        <Wrapper>
            <Item>
                <RadioButton
                    value="narozniki"
                    type="radio"
                    checked={select === 'narozniki'}
                    onClick={e => setSelect(e.target.value)}
                />
                <RadioButtonLabel>Narożniki</RadioButtonLabel>
            </Item>
            <Item>
                <RadioButton
                    type="radio"
                    checked={select === 'fotele'}
                    onClick={() => setSelect('fotele')}
                />
                <RadioButtonLabel>Fotele</RadioButtonLabel>
            </Item>
            <Item>
                <RadioButton
                    type="radio"
                    checked={select === 'sofy'}
                    onClick={() => setSelect('sofy')}
                />
                <RadioButtonLabel>Sofy</RadioButtonLabel>
            </Item>
        </Wrapper>
    );

    return [select, RadioButtons];
};

export default CategoryFilterComponent;
