import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar, { Backdrop } from '../sections/NavBar';
import Heading from '../typography/Heading';
import Content from '../helpers/Content';
import { Link } from 'react-router-dom';

import { LoginButton } from '../components/LogButton';
import axios from '../axios';
import { connect } from 'react-redux';
import { setUser } from '../actions/authActions';
import { setCart } from '../actions/cartActions';
import StringDivider from '../components/StringDivider';

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50rem;
  background: ${({ theme }) => theme.colors.white};
  margin: 9rem auto;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-shadow: 5px 10px #888888;
  padding: 20px 40px;
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

class Login extends Component {
  state = {
      username: '',
      password: '',
      errors: {}
  };

  onSubmitHandler = e => {
      e.preventDefault();
      const { username, password } = this.state;
      if (username === '' && password === '') {
          return this.setState({
              errors: {
                  username: 'To pole jest puste.',
                  password: 'To pole jest puste.'
              }
          });
      }
      if (this.state.username === '') {
          return this.setState({ errors: { username: 'To pole jest puste.' } });
      }
      if (this.state.password === '') {
          return this.setState({ errors: { password: 'To pole jest puste.' } });
      }

      axios
          .post('/token-auth/', {
              username,
              password,
              old_cart: JSON.parse(localStorage.cart || '{}')
          })
          .then(res => {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('user_info', JSON.stringify(res.data.user_info));

              this.props.setUser();
              this.props.setCart();
              localStorage.removeItem('cart');
              this.props.history.push('/shop');
          })
          .catch(
              ({
                  response: {
                      data: { non_field_errors }
                  }
              }) => {
                  this.setState({
                      errors: {
                          username: 'Nieprawidłowe hasło lub nazwa użytkownika.',
                          password: 'Nieprawidłowe hasło lub nazwa użytkownika.'
                      }
                  });
              }
          );
  };

  onChangeHandler = e => this.setState({ [e.target.id]: e.target.value });
  // facebookLogin = res => {
  //     console.log(res);
  //     axios.post('/login/', {accessToken: res.accessToken, old_cart: JSON.parse(localStorage.cart || '{}')})
  //         .then(res => {
  //             localStorage.setItem('token', res.data.auth_token);
  //             localStorage.setItem('user_info', JSON.stringify(res.data.user_info));
  //             this.props.setUser();
  //             this.props.setCart();
  //             localStorage.removeItem('cart');
  //             this.props.history.push('/shop');
  //         })
  //         .catch(err => console.log(err.message))
  // };
  render () {
      return (
          <>
              <NavBar />
              <Content margin="0 15px">
                  <LoginContent>
                      <Heading margin="30px auto" align="center" fsize="3rem">
              Zaloguj
                      </Heading>

                      <form autoComplete="off">
                          <Label htmlFor="username">Username :</Label>
                          <TextField
                              type="text"
                              id="username"
                              placeholder="Username"
                              value={this.state.username}
                              onChange={e => this.onChangeHandler(e)}
                          />
                          <Error>{this.state.errors.username}</Error>
                          <Label htmlFor="password">Password :</Label>
                          <TextField
                              type="password"
                              id="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={e => this.onChangeHandler(e)}
                          />
                          <Error>{this.state.errors.password}</Error>
                          <LoginButton onClick={this.onSubmitHandler}>Zaloguj</LoginButton>
                      </form>
                      <StringDivider>OR</StringDivider>
                      {/*<FacebookLogin*/}
                      {/*    appId="3242694735804717"*/}
                      {/*    autoLoad={false}*/}

                      {/*    callback={this.facebookLogin}*/}
                      {/*    render={renderProps => (*/}
                      {/*        <FacebookLoginButton onClick={renderProps.onClick}>Logowanie z Facebook</FacebookLoginButton>*/}
                      {/*    )}/>*/}
                      <Link to="/register">Nie posiadasz konta? Zarejestruj się.</Link>
                  </LoginContent>
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

export default connect(mapStateToProps, { setUser, setCart })(Login);
