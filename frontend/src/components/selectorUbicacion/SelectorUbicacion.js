import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SelectorUbicacion.css';

export class SelectorUbicacion extends Component {
  constructor(props) {
    super();

    this.handleCambioPais = this.handleCambioPais.bind(this);
    this.handleCambioProvincia = this.handleCambioProvincia.bind(this);
    this.handleCambioLocalidad = this.handleCambioLocalidad.bind(this);
  }

  static propTypes = {
    paises: PropTypes.array.isRequired,
    provincias: PropTypes.array.isRequired,
    localidades: PropTypes.array.isRequired,
    id_pais: PropTypes.number,
    id_provincia: PropTypes.number,
    id_localidad: PropTypes.number,
    actualizarMapa: PropTypes.func.isRequired
  };

  state = {};

  handleCambioPais(evento) {
    let nuevaIdSeleccionada =
      evento.target.selectedOptions[0].attributes.id_pais.value;
    console.log(`Cambiando Id Pais Seleccionado a '${nuevaIdSeleccionada}'`);
    this.props.actualizarMapa({
      id_pais: Number.parseInt(nuevaIdSeleccionada)
    });
  }

  handleCambioProvincia(evento) {
    let nuevaIdSeleccionada =
      evento.target.selectedOptions[0].attributes.id_provincia.value;
    console.log(
      `Cambiando Id Provincia Seleccionada a '${nuevaIdSeleccionada}'`
    );
    this.props.actualizarMapa({
      id_provincia: Number.parseInt(nuevaIdSeleccionada)
    });
  }

  handleCambioLocalidad(evento) {
    let nuevaIdSeleccionada =
      evento.target.selectedOptions[0].attributes.id_localidad.value;
    console.log(
      `Cambiando Id Localidad Seleccionada a '${nuevaIdSeleccionada}'`
    );
    this.props.actualizarMapa({
      id_localidad: Number.parseInt(nuevaIdSeleccionada)
    });
  }

  componentDidMount() {}

  render() {
    //TODO: mejorar apariencia! (ver por qué no andaban los dropdowns de bootstrap!)
    return (
      <Row className='d-flex justify-content-around align-items-center'>
        <Col className='form-group col-12 col-md-3' role='group'>
          <label htmlFor='pais-select'>País:</label>
          <select
            className='from-control'
            id='pais-select'
            onChange={this.handleCambioPais}
          >
            {this.props.paises.map((pais) => (
              <option
                key={pais.id_pais}
                id_pais={pais.id_pais}
                selected={this.props.id_pais === pais.id_pais}
              >
                {pais.nombre_pais}
              </option>
            ))}
          </select>
        </Col>

        <Col className='form-group col-12 col-md-3' role='group'>
          <label htmlFor='provincia-select'>Provincia:</label>
          <select
            className='from-control'
            id='provincia-select'
            disabled={this.props.id_pais === 0}
            onChange={this.handleCambioProvincia}
          >
            {this.props.provincias.map((provincia) => (
              <option
                key={provincia.id_provincia}
                id_provincia={provincia.id_provincia}
                selected={this.props.id_provincia === provincia.id_provincia}
              >
                {provincia.nombre_provincia}
              </option>
            ))}
          </select>
        </Col>

        <Col className='form-group col-12 col-md-3' role='group'>
          <label htmlFor='localidad-select'>Localidad:</label>
          <select
            className='from-control'
            id='localidad-select'
            disabled={this.props.id_provincia === 0}
            onChange={this.handleCambioLocalidad}
          >
            {this.props.localidades.map((localidad) => (
              <option
                key={localidad.id_localidad}
                id_localidad={localidad.id_localidad}
                selected={this.props.id_localidad === localidad.id_localidad}
              >
                {localidad.nombre_localidad}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    );
  }
}

export default SelectorUbicacion;
