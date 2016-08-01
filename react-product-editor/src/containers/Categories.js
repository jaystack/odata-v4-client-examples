import { connect } from 'react-redux';
import { getProductsByCategoryId, getCategories } from './../actions.js';
import CategoryList from './../components/CategoryList.jsx';

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryClick: (categoryId) => {
      dispatch(getProductsByCategoryId(categoryId));
    },
    onMount: () => {
      dispatch(getCategories());
    }
  }
}

const Categories = connect(mapStateToProps, mapDispatchToProps)(CategoryList);

export default Categories;