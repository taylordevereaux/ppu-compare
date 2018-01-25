// Package Imports
import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  //InputGroupButton,
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
      this.setState({ done: true});
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
    //const measurement = this.state.measurement;

    const colSettings = {
      sm: 12,
      md:  12,
      lg:  12,
      xl:  12
    }

    function ColWithSettings(props) {
      return (
        <Col {...colSettings} className={classnames(props.className)} >
          {props.children}
        </Col>
      );
    }

    function FormGroupRow(props) {
      return (
        <FormGroup row className="justify-content-center">
          {props.children}
        </FormGroup>
      );
    }

    function Header() {
      return (
        <FormGroupRow>
          <ColWithSettings className="mt-2" >
            <div className="display-4 text-center">${ppu}</div>
          </ColWithSettings>
        </FormGroupRow>
      );
    }

    // eslint-disable-next-line
    function UnitDropDown(props) {
      return (
        <ButtonDropdown isOpen={props.isOpen} toggle={props.onToggle}>
          <DropdownToggle caret color="secondary" value={props.value}>
            {props.text}
          </DropdownToggle>
          <DropdownMenu>
            {DataSource.getUnits().map(x => (<DropdownItem key={x} value={x} >{x}</DropdownItem>))}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }

    function PriceInput(props) {
      return (
        <ColWithSettings>
          <Label for="price">Price of Product</Label>
          <InputGroup>
            <InputGroupAddon>$</InputGroupAddon>
            <Input type="number" name="price" value={props.value}
              placeholder="enter the price"
              onChange={props.onChange}
              valid={props.valid} />
          </InputGroup>
          <div className="invalid-feedback">
            Please provide a price for the item.
          </div>
        </ColWithSettings>
      );
    }

    function UnitInput(props) {
      return (
        <ColWithSettings>
          <Label for="units">Number of Units</Label>
          <InputGroup>
            <InputGroupAddon>#</InputGroupAddon>
            <Input type="number" name="units" value={props.value}
              placeholder="enter the units"
              onChange={props.onChange}
              valid={props.valid} />
            <InputGroupButton>
              <UnitDropDown {...measurement} onToggle={props.onToggle} />
            </InputGroupButton>
          </InputGroup>
        </ColWithSettings>
      );
    }


    const form = (
      <Form className="container-fluid unit-entry pt-2" onSubmit={this.handleSubmit}>
        <Header />
        <FormGroupRow>
          <PriceInput value={price} onChange={this.handleInputsChange} valid={this.state.errors.price ? false : null} />
        </FormGroupRow>
        <FormGroupRow>
          <UnitInput value={units} onChange={this.handleInputsChange} valid={this.state.errors.units ? false : null} onToggle={this.handleToggle} />
        </FormGroupRow>
        <FormGroupRow>
          <ColWithSettings>
            <Label for="location">Location of Product</Label>
            <Input type="text" name="location" value={location}
              placeholder="enter the location"
              onChange={this.handleInputsChange} />
          </ColWithSettings>
        </FormGroupRow>
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <Label for="description">Additional Details</Label>
            <Input type="textarea" name="description" value={description}
              placeholder="enter additional details"
              onChange={this.handleInputsChange} />
          </Col>
        </FormGroup>
        {/* Footer Actions */}
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
  // History from React-Router
  history: PropTypes.object.isRequired
}

export default UnitEntry;