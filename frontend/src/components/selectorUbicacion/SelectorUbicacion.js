import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SelectorUbicacion.css';

export class SelectorUbicacion extends Component {
  static propTypes = {
    paises: PropTypes.array.isRequired,
    provincias: PropTypes.array.isRequired,
    localidades: PropTypes.array.isRequired,
    id_pais_default: PropTypes.number,
    id_provincia_default: PropTypes.number,
    id_localidad_default: PropTypes.number
  };

  state = {
    id_pais: 0,
    id_provincia: 0,
    id_localidad: 0
  };

  render() {
    //TODO: mejorar apariencia! (ver por qué no andaban los dropdowns de bootstrap!)
    return (
      <Row className="d-flex justify-content-around align-items-center">
        <Col className="form-group col-12 col-md-3" role="group" >
          <label htmlFor="pais-select">País:</label>
          {/* TODO: onSelect debería actualizar y limpiar el selector de provincias (y localidades, y limpiar mapa?) */}
          <select className="from-control" id="pais-select" >
            {this.props.paises.map(pais => (
              <option
              key={pais.id_pais}
              active={
                (this.state.id_pais === pais.id_pais ||
                (this.state.id_pais === 0 && this.props.id_pais_default === pais.id_pais)).toString()
              }
              >
                {pais.nombre_pais}
              </option>
            ))}
          </select>
        </Col>

        <Col className="form-group col-12 col-md-3" role="group" >
          <label htmlFor="provincia-select">Provincia:</label>
          {/* TODO: onSelect debería actualizar y limpiar el selector de localidades (y limpiar mapa?) */}
          <select className="from-control" id="provincia-select" >
            {this.props.provincias.map(provincia => (
              <option
              key={provincia.id_provincia}
              active={
                (this.state.id_provincia === provincia.id_provincia ||
                (this.state.id_provincia === 0 && this.props.id_provincia_default === provincia.id_provincia)).toString()
              }
              >
                {provincia.nombre_provincia}
              </option>
            ))}
          </select>
        </Col>

        <Col className="form-group col-12 col-md-3" role="group" >
          <label htmlFor="localidad-select">Localidad:</label>
          {/* TODO: onSelect debería actualizar y limpiar el mapa */}
          <select className="from-control" id="localidad-select" >
            {this.props.localidades.map(localidad => (
              <option
              key={localidad.id_localidad}
              active={
                (this.state.id_localidad === localidad.id_localidad ||
                (this.state.id_localidad === 0 && this.props.id_localidad_default === localidad.id_localidad)).toString()
              }
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
