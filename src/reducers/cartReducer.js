import {
  SET_CART,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
} from '../actions/types';

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        products: action.payload.items,
      };

    case ADD_PRODUCT: {
      const prod = action.payload;
      const prodCopy = [...state.products];
      const indexProd = prodCopy.findIndex(
        index => index.product.id === prod.id
      );
      if (indexProd === -1) {
        prodCopy.push({ quantity: 1, product: prod });
      } else {
        prodCopy[indexProd].quantity++;
      }
      return {
        ...state,
        products: prodCopy,
      };
    }

    case REMOVE_PRODUCT: {
      const prod = action.payload;
      const prodCopy = [...state.products];
      const indexProd = prodCopy.findIndex(
        index => index.product.id === prod.id
      );
      if (prodCopy[indexProd].quantity === 1 || action.all === true) {
        return {
          ...state,
          products: prodCopy.filter(index => index.product.id !== prod.id),
        };
      } else {
        prodCopy[indexProd].quantity--;
      }
      return {
        ...state,
        products: prodCopy,
      };
    }

    case CLEAR_CART: {
      return initialState;
    }

    default:
      return state;
  }
};

export default cartReducer;
