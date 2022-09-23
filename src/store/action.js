import { GET_PRODUCT_LIST, SET_PRODUCTS, SET_SELECTED_PRODUCT } from './actionTypes';

export const getProducts = () => ({
    type: GET_PRODUCT_LIST
});

export const setProducts = (data) => ({
    type: SET_PRODUCTS,
    data
});

export const setSelectedProducts = (data) => ({
    type: SET_SELECTED_PRODUCT,
    data
});