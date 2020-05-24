import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import posed from 'react-pose';
import Rating from '@material-ui/lab/Rating';

const Img = styled.img`
  max-width: 100%;
  height: auto;
  transition: all 0.5s;
  object-fit: cover;
`;
const Check = styled.h4`
  color: white;
  padding: 9px 19px;
  margin: auto;
  opacity: 0;
  transition: opacity 0.5s;
  position: absolute;
  border: 1px solid white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;
const Item = posed.div({
  flip: {
    scale: 1,
    transition: {
      scale: {
        type: 'spring',
        velocity: 10,
      },
      default: {
        type: 'spring',
      },
    },
  },
});
const ProdContainer = styled(Item)`
  padding: 1rem;
  margin: 0 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 5px;
  background: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    ${Img} {
      transform: scale(1.2);
      filter: brightness(50%);
    }
    ${Check} {
      opacity: 1;
    }
  }
  transition: transform 0.5s;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const CardFooter = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h3`
  font-size: 1.6rem;
  color: ${({ theme: { colors } }) => colors.black};
  font-weight: 300;
  text-align: center;
`;
const Price = styled.h5`
  margin-top: 0.3rem;
  color: ${({ theme: { colors } }) => colors.secondary};
  font-size: 1.7rem;
  font-weight: 400;
`;

const ProductCard = ({ title, image, price, slug, rating }) => {
  return (
    <StyledLink to={'/product/' + slug}>
      <ProdContainer>
        <ImgWrapper>
          <Check>Sprawdź</Check>
          <Img src={image} />
        </ImgWrapper>
        <CardFooter>
          <Title>{title}</Title>
          <Price>{price} PLN</Price>
          <Rating
            name="half-rating-read"
            value={rating}
            precision={0.5}
            readOnly
          />
        </CardFooter>
      </ProdContainer>
    </StyledLink>
  );
};

export default ProductCard;
