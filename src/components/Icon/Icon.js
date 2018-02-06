import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';

// Icon is a wrapper for the Envato Icons toolset.
export default function Icon(props) {
  return <span className={classnames(`icon icon-${props.modifier}`, props.className)} />;
}
// Set the property types for the icon Class.
Icon.propTypes = {
  modifier: PropTypes.string.isRequired,
  className: PropTypes.string
}

  