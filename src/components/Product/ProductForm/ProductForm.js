import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  DropdownItem,
  NavItem,
  Nav,
  NavLink
} from 'reactstrap';

// Utilities
import DataSource from '../../../utils/DataSource';

//#region Inline Functions
function NameInput(props) {
  return (
    <div>
      <Label for="name">Product Name</Label>
      <Input type="text" name="name" value={props.name}
        onChange={props.onChange}
        placeholder="Name of the product to compare"/>
      <div className="invalid-feedback">
        Please provide a name for the product.
      </div>
    </div>);
}

function UnitTypeOption(props) {
  const active = props.active;// ? true : false;
  const value = props.value;
  return (
    <NavLink className="text-white" href="#" active={active} value={value} onClick={props.onClick} >{props.children}</NavLink>
  );
}

function UnitType(props) {
  const value = props.value;
  return (
  <div className="hr-divider">
    <Nav className="nav-pills hr-divider-content hr-divider-nav ">
      <NavItem>
        <UnitTypeOption active={value == "volumn"} onClick={props.onClick} value="volumn">Volumne</UnitTypeOption>
      </NavItem>
      <NavItem>
        <UnitTypeOption active={value == "mass"} onClick={props.onClick} value="mass">Mass</UnitTypeOption>
      </NavItem>
    </Nav>
  </div>);
}
// #endregion

export default class ProductForm extends Component {
  // Prop Types
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    measurementType: PropTypes.string,
    unitOfMeasurement: PropTypes.string,
  }
  // Default Props
  static defaultProps = {
    measurementType: "volumn",
    unitOfMeasurement: "litres"
  }
  // Constructor
  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      measurementType: props.measurementType,
      unitOfMeasurement: props.unitOfMeasurement
    };
  }

  //#region Get Helpers
  getProduct() {
    return {
      id: parseInt(this.state.id),
      name: this.state.name,
      measurementType: this.state.measurementType,
      unitOfMeasurement: this.state.unitOfMeasurement
    };
  }

  getErrors(product) {
    let errors = {};
    if (isNaN(product.name)) errors.name = true;
    if (product.measurementType === "") errors.measurementType = true;
    if (product.unitOfMeasurement === "") errors.unitOfMeasurement = true;
    return errors;
  }
  //#endregion

  // #region Event handlers
  handleMeasurementTypeChange = (e) => {
    const value = e.target.attributes["value"].value;
    if (value != this.state.measurementType) {
      this.setState({measurementType:value});
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]:value});
  }

  handleDelete = (e) => {
    DataSource.deleteProduct(this.state.id);
    this.setState({done: true});
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  }
  
  handleSubmit = (e) => {
    e.preventDefault();    
    const product = this.getProduct();
    let errors = this.getErrors(product);    
   
    this.setState({errors});

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      DataSource.pushProduct(product);
      this.setState({ done: true});
    }
  }
  //#endregion

  render() {
    const name = this.state.name;
    const measurementType = this.state.measurementType;
    const id = this.state.id;
    return (
      <Form className="container-fluid pt-2 product-form" onSubmit={this.handleSubmit}>
        <FormGroup>
          <NameInput name={name} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <UnitType value={measurementType} onClick={this.handleMeasurementTypeChange}/>
        </FormGroup>
        <FormGroup row className="justify-content-right">
          {!!id &&
            <Col>
              <Button type="button" color="danger" outline onClick={this.handleDelete}>Delete</Button>
            </Col> 
          }
          <Col className="col-auto ml-auto product-form-actions">
            <Button type="button" color="secondary" outline onClick={this.handleCancel}>Cancel</Button>
            <Button type="submit" color="primary" outline className="ml-3">Done</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}
