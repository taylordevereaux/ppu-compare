import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, FormGroup, Form, Button, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function calculatePPU(price, units) {
  let result = (parseFloat(price) / parseFloat(units)).toFixed(2);
  return isNaN(result) ? 0 : result;
}

class UnitEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || null,
      price: props.price || '',
      units: props.units || '',
      errors: {},
      done: false
    };
  }

  handleInputsChange = (e) => {
    const target = e.target;
    const value = parseFloat(target.value);
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
    let errors = {};
    const price = parseFloat(this.state.price);
    const units = parseFloat(this.state.units);
    if (price === NaN) errors.price = "Can't be empty";
    if (units === NaN) errors.units = "Can't be empty";

    this.setState({errors});

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      // TODO : This is temporary.
      let entry = window.Entries.find(x => x.id === parseInt(this.state.id));
      if (entry) {
        entry.price = price;
        entry.units = units;
      } else {
        const id = window.Entries.length
          ? (window.Entries.map(x => x.id)
            .reduce(function (a, next) {
              return Math.max(a, next);
            }) + 1)
          : 1;
          window.Entries.push({id, price, units});
      }
      this.setState({ done: true});
    }
  }
  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const price = this.state.price;
    const units = this.state.units;
    const ppu = calculatePPU(price, units);

    const colSettings = {
      sm: 12,
      md: 12,
      lg: {
        size: 8,
        offset: 1
      },
      xl: {
        size: 6,
        offset: 2
      }
    }

    const form = (<Form className="container-fluid mt-2" onSubmit={this.handleSubmit}>
      <FormGroup row className="justify-content-center">
        <Col {...colSettings} >
          <h2 className="text-center">${ppu}</h2>
        </Col>
      </FormGroup>
      <FormGroup row className="justify-content-center">
        <Col {...colSettings} >
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
      <FormGroup row className="justify-content-center">
        <Col {...colSettings}>
          <InputGroup>
            <InputGroupAddon>#</InputGroupAddon>
            <Input type="number" name="units" value={units}
              placeholder="enter the units"
              onChange={this.handleInputsChange}
              valid={this.state.errors.units ? false : null} />
          </InputGroup>
        </Col>
      </FormGroup>
      <FormGroup row className="justify-content-center">
        <Col {...colSettings}>
          <Row>
            <Col className="col-auto mr-auto">
              <Button type="submit" color="primary">Done</Button>
            </Col>
            <Col className="col-auto">
              <Button type="button" color="secondary" onClick={this.handleCancel}>Cancel</Button>
            </Col>
          </Row>
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
  // History from React-Router
  history: PropTypes.object.isRequired
}

export default UnitEntry;