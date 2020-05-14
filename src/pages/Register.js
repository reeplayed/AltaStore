import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar, { Backdrop } from '../sections/NavBar';
import Heading from '../typography/Heading';
import Content from '../helpers/Content';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { LoginButton } from '../components/LogButton';
import axios from '../axios';
import { connect } from 'react-redux';
import { setUser } from '../actions/authActions';
import { setCart, addProduct } from '../actions/cartActions';

const RegistrationContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50rem;
  background: ${({ theme }) => theme.colors.white};
  margin: 7rem auto;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-shadow: 5px 10px #888888;
  padding: 20px 40px;

  @media (max-width:${({ theme })=>theme.breakpoints.tabPort}){
    padding: 10px 10px;
  }
`;

const TextField = styled.input`
    border:1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    width:100%;
    height: 46px;
    padding:0 20px;
    font-size:1.4rem;
    margin-top: 10px;
   ::placeholder,
  ::-webkit-input-placeholder {
    
    font-size:1.4rem;
    color: ${({ theme }) => theme.colors.shadow};
    font-family: ${({ theme }) => theme.fonts.heading};
  :-ms-input-placeholder {
     margin: 0 20px;
  }
`;
const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;
const Error = styled.p`
  color: ${({ theme }) => theme.colors.red};
  margin: 7px 0 10px 0;
`;
const emailValidation = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;

class Register extends Component {
  state = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: {}
  };

  onSubmitHandler = e => {
      e.preventDefault();
      const { username, email, password, confirm_password } = this.state;

      let errors = {};
      if (username === '') {
          errors.username = 'To pole jest puste.';
      } else if (username.length < 8 || username.length > 16) {
          errors.username = 'Nazwa uzytkownika powinna zawierać od 8 do 16 znaków';
      } else if (/\W/.test(username)) {
          errors.username =
        'Nazwa użytkownika powinna zawierać tylko liery oraz cyfry';
      }
      if (email === '') {
          errors.email = 'To pole jest puste.';
      } else if (!emailValidation.test(email)) {
          errors.email = 'Podany adres email jest nieprawidłowy';
      }
      if (password === '') {
          errors.password = 'To pole jest puste.';
      } else if (password.length < 8 || password.length > 32) {
          errors.password = 'Hasło powinno zawierać od 8 do 16 znaków';
      }

      if (confirm_password === '') {
          errors.confirm_password = 'To pole jest puste.';
      }
      if (!_.isEmpty(errors)) {
          return this.setState({ errors });
      }
      axios
          .post('/registration', { username, password, email })
          .then(res => {
              console.log(res);
          })
          .catch(err => {
              console.log(err.response);
          });
  };

  onChangeHandler = e => this.setState({ [e.target.id]: e.target.value });

  render () {
      return (
          <>
              <NavBar />
              <Content margin="0 5px">
                  <RegistrationContent>
                      <Heading margin="20px auto" align="center" fsize="3rem">
              Zarejestruj
                      </Heading>

                      <form autoComplete="off">
                          <Label>Username :</Label>
                          <TextField
                              type="text"
                              id="username"
                              placeholder="Username"
                              value={this.state.username}
                              onChange={e => this.onChangeHandler(e)}
                          />
                          <Error>{this.state.errors.username}</Error>
                          <Label>E-mail :</Label>
                          <TextField
                              type="text"
                              id="email"
                              placeholder="E-mail"
                              value={this.state.email}
                              onChange={e => this.onChangeHandler(e)}
                          />
                          <Error>{this.state.errors.email}</Error>
                          <Label>Password :</Label>
                          <TextField
                              type="password"
                              id="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={e => this.onChangeHandler(e)}
                          />
                          <Error>{this.state.errors.password}</Error>
                          <Label>Confirm Password :</Label>
                          <TextField
                              type="password"
                              id="confirm_password"
                              placeholder="Confirm Password"
                              value={this.state.confirm_password}
                              onChange={e => this.onChangeHandler(e)}
                          />
                          <Error>{this.state.errors.confirm_password}</Error>
                          <LoginButton onClick={this.onSubmitHandler}>
                Zarejestruj
                          </LoginButton>
                      </form>
                      <Link to="/login">Masz już konto ?</Link>
                  </RegistrationContent>
              </Content>
          </>
      );
  }
}

const mapStateToProps = (state, providerProps) => {
    return {
        auth: state.auth,

        cart: state.cart
    };
};

export default connect(mapStateToProps, { setUser, setCart, addProduct })(
    Register
);
