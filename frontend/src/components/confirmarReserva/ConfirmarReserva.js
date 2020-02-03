import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';

import './ConfirmarReserva.css';

export class ConfirmarReserva extends Component {
  constructor(props) {
    super();
  }

  static propTypes = {
    usuario: PropTypes.object.isRequired,
    espacio: PropTypes.object.isRequired,
    fechaReserva: momentPropTypes.momentObj.isRequired,
    codigo_turno: PropTypes.string.isRequired
  };

  state = {};

  componentDidMount() {
    this.props.refrescarURL('/confirmar-reserva');
  }

  render() {
    let nombreJornada = 'Jornada Completa';
    let horaInicio = this.props.espacio
      ? this.props.espacio.cowork.inicioTM_cowork
      : 0;
    let horaFin = this.props.espacio
      ? this.props.espacio.cowork.finTT_cowork
      : 23;
    let precio = this.props.espacio ? this.props.espacio.precioJC_espacio : 0;

    if (this.props.espacio) {
      if (this.props.codigo_turno === 'm') {
        nombreJornada = 'Turno Mañana';
        horaFin = this.props.espacio.cowork.finTM_cowork;
        precio = this.props.espacio.precioMJ_espacio;
      } else if (this.props.codigo_turno === 't') {
        nombreJornada = 'Turno Tarde';
        horaInicio = this.props.espacio.cowork.inicioTT_cowork;
        precio = this.props.espacio.precioMJ_espacio;
      }
    }

    let prestaciones = this.props.espacio
      ? this.props.espacio.prestaciones
          .map((p) => `${p.icono_prestacion}${p.nombre_prestacion}`)
          .join(', ')
          .replace(/, ([^, ]*)$/, ' y $1')
      : [];

    //TODO: mostrar detalles del usuario o login si no está loggeado
    //TODO: hacer fetch (POST) de la reserva y mostrar resultado

    return (
      <div>
        <h1>Confirmación de la Reserva</h1>
        {this.props.espacio ? (
          <p>
            El puesto reservado el{' '}
            {this.props.fechaReserva.format('DD/MM/YYYY')} de {horaInicio} a{' '}
            {horaFin} ({nombreJornada}) se encuentra en{' '}
            {this.props.espacio.cowork.nombre_cowork}, con dirección{' '}
            {this.props.espacio.cowork.direccion_cowork}. Allí busque{' '}
            {this.props.espacio.nombre_espacio} en{' '}
            {this.props.espacio.ubicacion_espacio}. Su puesto cuenta con{' '}
            {prestaciones}. El total que se descontará de su tarjeta es de $
            {precio}(ARS).
          </p>
        ) : (
          <p>
            Faltan cargar datos para confirmar la reserva, por favor vuelva a la
            página de inicio y recomience el proceso
          </p>
        ) /* TODO: mejorar este proceso, agregar link a '/reservar-pusto' */}
      </div>
    );
  }
}

export default ConfirmarReserva;
