import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

import './Pie.css';

class Pie extends Component {
  state = {}

  render() {
    return (
      <footer>
        <Row className='justify-content-between'>
          Copyright GeWork 2019 (?)
        </Row>
      </footer>
    );
  }
}

export default Pie;
