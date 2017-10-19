import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

const SortItems = [
  { key: 'ppu', text: 'PPU' },
  { key: 'price', text: 'Price' },
  { key: 'Units', text: 'Units' },
  { key: 'location', text: 'Location' }
];

class UnitSortDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isOpen: false
    }
  }
  
  toggle = (e) => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen
      };
    });

    if (e.target.value !== this.props.value) {
      !!this.props.onChange && this.props.onChange(e.target.value);
    }
  }

  render() {
    const sortItem = SortItems.filter(x => x.key ===  this.props.value)[0];
    return (
      <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret color="secondary" value={sortItem.key} className="btn-link">
          {sortItem.text}
        </DropdownToggle>
        <DropdownMenu>
          { SortItems.map(x => (<DropdownItem key={x.key} value={x.key} >{x.text}</DropdownItem>)) }
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

UnitSortDropDown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default UnitSortDropDown;