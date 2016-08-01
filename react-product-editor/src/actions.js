import northwindContext from "./northwindContext";

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const GET_PRODUCTS_BY_CATEGORY_ID = 'GET_PRODUCTS_BY_CATEGORY_ID';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const SAVE_PRODUCT = 'SAVE_PRODUCT';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const DESELECT_PRODUCT = 'DESELECT_PRODUCT';

/*
 * action creators
 */

export function addCategory(category){
  return { type: ADD_CATEGORY, category }
}

export function addProduct(product){
  return { type: ADD_CATEGORY, product }
}

export function loadCategories(categories){
  return { type: LOAD_CATEGORIES, categories }
}

function loadProducts(products){
  return { type: LOAD_PRODUCTS, products }
}

export function removeCategory(categoryId){
  //TODO
  return {}
}

export function removeProduct(product){
  northwindContext.Products.remove(product);
  northwindContext.saveChanges();
  return { type: REMOVE_PRODUCT, product }
}

export function saveCategory(category){
  //TODO
  return {}
}

export function selectProduct(product){
  northwindContext.Products.attach(product);
  return { type: SELECT_PRODUCT, product }
}

export function deselectProduct(){
  return { type: DESELECT_PRODUCT }
}

export function saveProduct(product){
  northwindContext.saveChanges();
  return { type: SAVE_PRODUCT, product }
}

export function getProductsByCategoryId(categoryId){
  return function(dispatch){
    return northwindContext.Products
            //.filter(p => p.categoryId == this.Id, {Id: categoryId})
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