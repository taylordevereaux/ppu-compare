import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link, history } from 'react-router-dom';
import { calculatePPU } from '../../../utilities/calculatePPU';

class UnitEntryListItem extends Component {
  // constructor(props) {
  //     super(props);
  // }

  handleClick = (e) => {
    e.preventDefault();
    const id = this.props.id;
    this.props.history.push(`/Entry/${id}`);
    //this.props.onClick && this.props.onClick(this.props.id);
  }

  render() {
    const price = this.props.price;
    const units = this.props.units;
    const description = this.props.description;
    const location = this.props.location;
    const ppu = calculatePPU(price, units);

    return (
        <ListGroupItem tag="a" action href="#" onClick={this.handleClick} >
          <ListGroupItemText tag="div" className="d-flex w-100 justify-content-between mb-0">
            <div className="d-inline">
              <span className="display-4">${ppu}</span>
              <div className="d-inline-block align-content-right">
              </div>
            </div>
            <div className="d-inline-block text-right">
              <div><small className="align-top text-uppercase">{location}</small></div>
              <div className="h3">${price} / {units}</div>
            </div>
          </ListGroupItemText>
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