import React from 'react';
import styled from 'styled-components';
import Heading from '../typography/Heading';
import Content from '../helpers/Content';
import ProductCard from '../components/ProductCard';
import axios from '../axios';
import { useState, useEffect } from 'react';
import { Arrow } from '../svg/logo';

const ProductItem = styled.div`
    display:inline-block;
    width:${({ screen }) => 100 / screen}%;
    // @media(max-width:${({ theme }) => theme.breakpoints.tabLand}){
    //     width:33.3333%;
    // }
    // @media(max-width:${({ theme }) => theme.breakpoints.tabPort}){
    //     width:100%;
    // }
`;
const Slider = styled.div`
  position: relative;
  margin: 0 2rem;
  overflow: hidden;
  max-width: 100%;
`;
const SliderWrapper = styled.div`
    white-space: nowrap;
    transform: translateX(-${({ index, screen }) => (index * 100) / screen}%);
    transition:transform 0.3s;
    // @media(max-width:${({ theme }) => theme.breakpoints.tabLand}){
    //     transform: translateX(-${({ index }) => index * 33.33333}%);
    // }
    // @media(max-width:${({ theme }) => theme.breakpoints.tabPort}){
    //     transform: translateX(-${({ index }) => index * 100}%);
    // }
`;
const ArrowWrapper = styled.div`
  position: absolute;
  top: 0;
  cursor: pointer;
  ${({ right }) => (right ? 'right:0' : 'left:0')};
  width: 70px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 5px;

  display: flex;

  align-items: center;
  transition: background 0.3s;
  height: 100%;
  z-index: 2;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;
const ArrowInner = styled.div`
  width: 100%;
`;

const ProductsSlideShow = ({ title, type }) => {
  const [prod, setProd] = useState([]);
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState(1);

  const setScreenWidth = ({ target: { innerWidth } }) =>
    setScreen(
      innerWidth > 1330 ? 4 : innerWidth > 900 ? 3 : innerWidth > 650 ? 2 : 1
    );

  useEffect(() => {
    axios
      .get('/api/prodlist/', { params: { filter: type } })
      .then(res => setProd(res.data.results));

    setScreen(
      window.innerWidth > 1330
        ? 4
        : window.innerWidth > 900
        ? 3
        : window.innerWidth > 650
        ? 2
        : 1
    );

    window.addEventListener('resize', setScreenWidth);

    return () => {
      window.removeEventListener('resize', setScreenWidth);
    };
  }, []);

  return (
    <Content>
      <Heading margin="3rem auto" align="center" fsize="3rem">
        {title}
      </Heading>
      <Slider>
        {index !== 0 && (
          <ArrowWrapper onClick={() => setIndex(index - 1)}>
            <ArrowInner>
              <Arrow rotate />
            </ArrowInner>
          </ArrowWrapper>
        )}
        {index !== 10 - screen && (
          <ArrowWrapper onClick={() => setIndex(index + 1)} right>
            <ArrowInner>
              <Arrow />
            </ArrowInner>
          </ArrowWrapper>
        )}
        <SliderWrapper index={index} screen={screen}>
          {prod.map(prod => (
            <ProductItem screen={screen}>
              <ProductCard
                title={prod.name}
                image={prod.card_image}
                price={prod.price}
                slug={prod.slug}
                rating={prod.average_rating}
              />
            </ProductItem>
          ))}
        </SliderWrapper>
      </Slider>
    </Content>
  );
};

export default ProductsSlideShow;
