import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, FormGroup, Form, Button } from 'reactstrap';

function calculatePPU(price, units) {
    let result = (parseFloat(price) / parseFloat(units)).toFixed(2);
    return isNaN(result) ? 0 : result;
}

class UnitEntry extends Component {
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
            <Form>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon>$</InputGroupAddon>
                        <Input type="number" name="price" value={this.state.price}
                            placeholder="enter the price"
                            onChange={this.handleInputsChange} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon>$</InputGroupAddon>
                        <Input type="number" name="units" value={this.state.units}
                            placeholder="enter the units"
                            onChange={this.handleInputsChange} />
                    </InputGroup>
                </FormGroup>
                <Button type="submit" color="primary">Done</Button>
            </Form>
        );
    }
}

export default UnitEntry;