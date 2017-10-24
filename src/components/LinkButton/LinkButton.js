import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

export default class LinkButton extends Component {
  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.Component,
      PropTypes.object
    ]),
    to: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    color: 'link'
  }

  render() {
    return (
      <Link to={this.props.to}>
        <Button type="button" value="submit" color={this.props.color}>{this.props.text}</Button>
      </Link>
    )
  }
}
