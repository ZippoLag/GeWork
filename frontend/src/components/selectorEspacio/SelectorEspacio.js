import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

import httpClient from '../../fetchWrapper';

import Mapa from '../mapa/Mapa';

//TODO: convertir en selector de Cowork? (el selector de espacio en realidad va debajo del mapa y muestra los detalles)

import './SelectorEspacio.css';

export class SelectorEspacio extends Component {
  constructor(props) {
    super();

    this.handleCambioEspacio = this.handleCambioEspacio.bind(this);
    this.handleCambioCowork = this.handleCambioCowork.bind(this);
  }

  static propTypes = {
    espacios: PropTypes.array.isRequired,
    coworks: PropTypes.array.isRequired,
    id_espacio: PropTypes.number.isRequired,
    id_cowork: PropTypes.number.isRequired,
    elegirEspacio: PropTypes.func.isRequired,
    elegirCowork: PropTypes.func.isRequired
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

  handleCambioCowork(evento) {
    let nuevaIdSeleccionada =
      evento.target.selectedOptions[0].attributes.id_cowork.value;
    this.props.elegirCowork({
      id_cowork: Number.parseInt(nuevaIdSeleccionada)
    });
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
        <Col className='form-group col-12' role='group'>
          {this.state.googleMapsApiKey && (
            <Mapa
              googleMapsApiKey={this.state.googleMapsApiKey}
              coworks={this.props.coworks}
              elegirCowork={this.props.elegirCowork}
            />
          )}
        </Col>

        <Col className='form-group col-12 col-md-3' role='group'>
          <label htmlFor='cowork-select'>CoWork:</label>
          <select
            className='from-control'
            id='cowork-select'
            disabled={this.props.coworks.length === 0}
            value={this.props.id_cowork}
            onChange={this.handleCambioCowork}
          >
            {this.props.coworks.map((cowork) => (
              <option
                key={cowork.id_cowork}
                id_cowork={cowork.id_cowork}
                value={cowork.id_cowork}
              >
                {cowork.nombre_cowork}
              </option>
            ))}
          </select>
        </Col>

        <Col className='form-group col-12' role='group'>
          <CardDeck>
            {this.props.espacios
              .filter(
                (espacio) =>
                  this.props.id_cowork === 0 ||
                  this.props.id_cowork === espacio.cowork.id_cowork
              )
              .map((espacio) => (
                <Card key={espacio.id_espacio}>
                  <Card.Header>{espacio.nombre_espacio}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {espacio.cowork.nombre_cowork} - {espacio.nombre_espacio}
                    </Card.Title>
                    <Card.Text>{espacio.ubicacion_espacio}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {espacio.prestaciones.map((prestacion) => (
                      <span
                        className='mr-1 cursor-default'
                        title={prestacion.nombre_prestacion}
                        key={prestacion.id_prestacion}
                      >
                        {prestacion.icono_prestacion}
                      </span>
                    ))}
                  </Card.Footer>
                </Card>
              ))}
          </CardDeck>
        </Col>
      </Row>
    );
  }
}

export default SelectorEspacio;
