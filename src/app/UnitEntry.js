import React, { Component } from 'react';

function calculatePPU(price, units) {
    let result = (parseFloat(price) / parseFloat(units)).toFixed(2);
    return isNaN(result) ? 0 : result;
}

class UnitEntry extends Component {
    constructor (props) {
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
                <label htmlFor="price">Price: $</label><input type="number" name="price" value={this.state.price} onChange={this.handleInputsChange} />
                <label htmlFor="units">Units:</label> <input type="number" name="units" value={this.state.units} onChange={this.handleInputsChange} />
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

export default UnitEntry;