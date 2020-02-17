import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';

import { NotificationManager } from 'react-notifications';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import httpClient from '../../fetchWrapper';

import './ConfirmarReserva.css';

export class ConfirmarReserva extends Component {
  constructor(props) {
    super();

    this.handleConfirmacion = this.handleConfirmacion.bind(this);
  }

  static propTypes = {
    usuario: PropTypes.object,
    espacio: PropTypes.object, //Nota: técnicamente sí es requerido, pero si no está mostramos un error y no revienta
    fechaReserva: momentPropTypes.momentObj.isRequired,
    codigo_turno: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    refrescarURL: PropTypes.func.isRequired
  };

  state = {
    medioDePago: 'MercadoPago',
    reserva_confirmada: false
  };

  componentDidMount() {
    this.props.refrescarURL('/confirmar-reserva');
  }

  handleConfirmacion(evento) {
    evento.preventDefault();

    httpClient
      .post(`api/crear_contrato/`, {
        idEspacio: this.props.espacio.id_espacio,
        fechaReserva: this.props.fechaReserva.format('DD/MM/YYYY'),
        codigoTurno: this.props.codigo_turno,
        medioDePago: this.state.medioDePago
      })
      .then((data) => {
        this.setState({ reserva_confirmada: true });
        NotificationManager.success('Reserva creada con éxito!');
      })
      .catch((error) => {
        NotificationManager.error('No se pudo confirmar la reserva.');
      });

    return false;
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

    //TODO: mostrar login si no está loggeado

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
        {this.props.espacio && this.props.usuario ? (
          <form method='post'>
            <Row className='form-group col-12' role='group'>
              <legend>Datos del Cliente</legend>
            </Row>

            <Row className='form-group col-12' role='group'>
              <Col className='col-12 col-lg-6'>
                <span className='help-block text-muted small-font'>
                  Apellido
                </span>
                <input
                  id='apellido'
                  type='text'
                  className='form-control disabled'
                  placeholder='Apellido'
                  value={this.props.usuario.lastName}
                  readOnly
                />
              </Col>
              <Col className='col-12 col-lg-6'>
                <span className='help-block text-muted small-font'>Nombre</span>
                <input
                  id='nombre'
                  type='text'
                  className='form-control disabled'
                  placeholder='Nombre'
                  value={this.props.usuario.firstName}
                  readOnly
                />
              </Col>
            </Row>

            <Row className='form-group col-12' role='group'>
              <Col className='col-12'>
                <span className='help-block text-muted small-font'>e-mail</span>
                <input
                  id='email'
                  type='text'
                  className='form-control disabled'
                  placeholder='e-mail'
                  value={this.props.usuario.email}
                  readOnly
                />
              </Col>
            </Row>

            <Row className='form-group col-12' role='group'>
              <legend>Información de Pago</legend>
            </Row>

            <Row className='form-group col-12' role='group'>
              <Col className='col-12'>
                <span className='help-block text-muted small-font'>Monto</span>
                <input
                  id='monto'
                  type='text'
                  className='form-control disabled'
                  value={`${precio} (ARS)`}
                  readOnly
                />
              </Col>
            </Row>

            <Row className='form-group col-12' role='group'>
              <Col className='col-12'>
                <span className='help-block text-muted small-font'>
                  Medio de Pago
                </span>
                <select
                  className='from-control'
                  id='localidad-select'
                  value={this.state.medioDePago}
                  onChange={(evento) => {
                    this.setState({ medioDePago: evento.target.value });
                  }}
                >
                  <option value='MercadoPago'>MercadoPago</option>
                  <option value='Efectivo'>Efectivo</option>
                </select>
              </Col>
            </Row>
            <Row
              className='form-group col-6 d-flex justify-content-between'
              role='group'
            >
              <Col className='col-5'>
                <input
                  className='btn btn-secondary'
                  type='button'
                  value='< Volver'
                  onClick={() => {
                    if (this.state.reserva_confirmada) {
                      this.props.history.push('/');
                    } else {
                      //TODO: cuando se puedan resevar salas va a haber que mejorar esto
                      this.props.history.push('/reservar-puesto');
                    }
                  }}
                />
              </Col>
              <Col className='col-5'>
                <input
                  type='submit'
                  className={`btn btn-primary ${
                    this.state.reserva_confirmada ? 'btn-disabled' : ''
                  }`}
                  disabled={this.state.reserva_confirmada}
                  value='Confirmar'
                  onClick={this.handleConfirmacion}
                />
              </Col>
            </Row>
          </form>
        ) : (
          <p>Debe iniciar sesión para continuar</p>
        )}
      </div>
    );
  }
}

export default ConfirmarReserva;
