import northwindContext from "./northwindContext";

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const GET_PRODUCTS_BY_CATEGORY_ID = 'GET_PRODUCTS_BY_CATEGORY_ID';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const SAVE_PRODUCT = 'SAVE_PRODUCT';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const DESELECT_PRODUCT = 'DESELECT_PRODUCT';

/*
 * action creators
 */

export function loadCategories(categories){
  return { type: LOAD_CATEGORIES, categories }
}

export function addProduct(){
  return { type: ADD_PRODUCT }
}

export function selectCategory(categoryId){
  return { type: SELECT_CATEGORY, categoryId }
}

function loadProducts(products){
  return { type: LOAD_PRODUCTS, products }
}

export function removeProduct(product){
  console.log(product);
  northwindContext.stateManager.reset();
  northwindContext.Products.remove(product);
  northwindContext.saveChanges();
  return { type: REMOVE_PRODUCT, product }
}

export function selectProduct(product){
  northwindContext.stateManager.reset();
  northwindContext.Products.attach(product);
  return { type: SELECT_PRODUCT, product }
}

export function deselectProduct(){
  northwindContext.stateManager.reset();
  return { type: DESELECT_PRODUCT }
}

export function createProduct(product, categoryId){
  northwindContext.stateManager.reset();
  northwindContext.Products.add(product);
  northwindContext.saveChanges();
  return getProductsByCategoryId(categoryId);
}

export function saveProduct(product){
  northwindContext.saveChanges();
  return { type: SAVE_PRODUCT, product }
}

export function getProductsByCategoryId(categoryId){
  return function(dispatch){
    return northwindContext.Products
            .filter(function(product){return product.CategoryId == this.Id}, {Id: categoryId})
            .toArray()
            .then(products => dispatch(loadProducts(products)))
  }
}

export function getCategories(){
  return function(dispatch){
    return northwindContext.onReady().then(
      () => {
        northwindContext.Categories.toArray()
        .then(categories => dispatch(loadCategories(categories)))
      }
    );
  }
}