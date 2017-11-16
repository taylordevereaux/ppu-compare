import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import ProductForm from '../ProductForm/ProductForm';

export default class ProductViewEdit extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    measurementType: PropTypes.string,
    unitOfMeasurement: PropTypes.string,

    history: PropTypes.object
  }

  static defaultProps = {
    measurementType: "volumn",
    unitOfMeasurement: "litres"
  }

  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      measurementType: props.measurementType,
      unitOfMeasurement: props.unitOfMeasurement
    };
  }

  handleInputsChange = (prop) => {
    this.setState(prop);
  }

  render() {
    const state = this.state;
    return (
      <div >
        <ProductForm {...state} onChange={this.handleInputsChange}  />
      </div>
    )
  }
}
