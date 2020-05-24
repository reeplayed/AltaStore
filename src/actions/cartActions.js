import { SET_CART, ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_CART } from './types';
import store from '../store';
import axios from '../axios';
import _ from 'lodash';

const storageCart = JSON.parse(localStorage.cart || '{}');

export const setCart = () => dispatch => {
  if (store.getState().auth.isAuthenticated || !_.isEmpty(storageCart)) {
    console.log(storageCart);
    axios
      .post('/cart/set_cart/', storageCart)
      .then(res => {
        console.log(res);
        dispatch({
          type: SET_CART,
          payload: res.data,
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  }
};

export const addProduct = prod => dispatch => {
  if (store.getState().auth.isAuthenticated) {
    axios
      .post('/cart/add_item/', { id: prod.id })
      .then(res => {
        dispatch({
          type: ADD_PRODUCT,
          payload: prod,
        });
      })
      .catch(err => console.log(err));
  } else {
    if (!_.has(storageCart, prod.id)) {
      storageCart[prod.id] = 1;
    } else {
      storageCart[prod.id]++;
    }
    localStorage.setItem('cart', JSON.stringify(storageCart));
    console.log(storageCart);
    dispatch({
      type: ADD_PRODUCT,
      payload: prod,
    });
  }
};

export const removeProduct = (prod, all) => dispatch => {
  if (store.getState().auth.isAuthenticated) {
    axios
      .post('/cart/remove_item/', { id: prod.id, all })
      .then(res => {
        dispatch({
          type: REMOVE_PRODUCT,
          payload: prod,
          all,
        });
      })
      .catch(err => console.log(err));
  } else {
    if (storageCart[prod.id] === 1 || all) {
      delete storageCart[prod.id];
    } else {
      storageCart[prod.id]--;
    }
    localStorage.setItem('cart', JSON.stringify(storageCart));
    console.log(localStorage.cart);
    dispatch({
      type: REMOVE_PRODUCT,
      payload: prod,
      all,
    });
  }
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
