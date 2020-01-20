import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';

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
    actualizarMapa: PropTypes.func.isRequired
  };

  state = {};

  actualizarMapa(props) {
    this.props.actualizarMapa(props);
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
          />
        ) : (
          <h3>
            No hay Coworks con Espacios disponibles para mostrar. Seleccione
            otra ubicación/fecha.
          </h3>
        )}
      </div>
    );
  }
}

export default ReservarPuesto;
