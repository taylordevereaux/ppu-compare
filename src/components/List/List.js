import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ListGroup} from 'reactstrap';

export default class List extends Component {
  static propTypes = {
    header: PropTypes.Component,
    listItems: PropTypes.Component,
    footer: PropTypes.Component,
    emptyMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.Component,
      PropTypes.object
    ])
  }

  render() {

    const empty = (<p className="text-center">{this.props.emptyMessage}</p>);

    const list = (<ListGroup>{this.props.listItems}</ListGroup>)

    const body = !!this.props.listItems && this.props.listItems.length ? list : empty;

    const header = !!this.props.header ? this.props.header : (<div className="m-3" />);

    const footer = this.props.footer;

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
    )
  }
}
