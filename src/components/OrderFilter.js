import React, { useState } from 'react';
import styled from 'styled-components';
import { Select, Option } from './SelectComponent';

const Wrapper = styled.div`
  margin: 5px 5px 0 0;
  height: 42px;
  @media (max-width:${({ theme })=>theme.breakpoints.tabPort}){
    height: 33px;
  }
`;

const OrderFilterComponent = () => {
    const [option, setOption] = useState('');
    const OrderFilter = () => (
        <Wrapper>
            <Select
                isFilterSet={option !== ''}
               
                value={option}
                onChange={e => setOption(e.target.value)}
                onBlur={e => setOption(e.target.value)}
            >
                <Option value="">Sortuj :</Option>
                <Option value="price_up">Najwyższa cena</Option>
                <Option value="price_down">Najniższa cena</Option>
                <Option value="rate_up">Najwyższa ocena</Option>
                <Option value="rate_down">Najniższa ocena</Option>
                <Option value="sell_up">Najwyższa sprzedaż</Option>
                <Option value="sell_down">Najniższa sprzedaż</Option>
            </Select>
        </Wrapper>
    );
    return [option, setOption, OrderFilter];
};

export default OrderFilterComponent;
