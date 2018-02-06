import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';
import { Route } from 'react-router-dom';

// Components
import Icon from '../../Icon/Icon';

export default class ProductDetails extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      measurementType: PropTypes.string,
      unitOfMeasurement: PropTypes.string
    })
  }

  render() {
    const product = this.props.product;
    return (
      <div className="d-flex w-100 mb-1 align-items-end">
        <h3 className="mb-0 mr-2">{product.name}</h3>
        <small className="text-uppercase">{product.unitOfMeasurement}</small>
        <Route exact path="/Product/View/:id" render={() => <Button color="link" className="ml-auto text-secondary d-inline" ><Icon modifier="trash" /></Button>} />
      </div>
    );
  }
}
