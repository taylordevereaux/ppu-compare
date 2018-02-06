import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap';
// Components
import ListContainer from '../ListContainer/ListContainer';
import LinkButton from '../LinkButton/LinkButton';
import ProductListItem from './ProductListItem/ProductListItem';

export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array,
    history: PropTypes.object.isRequired
  }

  render() {
    const products = this.props.products;

    const listItems = products
      .map((product) =>  <ProductListItem key={product.id.toString()} product={product} history={this.props.history} />);

    const body = !!listItems.length ? (<ListGroup>{listItems}</ListGroup>) : (<p className="text-center">No product compare lists, try adding a new one.</p>);

    const footer = (<LinkButton to="/Product/New" text="New Compare List" />);

    return (
      <div>
        <div className="d-flex justify-content-end">
          <div className="m-3" />
        </div>
        <div className="d-flex flex-column">
          {body}
        </div>
        <div className="d-flex justify-content-center">
          {footer}
        </div>
      </div>
    )
  }
}
