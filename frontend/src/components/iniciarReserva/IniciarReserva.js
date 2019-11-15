import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './IniciarReserva.css';

export class IniciarReserva extends Component {
  static propTypes = {
  };

  state = {};

  render() {
    return (
      <Row className="d-flex justify-content-around align-items-center">
        <Col className="col-10 col-md-4 pt-5">
          <Link className="w-100 btn btn-primary" to="/reservar-puesto">Reservar Puesto</Link>
        </Col>
        <Col className="col-10 col-md-4 pt-5">
          <div className="w-100 btn btn-primary btn-disabled" disabled>Reservar Sala</div>
        </Col>
      </Row>
    );
  }
}

export default IniciarReserva;