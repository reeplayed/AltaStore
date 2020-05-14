import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import Hamburger from '../components/Hamburger';
import H1 from '../typography/Heading';
import AddButton from '../components/AddButton';
import { addProduct, removeProduct } from '../actions/cartActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import Modal from '../components/Modal';
import {baseURL} from '../axios';

const CartContainerPose = posed.div({
    enter: {
        x: 0,
        transition: { duration: 300 },
        beforeChildren: false,
        staggerChildren: 100
    },
    exit: {
        x: 620,
        transition: { duration: 300 }
    }
});

const CartContainer = styled(CartContainerPose)`
  top: 0;
  right: 0;
  width: 570px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.lightGrey};
  @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.tabPort}) {
    width: 100%;
  }
`;
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
`;

const CloseButtonWrapper = styled.div`
  padding: 15px;
`;

const FooterContent = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
`;
const TotalWrapper = styled.h5`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const ProductsConteiner = styled.div`
  flex: 1;
  padding: 5px;
`;
const ProductContainerPose = posed.div({
    enter: {
        opacity: 1,
        transition: { delay: 230 }
    },
    exit: {
        opacity: 0
    }
});

const ProductContainer = styled(ProductContainerPose)`
  border: 1px solid ${({ theme }) => theme.colors.shadow};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.md};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: 8px;
  margin-bottom: 4px;
`;
const Image = styled.img`
  width: 150px;
  object-fit: cover;
`;

const TitleAndPrice = styled.hgroup`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const AddOddHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const Quantity = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;
const Title = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const Price = styled.h4`
  margin-top: 7px;
  color: ${({ theme: { colors } }) => colors.secondary};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  flex: 1;
`;
const RemoveButton = styled.button`
  margin: 0 30px;
  padding: 6px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  width: 140px;
`;
const EmptySpan = styled.span`
  display: block;
  font-size: 2.2rem;
  text-align: center;
  padding: 40px 20px;
`;

const Cart = props => {
    const CartList = props.cart.products.map(prod => (
        <ProductContainer>
            <Image src={baseURL + prod.product.image} />
            <TitleAndPrice>
                <Title>{prod.product.name}</Title>
                <Price>{prod.product.price} PLN</Price>
                <div>
                    <RemoveButton onClick={() => props.removeProduct(prod.product, true)}>
            Usuń
                    </RemoveButton>
                </div>
            </TitleAndPrice>
            <AddOddHolder>
                <AddButton onclick={() => props.addProduct(prod.product)} />
                <Quantity>{prod.quantity}</Quantity>
                <AddButton
                    add
                    onclick={() => props.removeProduct(prod.product, false)}
                />
            </AddOddHolder>
        </ProductContainer>
    ));

    return (
        <CartContainer>
            <HeaderContent>
                <CloseButtonWrapper onClick={props.close}>
                    <Hamburger isOpen click={props.close} />
                </CloseButtonWrapper>
                <H1 fsize="3rem" color="white" align="center">
          Koszyk
                </H1>
            </HeaderContent>

            <ProductsConteiner>
              {props.cart.products.length ? CartList : (
                <EmptySpan>
                  Koszyk jest pusty...
                </EmptySpan>
              )}
            </ProductsConteiner>

            <FooterContent>
                <Modal />
                <TotalWrapper>
          Razem:{' '}
                    {_.sum(
                        props.cart.products.map(prod => prod.quantity * prod.product.price)
                    )}{' '}
          PLN
                </TotalWrapper>
            </FooterContent>
        </CartContainer>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart
    };
};

export default connect(mapStateToProps, { addProduct, removeProduct })(Cart);
