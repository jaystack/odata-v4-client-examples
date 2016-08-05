import React from "react";

export default class ProductForm extends React.Component{
  constructor(){
    super();
    this.initState();
  }

  initState(){
    this.state = {
      product: null
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.product){
      const product = nextProps.product;
      product.CategoryId = product.CategoryId || nextProps.categoryId
      this.setState({
        product
      });
    }
  }

  render(){
    if(this.props.product){
      return(
        <div className="ProductForm">
          <form>
            <div>
              <label>Name:</label>
              <input type="text" ref="NameInput" value={this.state.product.Name} onChange={(evt) => this.setState({product: Object.assign(this.state.product, {Name: evt.target.value}) })} />
            </div>
            <div>
              <label>Quantity per Unit:</label>
              <input type="text" ref="QuantityPerUnitInput" value={this.state.product.QuantityPerUnit} onChange={(evt) => this.setState({product: Object.assign(this.state.product, {QuantityPerUnit: evt.target.value}) })} />
            </div>
            <div>
              <label>Unit Price:</label>
              <input type="text" ref="UnitPriceInput" value={this.state.product.UnitPrice} onChange={(evt) => this.setState({product: Object.assign(this.state.product, {UnitPrice: evt.target.value}) })} />
            </div>
            <div>
              {this.props.mode == "create" ? (<button onClick={() => {this.props.onCreate(this.state.product, this.props.categoryId)}}>Add</button>) : null}
              {this.props.mode == "modify" ? (<button onClick={() => {this.props.onSave(this.state.product)}}>Save</button>) : null}
              {this.props.mode == "modify" ? (<button onClick={() => {this.props.onDelete(this.state.product)}}>Delete</button>) : null}
              <button onClick={() => {this.props.onCancel()}}>Cancel</button>
            </div>
          </form>
        </div>
      );
    }
    else{
      return null;
    }
  }
}

ProductForm.propTypes = {
  product: React.PropTypes.shape({
    _id:                React.PropTypes.string,
    Name:               React.PropTypes.string.isRequired,
    QuantityPerUnit:    React.PropTypes.string.isRequired,
    UnitPrice:          React.PropTypes.string.isRequired
  }),
  categoryId:           React.PropTypes.string,
  mode:                 React.PropTypes.string,
  onCreate:             React.PropTypes.func.isRequired,
  onSave:               React.PropTypes.func.isRequired,
  onDelete:             React.PropTypes.func.isRequired,
  onCancel:             React.PropTypes.func.isRequired
}