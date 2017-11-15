import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import ProductForm from '../ProductForm/ProductForm';

export default class ProductViewEdit extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    
  }

  render() {
    return (
      <div>
        <ProductForm id={this.props.id} name={this.props.name} history={this.props.history} />
      </div>
    )
  }
}
