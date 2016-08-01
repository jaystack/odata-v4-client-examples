import { connect } from 'react-redux';
import { selectProduct } from './../actions.js';
import ProductList from './../components/ProductList.jsx';

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProductClick: (product) => {
      dispatch(selectProduct(product));
    }
  }
}

const Products = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default Products;