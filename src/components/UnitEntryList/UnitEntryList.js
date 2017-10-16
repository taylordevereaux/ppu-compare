import React, { Component } from 'react';
import UnitEntryListItem from './UnitEntryListItem/UnitEntryListItem';
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { calculatePPU } from '../../utilities/calculatePPU';
import './UnitEntryList.css';

class UnitEntryList extends Component {
  // handleAdd = (e) => {
  //     const entries = this.props.entries;
  //     const newID = ids.length 
  //     ? (ids.reduce(function(a, next) {
  //             return Math.max(a, next);
  //         }) + 1)
  //     : 1;

  //     this.setState((prevState) => ({
  //         ids: [...prevState.ids, newID]
  //     }));
  // }

  handleRemove = (removeId) => {
    this.setState((prevState) => ({
      ids: prevState.ids.filter((id) => { return id !== removeId })
    }));
  }

  render() {
    const entries = this.props.entries;
    return (
      <Container fluid={true} className="px-0">
        <Row>
          <Col>
            <div class="btn-group">
              <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                PPU
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#?PPU">PPU</a>
                <a class="dropdown-item" href="#?Price">Price</a>
                <a class="dropdown-item" href="#?Units">Units</a>
                <a class="dropdown-item" href="#?Location">Location</a>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm="12" md="12" lg={{ size: 8, offset: 1 }} xl={{ size: 6, offset: 2 }} >
            <ListGroup>
              {entries.map((entry) =>
                <UnitEntryListItem key={entry.id.toString()} {...entry} history={this.props.history} onRemove={this.handleRemove} />
              )}
            </ListGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Link to="/Entry/">
            <Button type="button" value="submit" color="link">Add New Entry</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default UnitEntryList;