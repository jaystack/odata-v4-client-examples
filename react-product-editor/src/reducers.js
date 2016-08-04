import { combineReducers } from 'redux';

import {
  ADD_PRODUCT,
  SELECT_CATEGORY,
  LOAD_CATEGORIES,
  LOAD_PRODUCTS,
  REMOVE_PRODUCT,
  SAVE_PRODUCT,
  SELECT_PRODUCT,
  DESELECT_PRODUCT
} from './actions';

function products(state = [], action){
  switch(action.type){
    case LOAD_PRODUCTS:
      return action.products.slice();
    case REMOVE_PRODUCT:
      const newState = state.slice();
      newState.splice(state.findIndex(p => p._id == action.product._id), 1);
      return newState;
    case SAVE_PRODUCT:
      return state.slice().map(p => p._id == action.product._id ? action.product : p);
    default:
      return state;
  }
}

function categories(state = [], action){
  switch(action.type){
    case LOAD_CATEGORIES:
      return action.categories.slice();
    default:
      return state;
  }
}

function selectedCategory(state = null, action){
  switch(action.type){
    case SELECT_CATEGORY:
      return action.categoryId;
    default:
      return state;
  }
}

function selectedProduct(state = null, action){
  switch(action.type){
    case SELECT_PRODUCT:
      return action.product; //!!!!
    case ADD_PRODUCT:
    case LOAD_PRODUCTS:
    case SAVE_PRODUCT:
    case REMOVE_PRODUCT:
    case DESELECT_PRODUCT:
      return null;
    default:
      return state;
  }
}

const DUMMY_PRODUCT = {
  Name:             "New Product",
  QuantityPerUnit:  "",
  UnitPrice:        ""
};

function newProduct(state = null, action){
  switch(action.type){
    case ADD_PRODUCT:
      return DUMMY_PRODUCT
    case LOAD_PRODUCTS:
    case SELECT_PRODUCT:
    case DESELECT_PRODUCT:
      return null;
    default:
      return state;
  }
}

const productEditor = combineReducers({
  products,
  categories,
  selectedProduct,
  selectedCategory,
  newProduct
});

export default productEditor;