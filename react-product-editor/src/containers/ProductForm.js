import { connect } from 'react-redux';
import { saveProduct, deselectProduct, removeProduct } from './../actions.js';
import ProductEditorForm from './../components/ProductEditorForm.jsx';

const mapStateToProps = (state) => {
  return {
    product: state.selectedProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (product) => {
      dispatch(saveProduct(product));
    },
    onDelete: (product) => {
      dispatch(removeProduct(product));
    },
    onCancel: () => {
      dispatch(deselectProduct());
    }
  }
}

const ProductForm = connect(mapStateToProps, mapDispatchToProps)(ProductEditorForm);

export default ProductForm;