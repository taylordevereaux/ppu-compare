import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, ListGroupItemText } from 'reactstrap';
// import { calculatePPU } from '../../../utilities/calculatePPU';

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
    const location = this.props.location;
    const description = this.props.description;
    const ppu = this.props.ppu;

    return (
        <ListGroupItem tag="a" action href="#" onClick={this.handleClick} >
          <ListGroupItemText tag="div" className="d-flex w-100 justify-content-between mb-0">
            <div className="d-inline">
              <span className="display-4">${ppu}</span>
              <div className="d-inline-block align-content-right">
              </div>
            </div>
            <div className="d-inline-block text-right">
              <div><small className="align-top text-uppercase">&nbsp;{location}</small></div>
              <div className="h3">${price} / {units}</div>
            </div>
          </ListGroupItemText>
          <div className="mb-0">
            <small>{description} </small>
          </div>
        </ListGroupItem>
    );
  }
}

UnitEntryListItem.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  units: PropTypes.number,
  location: PropTypes.string,
  description: PropTypes.string,

  handleClick: PropTypes.func
}

export default UnitEntryListItem;