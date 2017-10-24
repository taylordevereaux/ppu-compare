import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem, Container, Row, Col } from 'reactstrap';

export default class ProductListItem extends Component {
  static propTypes = {
    id: PropTypes.string
  }

  render() {
    return (
      <ListGroupItem tag="a" action href="#" onClick={this.handleClick} >
        {this.props.id}
      </ListGroupItem>
    )
  }
}
