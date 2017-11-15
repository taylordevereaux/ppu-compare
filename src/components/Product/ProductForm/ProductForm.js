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

export default class ProductForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,

  }

  render() {
    const id = this.props.id;
    const name = this.props.name;

    function NameInput(props) {
      return (
        <div>
          <Label for="name">Product Name</Label>
          <Input type="text" name="name" value={name}
            placeholder="Name of the product to compare"/>
          <div className="invalid-feedback">
            Please provide a name for the product.
          </div>
        </div>);
    };
    
    function UnitTypeOption(props) {
      const active = props.active;// ? true : false;
      return (
        <NavLink className="text-white" href="#" active={active}>{props.children}</NavLink>
      );
    }

    function UnitType(props) {
      return (
      <div className="hr-divider">
        <Nav className="nav-pills hr-divider-content hr-divider-nav ">
          <NavItem>
            <UnitTypeOption active>Volumne</UnitTypeOption>
          </NavItem>
          <NavItem>
            <UnitTypeOption >Mass</UnitTypeOption>
          </NavItem>
        </Nav>
      </div>);
    }

    return (
      <Form className="container-fluid pt-2">
        <FormGroup>
          <NameInput name={name}  />
        </FormGroup>
        <FormGroup>
          <UnitType  />
        </FormGroup>
      </Form>
    )
  }
}
