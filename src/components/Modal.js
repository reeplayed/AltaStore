import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import CustomButton from './CustomButton';
import { connect } from 'react-redux';
import axios from '../axios';
import { clearCart } from '../actions/cartActions';
import StyledLink from '../helpers/StyledLink';

const StyledButton = styled.button`
  cursor: pointer;
  margin: 0;
  border: 0;
  padding: 10px 40px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.sm};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  @media (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.tabPort}) {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
    padding: 5px 10px;
  }
`;
const Content = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 450px;
  margin: 100px auto;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
`;
const ModalInfo = styled.p`
  font-size: 1.5rem;
  margin: 0 0 15px 0;
`;
function SimpleModal ({ button, auth, cart, clearCart }) {
    const [info, setInfo] = useState();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitHandler = () => {
        const data = cart.products.map(prod => ({
            id: prod.product.id,
            quantity: prod.quantity
        }));
        axios
            .post('/buy_products/', { products: data })
            .then(() => clearCart())
            .catch();
    };

    return (
        <div>
            <StyledButton type="button" onClick={handleOpen}>
        Złóż zamówienie
            </StyledButton>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <Content>
                    <ModalInfo id="simple-modal-description">
                        {auth.isAuthenticated ?
                            'Jesteś pewnien, że chcesz kupić wybrane przedmioty ?' :
                            'Aby dokonać zakupu musisz się zalogować.'}
                    </ModalInfo>
                    <div style={{ display: 'flex' }}>
                        {auth.isAuthenticated ? (
                            <>
                                <CustomButton
                                    onClick={() => submitHandler()}
                                    style={{ 'margin-right': '10px' }}
                                    primary
                                >
                  Tak
                                </CustomButton>
                                <CustomButton primary onClick={() => handleClose()}>
                  Nie
                                </CustomButton>
                            </>
                        ) : (
                            <StyledLink to='/login'>
                                <CustomButton>Zaloguj</CustomButton>
                            </StyledLink>
                        )}
                    </div>
                </Content>
            </Modal>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        cart: state.cart,
        auth: state.auth
    };
};

export default connect(mapStateToProps, { clearCart })(SimpleModal);
