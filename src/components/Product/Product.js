import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
  Container
} from 'reactstrap';

// Components
import ProductDetails from './ProductDetails/ProductDetails';
import ProductForm from './ProductForm/ProductForm';
import UnitEntryList from '../UnitEntryList/UnitEntryList';
import UnitEntry from '../UnitEntry/UnitEntry';
// Utilities
import DataSource from '../../utils/DataSource';

export default class Product extends Component {
  // static propTypes = {
  //   id: PropTypes.string,
  //   name: PropTypes.string,
  //   unitType: PropTypes.string,
  //   measurementType: PropTypes.string,
  //   unitOfMeasurement: PropTypes.string
  // }

  // static defaultProps = {
  //   measurementType: "volumn",
  //   unitOfMeasurement: "litres"
  // }
  
  handleEntrySubmit = (e, entry) => {
    console.log(entry);
  }

  render() {

    // const product = {
    //   id: this.props.id,
    //   name: this.props.name,
    //   measurementType: this.props.measurementType,
    //   unitOfMeasurement: this.props.unitOfMeasurement
    // };

    return (
      <div>

        <Route exact path="/Product/New" render={({ match, history }) => <ProductForm history={history} />} />
        
        <Route path="/Product/View/:id" render={({ match, history })  => {
          let product = DataSource.getProduct(match.params.id);
          let entries = product.entries || [];
          return (
            <Container fluid className="mt-3">
              <ProductDetails product={product} history={history} />
              <div className="hr-divider">
                <h3 className="hr-divider-content hr-divider-heading">
                  Compare List
                </h3>
              </div>
              <Route exact path="/Product/View/:id" render={({ match, history })  => <UnitEntryList entries={entries} history={history} />} />
              <Route exact path="/Product/View/:id/Entry" render={({ match, history })  => <UnitEntry history={history} onSubmit={this.handleEntrySubmit} /> } />
            </Container>
          );
        }} />

        <Route exact path="/Product/Edit/:id" render={({ match, history }) => {
          let product = DataSource.getProduct(match.params.id);
          return (<ProductForm product={product} history={history}  />)
        }} />
      </div>
    )
  }
}
