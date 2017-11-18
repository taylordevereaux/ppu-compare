import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

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
        
        <Route exact path="/Product/View/:id" render={({ match, history })  => {
          let product = DataSource.getProduct(match.params.id);
          return (<ProductDetails {...product} history={history} />)
        }} />

        <Route exact path="/Product/Edit/:id" render={({ match, history }) => {
          let product = DataSource.getProduct(match.params.id);
          return (<ProductForm  {...product} history={history}  />)
        }} />
        
        <Route exact path="/Product/New" render={({ match, history })  => {
          let entries = DataSource.getEntries();
          return (<UnitEntryList entries={entries} history={history} />);
          {/* return (<UnitEntry {...entries[0]} history={history} />); */}
        }} />

      </div>
    )
  }
}
