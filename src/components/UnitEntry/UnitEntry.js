// Package Imports
import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Input,
  FormGroup,
  Form,
  Button,
  Col,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
// Utilities
import calculatePPU from '../../utils/calculatePPU';
import DataSource from '../../utils/DataSource';
// Styless
import './UnitEntry.css';

class UnitEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || null,
      price: props.price || '',
      units: props.units || '',
      location: props.location || '',
      description: props.description || '',
      errors: {},
      done: false,
      measurement: {
        isOpen: false,
        value: 'Litres',
        text: 'Litres'
      }
    };
  }

  //#region Get Helpers
  getEntry() {
    return {
      // eslint-disable-next-line
      id: parseInt(this.state.id),
      price: parseFloat(this.state.price),
      units: parseFloat(this.state.units),
      location: this.state.location,
      description: this.state.description
    };
  }

  getErrors(entry) {
    let errors = {};
    if (isNaN(entry.price)) errors.price = true;
    if (isNaN(entry.units)) errors.units = true;
    return errors;
  }
  //#endregion

  //#region Event HAndlers
  handleInputsChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]:value,
        errors
      })
    } else {
      console.log('Good!');
      this.setState({ [name]:value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();    
    const entry = this.getEntry();
    let errors = this.getErrors(entry);    
   
    this.setState({errors});

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      DataSource.pushEntry(entry);
      // this.setState({ done: true});
      !!this.onSubmit && this.onSubmit(e, entry);
      this.props.history.goBack();
    }
  }
  handleDelete = (e) => {
    DataSource.deleteEntry(this.state.id);
    this.setState({done: true});
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  }

  handleToggle = (e) => {
    const value = e.target.value;
    this.setState((prevState) => {
      let measurement = prevState.measurement;
      measurement.isOpen = !measurement.isOpen;
      measurement.value = value;
      measurement.text = value;
      return { measurement };
    });
  }

  //#endregion

  render() {
    const id = this.state.id;
    const price = this.state.price;
    const units = this.state.units;
    const location = this.state.location;
    const description =  this.state.description;
    const ppu = calculatePPU(price, units);
    // Unit TYpes
    const measurement = this.state.measurement;

    const colSettings = {
      sm: 12,
      md:  12,
      lg:  12,
      xl:  12
    }

    // eslint-disable-next-line
    // function UnitDropDown(props) {
    //   return (
    //     <ButtonDropdown isOpen={props.isOpen} toggle={props.onToggle}>
    //       <DropdownToggle caret color="secondary" value={props.value}>
    //         {props.text}
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         {DataSource.getUnits().map(x => (<DropdownItem key={x} value={x} >{x}</DropdownItem>))}
    //       </DropdownMenu>
    //     </ButtonDropdown>
    //   );
    // }

    // function PriceInput(props) {
    //   return (
        
    //   );
    // }

    const form = (
      <Form className="container-fluid unit-entry pt-2" onSubmit={this.handleSubmit}>
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <div className="display-4 text-center">${ppu}</div>
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <Label for="price" size="lg">Product</Label>
            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <Input type="number" name="price" value={price}
                placeholder="Product Price"
                onChange={this.handleInputsChange}
                valid={this.state.errors.price ? false : null} />
            </InputGroup>
            <div className="invalid-feedback">
              Please provide a price for the item.
            </div>
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <InputGroup>
              <InputGroupAddon>#</InputGroupAddon>
              <Input type="number" name="units" value={units}
                placeholder="Number of Units"
                onChange={this.handleInputsChange}
                valid={this.state.errors.units ? false : null} />
              <InputGroupButton>
                {/* <UnitDropDown {...measurement} onToggle={props.onToggle} /> */}
              </InputGroupButton>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <Label for="location" size="lg">Additional details</Label>
            <Input type="text" name="location" value={location}
              placeholder="Store or location"
              onChange={this.handleInputsChange} />
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <Input type="textarea" name="description" value={description}
              placeholder="Comments"
              onChange={this.handleInputsChange} />
          </Col>
        </FormGroup>
        <FormGroup row className="justify-content-right">
          {!!id &&
            <Col>
              <Button type="button" color="danger" outline onClick={this.handleDelete}>Delete</Button>
            </Col> 
          }
          <Col className="col-auto ml-auto unit-entry-actions">
            <Button type="button" color="secondary" outline onClick={this.handleCancel}>Cancel</Button>
            <Button type="submit" color="primary" outline className="ml-3">Done</Button>
          </Col>
        </FormGroup>
      </Form>
    );

    return (
      <div>
        {this.state.done ? <Redirect to="/" /> : form}
      </div>
    );
  }
}

UnitEntry.propTypes = {
  // Entry Properties
  id: PropTypes.number,
  price: PropTypes.number,
  units: PropTypes.number,
  location: PropTypes.string,
  desciption: PropTypes.string,
  // Events
  onSubmit: PropTypes.func,
  // History from React-Router
  history: PropTypes.object.isRequired
}

export default UnitEntry;