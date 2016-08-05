import React from "react";

export default class ProductList extends React.Component{
  constructor(){
    super();
  }

  renderProductRow(product){
    return(
      <tr key={product._id}>
        <td><a href="#" onClick={() => {this.props.onProductClick(product)}}>{product.Name}</a></td>
        <td>{product.QuantityPerUnit}</td>
        <td className="Price">{parseInt(product.UnitPrice).toFixed(2)}</td>
      </tr>
    )
  };

  render(){
    if(this.props.products && this.props.products.length > 0){
      return(
        <div className="ProductList">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Quantity / Unit</td>
                <td className="Price">Unit Price</td>
              </tr>
            </thead>
            <tbody>
              {
                this.props.products.map(product => this.renderProductRow(product))
              }
            </tbody>
          </table>
          <button onClick={() => {this.props.onAddProductClick()}}>Add product</button>
        </div>
      );
    }
    else{
      return null;
    }
  }
}

ProductList.propTypes = {
  products: React.PropTypes.arrayOf(React.PropTypes.shape({
    _id:                React.PropTypes.string.isRequired,
    Name:               React.PropTypes.string.isRequired,
    QuantityPerUnit:    React.PropTypes.string.isRequired,
    UnitPrice:          React.PropTypes.string.isRequired
  }).isRequired).isRequired,
  onAddProductClick:    React.PropTypes.func.isRequired,
  onProductClick:       React.PropTypes.func.isRequired
}