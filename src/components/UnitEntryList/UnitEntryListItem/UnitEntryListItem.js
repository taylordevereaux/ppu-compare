import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { calculatePPU } from '../../../utilities/calculatePPU';

class UnitEntryListItem extends Component {
    // constructor(props) {
    //     super(props);
    // }

    handleClick = (e) => {
        this.props.onClick && this.props.onClick(this.props.id);
    }

    render() {
        const price = this.props.price;
        const units = this.props.units;
        const description = this.props.description;
        const location = this.props.location;
        const ppu = calculatePPU(price, units);

        return (
            <ListGroupItem tag="a" action href="#" onClick={this.handleClick} >
                <ListGroupItemHeading className="d-flex w-100 justify-content-between">${ppu}<small>{location}</small></ListGroupItemHeading>
                <ListGroupItemText className="mb-1">${price} / {units}</ListGroupItemText>
                {description && <small>{description}</small>}
            </ListGroupItem>
        );
    }
}

UnitEntryListItem.propTypes = {
    id: PropTypes.number,
    price: PropTypes.number,
    units: PropTypes.number,

    handleClick: PropTypes.func
}

export default UnitEntryListItem;