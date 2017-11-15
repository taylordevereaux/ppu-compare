import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

// Components
import ProductDetails from './ProductDetails/ProductDetails';
import ProductViewEdit from './ProductViewEdit/ProductViewEdit';
// Utilities
import DataSource from '../../utils/DataSource';

export default class Product extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string
  }

  render() {
    return (
      <div>

        <Router exact path="/Product/View" component={ProductDetails} />

        <Route exact path="/Product/New" component={ (match, history) => <ProductViewEdit history={history} />} />

        <Route exact path="/Product/Edit/:id" render={({ match, history }) => {
          let product = DataSource.getProduct(match.params.id);
          return (<ProductViewEdit  {...product} history={history} />)
        }} />

      </div>
    )
  }
}
