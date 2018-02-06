import React, { Component } from 'react';
import { Button, ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
// Components
import UnitSortDropDown from './UnitSortDropDown/UnitSortDropDown'
import UnitEntryListItem from './UnitEntryListItem/UnitEntryListItem';
import ListContainer from '../ListContainer/ListContainer';
import LinkButton from '../LinkButton/LinkButton';
// Utils
import calculatePPU from '../../utils/calculatePPU';
// Styles
import './UnitEntryList.css';

class UnitEntryList extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       sortKey: 'ppu'
    }
  }

  handleSort = (sortKey) => {
    this.setState({sortKey});
  }

  render() {
    const entries = this.props.entries;
    const sortKey = this.state.sortKey;
    const history = this.props.history;

    const listItems = entries
      .map(x => Object.assign(x, { ppu: calculatePPU(x.price, x.units) }))
      .sort((a, b) => a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0)
      .map((entry) => <UnitEntryListItem key={entry.id.toString()} {...entry} history={history}/>);

    const header = listItems.length ? (<UnitSortDropDown value={sortKey} onChange={this.handleSort} />) : (<div className="m-3" />);
    
    const body = !!listItems.length ? (<ListGroup>{listItems}</ListGroup>) : (<p className="text-center">No items to compare, try adding a new one.</p>);

    const footer = (<LinkButton to={history.location.pathname + "/Entry/"} text="Add Compare Item" />);

    return (
      <div>
        <div className="d-flex justify-content-end">
          {header}
        </div>
        <div className="d-flex flex-column">
          {body}
        </div>
        <div className="d-flex justify-content-center">
          {footer}
        </div>
      </div>
    );
  }
}

export default UnitEntryList;