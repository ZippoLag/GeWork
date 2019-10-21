import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import PropTypes from "prop-types";

import './Cabecera.css';

class Cabecera extends Component {
  static propTypes = {
    usuario: PropTypes.object
  };

  render() {
    return (
      <header>
        <Row className='justify-content-between'>
          <div><h1>GeWork</h1></div>
          <div>{this.props.usuario ? this.props.usuario.username : "Login"}</div>
        </Row>
      </header>
    );
  }
}

export default Cabecera;
