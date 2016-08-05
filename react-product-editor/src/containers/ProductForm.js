import { connect } from 'react-redux';
import { saveProduct, createProduct, deselectProduct, removeProduct } from './../actions.js';
import ProductFormComponent from './../components/ProductForm.jsx';

const mapStateToProps = (state) => {
  if(state.selectedProduct){
    return {
      product:    state.selectedProduct,
      mode:       "modify"
    }
  }
  else if(state.newProduct){
    return {
      product:     state.newProduct,
      mode:        "create",
      categoryId:  state.selectedCategory
    }
  }
  else{
    return {
      product:  null,
      mode:     null
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (product, categoryId) => {
      dispatch(createProduct(product, categoryId));
    },
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

const ProductForm = connect(mapStateToProps, mapDispatchToProps)(ProductFormComponent);

export default ProductForm;