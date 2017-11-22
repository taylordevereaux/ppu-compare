import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProductDetails extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      measurementType: PropTypes.string,
      unitOfMeasurement: PropTypes.string
    })
  }

  render() {
    const product = this.props.product;
    return (
      <div className="d-flex w-100 justify-content-between">
        <h3 className="mb-1">{product.name}</h3>
        <small className="text-uppercase">{product.unitOfMeasurement}</small>
      </div>
    );
  }
}
