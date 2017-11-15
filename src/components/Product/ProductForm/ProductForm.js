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
  DropdownItem
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

    return (
      <Form>
        <FormGroup>
          <NameInput name={name}  />
        </FormGroup>
      </Form>
    )
  }
}
