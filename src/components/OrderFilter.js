import React, { useState } from 'react';
import styled from 'styled-components';
import { Select, Option } from './SelectComponent';

const Wrapper = styled.div`
  margin: 5px 5px 0 0;
  height: 42px;
`;

const OrderFilterComponent = () => {
    const [option, setOption] = useState('');
    const OrderFilter = () => (
        <Wrapper>
            <Select
                isFilterSet={option !== ''}
                width="140px"
                value={option}
                onChange={e => setOption(e.target.value)}
                onBlur={e => setOption(e.target.value)}
            >
                <Option value="">Sortuj :</Option>
                <Option value="price_up">Najniższa cena</Option>
                <Option value="price_down">Najwyższa cena</Option>
            </Select>
        </Wrapper>
    );
    return [option, setOption, OrderFilter];
};

export default OrderFilterComponent;
