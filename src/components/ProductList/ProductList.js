import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap';
// Components
import List from '../List/List';
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

    const footer = (<LinkButton to="/Product/Details" text="New Compare List" />);

    return (
      <List listItems={listItems} footer={footer} emptyMessage="No product compare lists, try adding a new one." />
    )
  }
}
