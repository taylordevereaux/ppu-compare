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
      .map((product) =>  <ProductListItem key={product.id.toString()} {...product} history={this.props.history} onRemove={this.handleRemove} />);

    const footer = (<LinkButton to="/Product/New" text="New Compare List" />);

    return (
      <ListContainer listItems={listItems} footer={footer} emptyMessage="No product compare lists, try adding a new one." />
    )
  }
}
