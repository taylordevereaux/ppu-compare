import React, { Component } from 'react';
import UnitEntry from './UnitEntry';
import { InputGroup, InputGroupAddon, Input, Label, FormGroup, Container, Row, Col } from 'reactstrap';

function calculatePPU(price, units) {
    let result = (parseFloat(price) / parseFloat(units)).toFixed(2);
    return isNaN(result) ? 0 : result;
}

class UnitEntryListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '',
            units: '',
            type: ''
        };
    }

    handleInputsChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRemove = (e) => {
        this.props.onRemove(this.props.id);
    }

    render() {
        const price = this.state.price;
        const units = this.state.units;
        const ppu = calculatePPU(price, units);

        return (
            <li className="unit-entry">
                <Container fluid={false}>
                    <Row className="justify-content-center">
                        <Col sm="12" md="8" lg="4">
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon>$</InputGroupAddon>
                                    <Input type="number" name="price" value={this.state.price} placeholder="enter the price" onChange={this.handleInputsChange} />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm="12" md="8" lg="4">
                            <FormGroup>
                                <Input type="number" name="units" value={this.state.units} placeholder="enter the units" onChange={this.handleInputsChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Container>
                <label htmlFor="type">Type:</label>
                <select name="type" value={this.state.type} onChange={this.handleInputsChange}>
                    <option value="l">l</option>
                    <option value="ml">ml</option>
                    <option value="ounce">oz</option>
                </select>
                <label>PPU:</label><span>${ppu}</span>
                <button type="button" value="submit" onClick={this.handleRemove}>Remove</button>
            </li>
        );
    }
}

export default UnitEntryListItem;