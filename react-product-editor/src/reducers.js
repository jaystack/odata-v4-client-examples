import { combineReducers } from 'redux';

import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  LOAD_CATEGORIES,
  LOAD_PRODUCTS,
  REMOVE_CATEGORY,
  REMOVE_PRODUCT,
  SAVE_CATEGORY,
  SAVE_PRODUCT,
  SELECT_PRODUCT,
  DESELECT_PRODUCT
} from './actions';

function products(state = [], action){
  switch(action.type){
    case ADD_PRODUCT:
      return [...state, action.product];
    case LOAD_PRODUCTS:
      return action.products.slice();
    case REMOVE_PRODUCT:
      const newState = state.slice();
      newState.splice(state.find(p => p._id == action.product._id), 1);
      return newState;
    case SAVE_PRODUCT:
      return state.slice().map(p => p._id == action.product._id ? action.product : p);
    default:
      return state;
  }
}

function categories(state = [], action){
  switch(action.type){
    case ADD_CATEGORY:
      return [...state, action.category];
    case LOAD_CATEGORIES:
      return action.categories.slice();
    case REMOVE_CATEGORY:
      return state.slice().splice(state.find(c => c._id == categoryId), 1);
    case SAVE_CATEGORY:
      return state.slice().map(c => c._id == action.category._id ? action.category : p);
    default:
      return state;
  }
}

function selectedProduct(state = null, action){
  switch(action.type){
    case SELECT_PRODUCT:
      return action.product; //!!!!
    case LOAD_PRODUCTS:
    case SAVE_PRODUCT:
    case REMOVE_PRODUCT:
    case DESELECT_PRODUCT:
      return null;
    default:
      return state;
  }
}

const productEditor = combineReducers({
  products,
  categories,
  selectedProduct
});

export default productEditor;