import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Icon from '../Icon/Icon';

// Theme
import './AppHeader.css';

// Application Header for the entire application.
class AppHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {

    return (
      <Link to="/" replace>
        <Container fluid className="AppHeader border border-left-0 border-top-0 border-right-0 border-secondary ">
          <Row>
            <Col sm={2}>
              <span className="text-white m-0 font-italic"><Icon modifier="feather"/>Pricey</span>
            </Col>
            <Col sm={{ size: 4, offset: 2}} className="text-center">
            </Col>
          </Row>
        </Container>
      </Link>
    );
  }
}

export default AppHeader;