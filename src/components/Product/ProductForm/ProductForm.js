import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
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
  Dropdown,
  DropdownMenu,
  DropdownItem,
  NavItem,
  Nav,
  NavLink
} from 'reactstrap';

// Utilities
import DataSource, { UnitLists } from '../../../utils/DataSource';

//#region Inline Functions
function NameInput(props) {
  return (
    <div>
      <Label for="name">Product Name</Label>
      <Input type="text" name="name" value={props.name}
        onChange={props.onChange}
        placeholder="Name of the product to compare"
        valid={props.valid}/>
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

function UnitTypeSelect(props) {
  const items = props.items.map(e => (<option value={e}>{e}</option>));  
  return (
    <Input type="select" name="unitOfMeasurement" value={props.value} onChange={props.onChange}>
      {items}
    </Input>
  );
}
// #endregion

export default class ProductForm extends Component {
  // Prop Types
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      measurementType: PropTypes.string,
      unitOfMeasurement: PropTypes.string
    }),
    done: PropTypes.bool,
    history: PropTypes.object.isRequired
  }
  // Default Props
  static defaultProps = {
    product: {
      id: "",
      name: "",
      measurementType: "volumn",
      unitOfMeasurement: "Litre (l)"
    },
    done: false
  }
  // Constructor
  constructor (props) {
    super(props);
    this.state = {
      product: props.product,
      errors: {}
    };
  }
  //#region  Helpers

  getErrors(product) {
    let errors = {};
    if (product.name === "") errors.name = true;
    // if (product.unitOfMeasurement === "") errors.unitOfMeasurement = true;
    return errors;
  }
  // SEts the property of the product to state.
  setProductState(prop) {
    this.setState((prevState, props) => Object.assign(prevState.product, prop));
  }
  //#endregion

  // #region Event handlers
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setProductState({[name]:value});
  }

  handleMeasurementTypeChange = (e) => {
    const value = e.target.attributes["value"].value;
    if (value != this.state.measurementType) {
      this.setProductState({measurementType:value, unitOfMeasurement: UnitLists[value][0]});
    }
  }

  handleDelete = (e) => {
    DataSource.deleteProduct(this.state.id);
    this.setState({done: true});
  }

  handleCancel = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.props.history));
    this.props.history.goBack();
  }
  
  handleSubmit = (e) => {
    e.preventDefault();    
    const product = this.state.product;
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
    const product = this.state.product;
    const units = UnitLists[product.measurementType]// === "volumn"
    const form = (
      <Form className="container-fluid pt-2 product-form" onSubmit={this.handleSubmit}>
        <FormGroup>
          <NameInput name={product.name} onChange={this.handleInputChange} valid={this.state.errors.name ? false : null} />
        </FormGroup>
        <FormGroup>
          <UnitType value={product.measurementType} onClick={this.handleMeasurementTypeChange} />
        </FormGroup>
        <FormGroup>
          <UnitTypeSelect
            onChange={this.handleInputChange}
            value={product.unitOfMeasurement}
            items={units}
             />
        </FormGroup>
        <FormGroup row className="justify-content-right">
          {!!product.id &&
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
    );

    return (this.state.done ? <Redirect to="/" /> : form);
  }
}
