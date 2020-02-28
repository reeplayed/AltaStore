import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const Wrapper = styled.div`
  margin: 5px 5px 0 0;
  min-width: 200px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 5px 13px;
  position: relative;
  display: flex;
  flex: 1;
  background: white;
  flex-direction: column;
  opacity: ${({ isFilterSet }) => (isFilterSet ? '0.4' : '1')};
`;
const RangeLabelsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ValueLabel = styled.label`
  font-size: 1rem;
`;

const CustomSlider = withStyles({
    root: {
        color: '#373737',
        padding: '0',
        margin: '10px 0 5px 0'
    },
    thumb: {
        backgroundColor: '#fff',
        border: '1px solid #373737'
    }
})(Slider);

const PriceFilterComponent = category => {
    // useEffect(()=>{
    //     axios.get('/filtersparams/',{params:{filterType: category}})
    //         .then(res => {
    //             setRange(res.data);
    //             setValue(res.data)
    //         })
    //         .catch(error => console.log(error))
    //
    // },[category]);

    const [range, setRange] = useState([]);
    const [value, setValue] = useState([]);

    const isFilterSet = () => {
        if (range[0] === value[0] && range[1] === value[1]) {
            return true;
        }
        return false;
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const PriceFilter = (
        <Wrapper isFilterSet={isFilterSet()}>
            <RangeLabelsWrapper>
                <ValueLabel>{value[0]} zł</ValueLabel>
                <ValueLabel>{value[1]} zł</ValueLabel>
            </RangeLabelsWrapper>
            <CustomSlider
                min={range[0]}
                max={range[1]}
                value={value}
                onChange={handleChange}
                aria-labelledby="range-slider"
            />
        </Wrapper>
    );

    return [value, range, setValue, setRange, PriceFilter];
};

export default PriceFilterComponent;
