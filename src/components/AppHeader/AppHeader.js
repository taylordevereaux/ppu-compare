import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// Theme
import './AppHeader.css';


class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Link to="/" replace>
        <Container fluid className="AppHeader border border-left-0 border-top-0 border-right-0 border-secondary ">
          <Row>
            <Col sm={2}>
              <span className="text-white m-0"><span className="icon icon-feather pr-1" />Pricey</span>
            </Col>
            <Col sm={{ size: 4, offset: 2}} className="text-center">
            </Col>
          </Row>
        </Container>
      </Link>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default AppHeader;