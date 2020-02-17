import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SelectorUbicacion from '../selectorUbicacion/SelectorUbicacion';
import SelectorFecha from '../selectorFecha/SelectorFecha';
import SelectorEspacio from '../selectorEspacio/SelectorEspacio';

import './ReservarPuesto.css';

export class ReservarPuesto extends Component {
  constructor(props) {
    super();

    this.actualizarMapa = this.actualizarMapa.bind(this);
  }

  static propTypes = {
    paises: PropTypes.array.isRequired,
    provincias: PropTypes.array.isRequired,
    localidades: PropTypes.array.isRequired,
    fechaReserva: momentPropTypes.momentObj.isRequired,
    actualizarMapa: PropTypes.func.isRequired,
    elegirEspacio: PropTypes.func.isRequired,
    elegirCowork: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    refrescarURL: PropTypes.func.isRequired
  };

  state = {};

  actualizarMapa(props) {
    this.props.actualizarMapa(props);
  }

  componentDidMount() {
    this.props.refrescarURL('/reservar-puesto');
  }

  render() {
    return (
      <div>
        <SelectorUbicacion
          paises={this.props.paises}
          provincias={this.props.provincias}
          localidades={this.props.localidades}
          id_pais={this.props.id_pais}
          id_provincia={this.props.id_provincia}
          id_localidad={this.props.id_localidad}
          actualizarMapa={this.actualizarMapa}
        />
        <SelectorFecha
          actualizarMapa={this.actualizarMapa}
          fechaReserva={this.props.fechaReserva}
        />
        {this.props.espacios.length > 0 ? (
          <SelectorEspacio
            coworks={this.props.coworks}
            espacios={this.props.espacios}
            puestos={this.props.puestos}
            id_espacio={this.props.id_espacio}
            elegirEspacio={this.props.elegirEspacio}
            id_cowork={this.props.id_cowork}
            elegirCowork={this.props.elegirCowork}
          />
        ) : (
          <h3>
            No hay Coworks con Espacios disponibles para mostrar. Seleccione
            otra ubicación/fecha.
          </h3>
        )}
        <Row
          className='form-group col-6 d-flex justify-content-between'
          role='group'
        >
          <Col className='col-5'>
            <input
              className='btn btn-secondary'
              type='button'
              value='< Volver'
              onClick={() => this.props.history.push('/')}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ReservarPuesto;
