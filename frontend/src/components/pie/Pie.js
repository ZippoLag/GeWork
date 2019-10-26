import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';

import './Pie.css';

class Pie extends Component {
  state = {}

  render() {
    return (
        <footer>
          <Row className="w-100 d-flex justify-content-end align-items-end">
            Cindi L. Martín - Sebastián R. Vansteenkiste
          </Row>
        </footer>
    );
  }
}

export default Pie;
