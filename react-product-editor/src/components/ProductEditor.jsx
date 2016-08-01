"use strict";

import React from "react";

import Categories from "./../containers/Categories";
import Products from "./../containers/Products";
import ProductForm from "./../containers/ProductForm";

const ProductEditor = () => (
  <div className="ProductEditor">
    <Categories />
    <Products />
    <ProductForm />
  </div>
);

export default ProductEditor;