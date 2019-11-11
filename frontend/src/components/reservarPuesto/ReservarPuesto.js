import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectorUbicacion from '../selectorUbicacion/SelectorUbicacion';
import SelectorFecha from '../selectorFecha/SelectorFecha';

import './ReservarPuesto.css';
import moment from 'moment';

export class ReservarPuesto extends Component {
  constructor(props){
    super();

    this.actualizarMapa = this.actualizarMapa.bind(this);
  }

  static propTypes = {
    paises: PropTypes.array.isRequired,
    provincias: PropTypes.array.isRequired,
    localidades: PropTypes.array.isRequired
  };

  state = {
    fechaReserva: moment(new Date())
  };

  actualizarMapa(props){
    if (props.fechaReserva){
      this.setState({fechaReserva: props.fechaReserva});
    }
  }

  render() {
    return (
      <div>
        <SelectorUbicacion
          paises={this.props.paises}
          provincias={this.props.provincias}
          localidades={this.props.localidades}
          id_pais_default={this.props.id_pais_default}
          id_provincia_default={this.props.id_provincia_default}
          id_localidad_default={this.props.id_localidad_default}
        />
        <SelectorFecha
          actualizarMapa={this.actualizarMapa}
          fechaReserva={this.state.fechaReserva}
        />
      </div>
    );
  }
}

export default ReservarPuesto;
