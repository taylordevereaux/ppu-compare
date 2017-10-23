import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class StatCard extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className={classnames('statcard', this.props.className)}>
        <h3 className="statcard-number">{this.props.number}</h3>
        <span className="statcard-desc">{this.props.desc}</span>
      </div>
    );
  }
}

StatCard.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object
  ]),
  desc: PropTypes.string,
  className: PropTypes.string
}

export default StatCard;  