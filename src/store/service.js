import axios from 'axios';
import {setProducts, getProducts} from './action';

export const getProductList = () => async (dispatch) => {
  try {
    dispatch(getProducts());
    const result = await axios({
      method: 'GET',
      url: 'https://my-json-server.typicode.com/benirvingplt/products/products',
    });
    dispatch(setProducts(result.data));
  } catch (err) {
    throw new Error(err);
  }
};
