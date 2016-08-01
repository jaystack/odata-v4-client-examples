import React from "react";

export default class CategoryList extends React.Component{
  constructor(){
    super();
  }

  renderCategoryRow(category){
    return(
      <tr key={category._id}>
        <td><a href="#" onClick={() => {this.props.onCategoryClick(category._id)}}>{category.Name}</a></td>
        <td>{category.Description}</td>
      </tr>
    )
  };

  componentDidMount(){
    this.props.onMount();
  }

  render(){
    return(
      <div className="CategoryList">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            {
              this.props.categories.map(category => this.renderCategoryRow(category))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: React.PropTypes.arrayOf(React.PropTypes.shape({
    _id:            React.PropTypes.string.isRequired,
    Name:           React.PropTypes.string.isRequired,
    Description:    React.PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onCategoryClick:  React.PropTypes.func.isRequired,
  onMount:          React.PropTypes.func
}