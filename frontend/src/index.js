import React, { Suspense, Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router';

import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

import { initializeReactUrlState } from 'react-url-state';

import moment from 'moment';

import Cabecera from './components/cabecera/Cabecera';
import Pie from './components/pie/Pie';

import ElegirAccion from './components/elegirAccion/ElegirAccion';
import ReservarPuesto from './components/reservarPuesto/ReservarPuesto';
import ConfirmarReserva from './components/confirmarReserva/ConfirmarReserva';

import httpClient from './fetchWrapper';

import './index.css';

let reactUrlStateOptions = {
  fromIdResolvers: {
    id_pais: (id_pais) =>
      new Promise(async (resolve, reject) =>
        resolve(id_pais ? Number.parseInt(id_pais) : 0)
      ),
    id_provincia: (id_provincia) =>
      new Promise(async (resolve, reject) =>
        resolve(id_provincia ? Number.parseInt(id_provincia) : 0)
      ),
    id_localidad: (id_localidad) =>
      new Promise(async (resolve, reject) =>
        resolve(id_localidad ? Number.parseInt(id_localidad) : 0)
      ),
    fechaReserva: (fechaReserva) =>
      new Promise(async (resolve, reject) =>
        resolve(
          fechaReserva
            ? moment(Number.parseInt(fechaReserva))
            : moment(new Date()).add('day', 1)
        )
      ),
    id_espacio: (id_espacio) =>
      new Promise(async (resolve, reject) =>
        resolve(id_espacio ? Number.parseInt(id_espacio) : 0)
      ),
    id_cowork: (id_cowork) =>
      new Promise(async (resolve, reject) =>
        resolve(id_cowork ? Number.parseInt(id_cowork) : 0)
      ),
    codigo_turno: (codigo_turno) =>
      new Promise(async (resolve, reject) =>
        resolve(codigo_turno ? codigo_turno : 'c')
      )
  },
  toIdMappers: {
    id_pais: (id_pais) => id_pais,
    id_provincia: (id_provincia) => id_provincia,
    id_localidad: (id_localidad) => id_localidad,
    fechaReserva: (fechaReserva) => fechaReserva.valueOf(), //TODO: hacer letra legible para humanos?
    id_espacio: (id_espacio) => id_espacio,
    id_cowork: (id_cowork) => id_cowork,
    codigo_turno: (codigo_turno) => codigo_turno
  }
};

class Index extends Component {
  constructor(props) {
    super();

    this.actualizarMapa = this.actualizarMapa.bind(this);
    this.elegirEspacio = this.elegirEspacio.bind(this);
    this.elegirCowork = this.elegirCowork.bind(this);
    this.refrescarURL = this.refrescarURL.bind(this);
  }

  state = {
    usuario: null,
    coworks: [],
    espacios: [],
    puestos: [],
    localidades: [
      { id_localidad: 0, nombre_localidad: 'Cargando..', provincia: 0 }
    ],
    provincias: [{ id_provincia: 0, nombre_localidad: 'Cargando..', pais: 0 }],
    paises: [{ id_pais: 0, nombre_localidad: 'Cargando..' }],
    id_pais: 0,
    id_provincia: 0,
    id_localidad: 0,
    id_espacio: 0,
    id_cowork: 0,
    codigo_turno: '',
    fechaReserva: moment(new Date()).add('day', 1),
    pathnameActual: '/'
  };

  getProvinciasDelPais() {
    let provincias = [];

    if (this.state.id_pais === 0) {
      provincias = [
        { id_provincia: 0, nombre_provincia: 'Seleccione Pais..', pais: 0 }
      ];
    } else {
      provincias = [
        { id_provincia: 0, nombre_provincia: 'Seleccione Provincia..', pais: 0 }
      ];

      provincias.push(
        ...this.state.provincias.filter((provincia) =>
          Number.isInteger(provincia.pais)
            ? provincia.pais === this.state.id_pais
            : provincia.pais.id_pais === this.state.id_pais
        )
      );
    }

    return provincias;
  }

  getLocalidadesDeLaProvincia() {
    //FIXME: ver por qué a veces esto devuelve una lista vacía (cuando no se elije provincia y se intenta elegir localidad demasiado pronto?)
    let localidades = [];

    if (this.state.id_provincia === 0) {
      localidades = [
        {
          id_localidad: 0,
          nombre_localidad: 'Seleccione Provincia..',
          provincia: 0
        }
      ];
    } else {
      localidades = [
        {
          id_localidad: 0,
          nombre_localidad: 'Seleccione Localidad..',
          provincia: 0
        }
      ];

      localidades.push(
        ...this.state.localidades.filter((localidad) =>
          Number.isInteger(localidad.provincia)
            ? localidad.provincia === this.state.id_localidad
            : localidad.provincia.id_provincia === this.state.id_provincia
        )
      );
    }

    return localidades;
  }

  fetchCoworksConVacantes(seleccion = this.state) {
    if (
      seleccion.id_pais &&
      seleccion.id_provincia &&
      seleccion.id_localidad &&
      seleccion.fechaReserva
    ) {
      httpClient
        .get(
          `api/puestos_vacantes/${
            seleccion.id_localidad
          }/${seleccion.fechaReserva.year()}/${seleccion.fechaReserva.month() +
            1}/${seleccion.fechaReserva.date()}/c/`
        )
        .then((data) => {
          let espacios = [
            ...new Set(
              data.map((puesto) => this.completarEspacio(puesto.espacio))
            )
          ];
          let coworks = [
            { id_cowork: 0, nombre_cowork: 'Todos' },
            ...new Set(espacios.map((espacio) => espacio.cowork))
          ];
          this.setState({
            puestos: data,
            espacios: espacios,
            coworks: coworks
          });
        })
        .catch((error) =>
          NotificationManager.error('No se pudieron obtener Puestos Vacantes')
        );
    } else {
      this.setState({ puestos: [], espacios: [], coworks: [] });
    }
  }

  fetchInformacionGeografica() {
    this.fetchPaises();
  }

  fetchPaises() {
    httpClient
      .get(`api/paises/`)
      .then((data) =>
        this.setState({
          paises: [{ id_pais: 0, nombre_pais: 'Seleccione Pais..' }, ...data]
        })
      )
      .then(this.fetchProvincias())
      .catch((error) =>
        NotificationManager.error('No se pudieron obtener Países')
      );
  }

  fetchProvincias() {
    httpClient
      .get(`api/provincias/`)
      .then((data) =>
        this.setState({
          provincias: data.map((provincia) =>
            this.completarProvincia(provincia)
          )
        })
      )
      .then(this.fetchLocalidades())
      .catch((error) =>
        NotificationManager.error('No se pudieron obtener Provincias')
      );
  }

  fetchLocalidades() {
    httpClient
      .get(`api/localidades/`)
      .then((data) => {
        this.setState({
          localidades: data.map((localidad) =>
            this.completarLocalidad(localidad)
          )
        });
        this.actualizarMapa({ fechaReserva: this.state.fechaReserva });
      })
      .catch((error) =>
        NotificationManager.error('No se pudieron obtener Localidades')
      );
  }

  completarProvincia = (provincia) => {
    provincia.pais =
      this.state.paises.find((pais) => pais.id_pais === provincia.pais) ||
      provincia.pais;

    return provincia;
  };

  completarLocalidad = (localidad) => {
    localidad.provincia =
      this.state.provincias.find(
        (provincia) => provincia.id_provincia === localidad.provincia
      ) || localidad.provincia;

    return localidad;
  };

  completarEspacio = (espacio) => {
    espacio.precioMJ_espacio = Number.parseFloat(espacio.precioMJ_espacio);
    espacio.precioJC_espacio = Number.parseFloat(espacio.precioJC_espacio);

    return espacio;
  };

  componentDidMount() {
    httpClient
      .get(`api/get_detalles_usuario/`)
      .then((data) => this.setState({ usuario: data }))
      .catch((error) =>
        NotificationManager.error(
          'No se pudieron obtener las preferencias de Usuario'
        )
      );

    this.fetchInformacionGeografica();

    this.reactUrlState = initializeReactUrlState(this)(reactUrlStateOptions);
    this.setUrlState = this.reactUrlState.setUrlState;
  }

  refrescarURL(pathnameActual) {
    if (this.state.pathnameActual !== pathnameActual && this.setUrlState) {
      let { id_pais, id_provincia, id_localidad } = this.state;
      this.setUrlState({ id_pais, id_provincia, id_localidad });
      this.setState({ pathnameActual });
    }
  }

  actualizarMapa(props) {
    let seleccion = {
      fechaReserva: this.state.fechaReserva,
      id_pais: this.state.id_pais,
      id_provincia: this.state.id_provincia,
      id_localidad: this.state.id_localidad
    };

    if (props.fechaReserva) {
      if (this.setUrlState) {
        this.setUrlState({ fechaReserva: props.fechaReserva });
      }

      seleccion.fechaReserva = props.fechaReserva;
    } else if (typeof props.id_pais !== typeof undefined) {
      if (this.setUrlState) {
        this.setUrlState({
          id_pais: props.id_pais,
          id_provincia: 0,
          id_localidad: 0
        });
      }

      seleccion.id_pais = props.id_pais;
      seleccion.id_provincia = 0;
      seleccion.id_localidad = 0;
    } else if (typeof props.id_provincia !== typeof undefined) {
      if (this.setUrlState) {
        this.setUrlState({
          id_provincia: props.id_provincia,
          id_localidad: 0
        });
      }

      seleccion.id_provincia = props.id_provincia;
      seleccion.id_localidad = 0;
    } else if (typeof props.id_localidad !== typeof undefined) {
      if (this.setUrlState) {
        this.setUrlState({
          id_localidad: props.id_localidad
        });
      }

      seleccion.id_localidad = props.id_localidad;
    }

    this.fetchCoworksConVacantes(seleccion);
  }

  elegirEspacio(props) {
    this.setUrlState({
      id_espacio: props.id_espacio,
      codigo_turno: props.codigo_turno
    });
  }

  elegirCowork(props) {
    this.setUrlState({ id_cowork: props.id_cowork, id_espacio: 0 });
  }

  render() {
    return (
      <div className='principal'>
        <Router>
          <Cabecera usuario={this.state.usuario} />
          <Route
            exact
            path={['/elegir-accion']}
            component={() => <ElegirAccion usuario={this.state.usuario} />}
          />
          <Route
            exact
            path={['/reservar-puesto']}
            component={({ history }) => (
              <ReservarPuesto
                usuario={this.state.usuario}
                paises={this.state.paises}
                provincias={this.getProvinciasDelPais()}
                localidades={this.getLocalidadesDeLaProvincia()}
                coworks={this.state.coworks}
                espacios={this.state.espacios}
                puestos={this.state.puestos}
                id_pais={this.state.id_pais}
                id_provincia={this.state.id_provincia}
                id_localidad={this.state.id_localidad}
                id_espacio={this.state.id_espacio}
                id_cowork={this.state.id_cowork}
                actualizarMapa={this.actualizarMapa}
                fechaReserva={this.state.fechaReserva}
                elegirEspacio={(props) => {
                  this.elegirEspacio(props);
                  history.push('/confirmar-reserva');
                }}
                elegirCowork={this.elegirCowork}
                history={history}
                refrescarURL={this.refrescarURL}
              />
            )}
          />
          <Route
            exact
            path={['/confirmar-reserva']}
            component={({ history }) => (
              <ConfirmarReserva
                usuario={this.state.usuario}
                fechaReserva={this.state.fechaReserva}
                codigo_turno={this.state.codigo_turno}
                espacio={
                  this.state.espacios.filter(
                    (espacio) => espacio.espacio_id === this.state.espacio_id
                  )[0]
                }
                history={history}
                refrescarURL={this.refrescarURL}
              />
            )}
          />
          <Route
            exact
            path='/'
            component={() => <Redirect to='/elegir-accion' />}
          />
          <Pie />
        </Router>
        <NotificationContainer />
      </div>
    );
  }
}

ReactDOM.render(
  <Suspense fallback='Loading..'>
    <Index />
  </Suspense>,
  document.getElementById('root')
);
