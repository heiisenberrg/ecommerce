import {
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
  GET_PRODUCT_LIST,
} from './actionTypes';

const initialState = {
  loading: false,
  products: [],
  selectedProduct: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.data,
        loading: false,
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.data,
      };
    default:
      return state;
  }
};
