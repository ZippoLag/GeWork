import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';

import moment from 'moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SelectorFecha.css';

export class SelectorFecha extends Component {
  constructor(props){
    super();

    this.handleCambiofecha = this.handleCambiofecha.bind(this);
  }

  static propTypes = {
    fechaReserva: momentPropTypes.momentObj.isRequired,
    actualizarMapa: PropTypes.func.isRequired
  };

  state = {
  };

  handleCambiofecha(evento){
    //TODO: agregar validaciones
    this.props.actualizarMapa({fechaReserva: moment(evento.target.value)});
  }

  render() {
    return (
      <Row className="d-flex justify-content-around align-items-center">
        <Col className="form-group col-12 col-md-3" role="group" >
          <label htmlFor="fecha-reserva">Fecha:</label>

          <input
            type="date"
            id="fecha-reserva"
            name="fecha-reserva"
            value={this.props.fechaReserva.format("YYYY-MM-DD")}
            onChange={this.handleCambiofecha}
            pattern="DD/MM/YYYY"
            min={new Date()}
          />
        </Col>
      </Row>
    );
  }
}

export default SelectorFecha;
