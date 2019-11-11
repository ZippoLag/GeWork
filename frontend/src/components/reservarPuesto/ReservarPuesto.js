import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectorUbicacion from '../selectorUbicacion/SelectorUbicacion'

import './ReservarPuesto.css';

export class ReservarPuesto extends Component {
  static propTypes = {
    paises: PropTypes.array.isRequired,
    provincias: PropTypes.array.isRequired,
    localidades: PropTypes.array.isRequired
  };

  state = {};

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
      </div>
    );
  }
}

export default ReservarPuesto;
