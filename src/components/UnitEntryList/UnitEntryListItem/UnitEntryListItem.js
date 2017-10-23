import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, ListGroupItemText, Container, Row, Col } from 'reactstrap';

// Components
import StatCard from '../../StatCard/StatCard';

// Utilities
import accounting from 'accounting-js';
import classnames from 'classnames'

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
    const price = accounting.formatMoney(this.props.price);
    const ppu = accounting.formatMoney(this.props.ppu);
    const units = this.props.units;
    const location = this.props.location;
    const desc = this.props.description;

    const unitsText = (
      <span>{units}<small>ml</small></span>
    );

    const locationRow = (
      <Row>
        <Col className="text-right">
            <small className="align-top text-uppercase">&nbsp;{location}</small>
        </Col>
      </Row>
    );

    const descRow = (
      <Row>
        <Col className="text-center">
          <p className="align-bottom mt-2 mb-0">{desc}</p>
        </Col>
      </Row>
    );

    const statClasses = classnames("text-center" , "px-2");

    return (
        <ListGroupItem tag="a" action href="#" onClick={this.handleClick} >
          <Container fluid className="p-0">
            {location && locationRow}
            <Row>
                <Col>
                  <div className="d-flex justify-content-between w-100">
                    <StatCard className={statClasses} number={ppu} desc="Unit Price" />
                    <StatCard className={statClasses} number={price} desc="Price" />
                    <StatCard className={statClasses} number={unitsText} desc="Units" />
                  </div>
                </Col>
            </Row>
            { (desc) && descRow }
          </Container>
          {/* <ListGroupItemText tag="div" className="d-flex w-100 justify-content-between mb-0">
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
          </div> */}
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