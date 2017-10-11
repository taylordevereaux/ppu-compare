import React, { Component } from 'react';

function calculatePPU(price, units) {
    return (parseFloat(price) / parseFloat(units)).toFixed(2);
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

    render() {
        const price = this.state.price;
        const units = this.state.units;
        const type = this.state.type;

        const ppu = calculatePPU(price, units);

        return (
            <div>
                <form>
                    <label htmlFor="price">Price: $</label><input type="number" name="price" value={this.state.price} onChange={this.handleInputsChange} />
                    <label htmlFor="units">Units:</label> <input type="number" name="units" value={this.state.units} onChange={this.handleInputsChange} />
                    <label htmlFor="type">Type:</label> 
                    <select name="type">
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="ounce">oz</option>
                    </select>
                    <label>PPU:</label><span>${ppu}</span>
                </form>
            </div>
        );
    }
}

export default UnitEntry;