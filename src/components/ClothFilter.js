import React, { useState } from 'react';
import styled from 'styled-components';
import { Select, Option } from './SelectComponent';

const Wrapper = styled.div`
  margin: 5px 5px 0 0;
  &:last-child {
    margin: 5px 0 0 0;
  }
  height: 42px;
  @media (max-width:${({ theme })=>theme.breakpoints.tabPort}){
    height: 33px;
  }
`;

const ClothFilterComponent = () => {
    const [option, setOption] = useState('');
    const ClothFilter = () => (
        <Wrapper>
            <Select
                isFilterSet={option !== ''}
                value={option}
                onChange={e => setOption(e.target.value)}
                onBlur={e => setOption(e.target.value)}
            >
                <Option value="">Materiał :</Option>
                <Option value="leather">Skóra</Option>
                <Option value="cotton">Bawełna</Option>
            </Select>
        </Wrapper>
    );
    return [option, setOption, ClothFilter];
};

export default ClothFilterComponent;
