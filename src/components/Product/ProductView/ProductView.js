import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components

export default class ProductView extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    
  }

  render() {
    return (
      <div>
        testing
      </div>
    )
  }
}
