import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
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

export default class FormContainer extends Component {
  static propTypes = {
    formItems: PropTypes.arrayOf(PropTypes.Component),
    className: PropTypes.string,
    fluid: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  static defaultProps = { 
    fluid: true
  }

  handleSubmit = (e) => {
    !!this.onSubmit && this.onSubmit(e);
  }


  render() {
    return (
      <Form className={classnames(this.props.fluid && 'container-fluid', this.props.className)} onSubmit={this.handleSubmit}>
        <Header />
        {/* Price of Product */}
        <FormGroup row className="justify-content-center">
          <Col {...colSettings} >
            <Label for="price">Price of Product</Label>
            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <Input type="number" name="price" value={price}
                placeholder="enter the price"
                onChange={this.handleInputsChange}
                valid={this.state.errors.price ? false : null} />
            </InputGroup>
            <div className="invalid-feedback">
              Please provide a price for the item.
            </div>
          </Col>
        </FormGroup>
        {/* Number of Units */}
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <Label for="price">Number of Units</Label>
            <InputGroup>
              <InputGroupAddon>#</InputGroupAddon>
              <Input type="number" name="units" value={units}
                placeholder="enter the units"
                onChange={this.handleInputsChange}
                valid={this.state.errors.units ? false : null} />
                {/* Excluding measurement for now. */}
              {/* <InputGroupButton>
                <UnitDropDown {...measurement} onToggle={this.handleToggle} />
              </InputGroupButton> */}
            </InputGroup>
          </Col>
        </FormGroup>
        {/* Location of Product */}
        <FormGroup row className="justify-content-center">
          <Col {...colSettings}>
            <Label for="location">Location of Product</Label>
            <Input type="text" name="location" value={location}
              placeholder="enter the location"
              onChange={this.handleInputsChange} />
          </Col>
        </FormGroup>
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
    )
  }
}
