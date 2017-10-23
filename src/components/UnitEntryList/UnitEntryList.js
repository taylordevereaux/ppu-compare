import React, { Component } from 'react';
import UnitEntryListItem from './UnitEntryListItem/UnitEntryListItem';
import { Button, ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import UnitSortDropDown from './UnitSortDropDown/UnitSortDropDown'
import calculatePPU from '../../utilities/calculatePPU';
import './UnitEntryList.css';

class UnitEntryList extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       sortKey: 'ppu'
    }
  }

  handleRemove = (removeId) => {
    this.setState((prevState) => ({
      ids: prevState.ids.filter((id) => { return id !== removeId })
    }));
  }

  handleSort = (sortKey) => {
    this.setState({sortKey});
  }

  render() {
    const entries = this.props.entries;
    const sortKey = this.state.sortKey;

    const list = entries
      .map(x => Object.assign(x, { ppu: calculatePPU(x.price, x.units) }))
      .sort((a,b) => a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0)
      .map((entry) =>  <UnitEntryListItem key={entry.id.toString()} {...entry} history={this.props.history} onRemove={this.handleRemove} />);

    return (
      <div>
        <div className="d-flex justify-content-end">
          <UnitSortDropDown value={sortKey} onChange={this.handleSort} />
        </div>
        <div className="d-flex flex-column">
          <ListGroup>
            {list}
          </ListGroup>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/Entry/">
            <Button type="button" value="submit" color="link">Add New Entry</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default UnitEntryList;