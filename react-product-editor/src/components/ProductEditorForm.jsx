import React from "react";

export default class ProductEditorForm extends React.Component{
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
      this.setState({
        product: nextProps.product
      });
    }
  }

  render(){
    if(this.props.product){
      return(
        <div className="ProductEditorForm">
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
              <input type="text" ref="UnitPriceInput" value={this.state.product.UnitPrice} onChange={(evt) => this.setState({product: Object.assign(this.state.product, {Name: evt.target.value}) })} />
            </div>
            <div>
              <button onClick={() => {this.props.onSave(this.state.product)}}>Save</button>
              <button onClick={() => {this.props.onDelete(this.state.product)}}>Delete</button>
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

ProductEditorForm.propTypes = {
  product: React.PropTypes.shape({
    _id:                React.PropTypes.string.isRequired,
    Name:               React.PropTypes.string.isRequired,
    QuantityPerUnit:    React.PropTypes.string.isRequired,
    UnitPrice:          React.PropTypes.string.isRequired
  }),
  onSave:               React.PropTypes.func.isRequired,
  onDelete:             React.PropTypes.func.isRequired,
  onCancel:             React.PropTypes.func.isRequired
}