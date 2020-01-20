import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import httpClient from '../../fetchWrapper';

import Mapa from '../mapa/Mapa';

//TODO: convertir en selector de Cowork? (el selector de espacio en realidad va debajo del mapa y muestra los detalles)

import './SelectorEspacio.css';

export class SelectorEspacio extends Component {
  constructor(props) {
    super();

    this.handleCambioEspacio = this.handleCambioEspacio.bind(this);
  }

  static propTypes = {
    espacios: PropTypes.array.isRequired,
    coworks: PropTypes.array.isRequired,
    id_espacio: PropTypes.number.isRequired
  };

  state = {
    googleMapsApiKey: ''
  };

  componentDidMount() {
    httpClient
      .get(`api/googlemapsapikey/`)
      .then((data) =>
        this.setState({ googleMapsApiKey: data.googleMapsApiKey })
      )
      .catch((error) => console.log(error));
  }

  handleCambioEspacio(evento) {
    let nuevaIdSeleccionada =
      evento.target.selectedOptions[0].attributes.id_espacio.value;
    this.props.elegirEspacio({
      id_espacio: Number.parseInt(nuevaIdSeleccionada)
    });
  }

  render() {
    return (
      <Row className='d-flex justify-content-around align-items-center'>
        <Col className='form-group col-12 col-md-3' role='group'>
          <label htmlFor='espacio-select'>Espacio:</label>
          <select
            className='from-control'
            id='espacio-select'
            disabled={this.props.espacios.length === 0}
            value={this.props.id_espacio}
            onChange={this.handleCambioEspacio}
          >
            {this.props.espacios.map((espacio) => (
              <option
                key={espacio.id_espacio}
                id_espacio={espacio.id_espacio}
                value={espacio.id_espacio}
              >
                {espacio.nombre_espacio}
              </option>
            ))}
          </select>
        </Col>
        <Col className='form-group col-12' role='group'>
          {this.state.googleMapsApiKey && (
            <Mapa
              googleMapsApiKey={this.state.googleMapsApiKey}
              coworks={this.props.coworks}
            />
          )}
        </Col>
      </Row>
    );
  }
}

export default SelectorEspacio;
