import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroupItem,
  Container,
  Row,
  Col
} from 'reactstrap';
import ProductDetails from '../../Product/ProductDetails/ProductDetails';

export default class ProductListItem extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      measurementType: PropTypes.string,
      unitOfMeasurement: PropTypes.string
    })
  }
  
  handleClick = (e) => {
    e.preventDefault();
    const id = this.props.product.id;
    this.props.history.push(`/Product/View/${id}`);
    //this.props.onClick && this.props.onClick(this.props.id);
  }

  render() {
    const product = this.props.product;
    return (
      <ListGroupItem tag="a" action href="#" onClick={this.handleClick} >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{product.name}</h5>
          <small class="text-uppercase">{product.unitOfMeasurement}</small>
        </div>
      </ListGroupItem>
    )
  }
}
