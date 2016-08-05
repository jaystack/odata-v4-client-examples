import { connect } from 'react-redux';
import { selectProduct, addProduct } from './../actions.js';
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
    },
    onAddProductClick: () => {
      dispatch(addProduct());
    }
  }
}

const Products = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default Products;