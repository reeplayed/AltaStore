import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar, { Backdrop } from '../sections/NavBar';
import Heading from '../typography/Heading';
import Content from '../helpers/Content';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LoginButton } from '../components/LogButton';
import axios from '../axios';
import { connect } from 'react-redux';
import { setUser } from '../actions/authActions';
import { setCart } from '../actions/cartActions';

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

class Login extends Component {
  state = {
      username: '',
      password: '',
      errors: {},
      loading: false
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
      this.setState({loading: true});
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
              this.props.history.push('/');
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
          )
          .finally(()=>{
            this.setState({loading: false});
          })
  };

  onChangeHandler = e => this.setState({ [e.target.id]: e.target.value });
 
  render () {
      return (
          <>
              <NavBar />
              <Content margin="0 5px">
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
                            <LoginButton onClick={this.onSubmitHandler}>
                            {this.state.loading ? (
                                <CircularProgress size='1.5rem'/>
                            ):(
                                'Zaloguj'
                            )}
                            </LoginButton>
                      </form>
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
