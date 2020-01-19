import React, { Suspense, Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import moment from 'moment';

import Cabecera from './components/cabecera/Cabecera';
import Pie from './components/pie/Pie';

import ElegirAccion from './components/elegirAccion/ElegirAccion';
import ReservarPuesto from './components/reservarPuesto/ReservarPuesto';

import httpClient from './fetchWrapper';
import getCookie from './utils';

import './index.css';

class Index extends Component {
  constructor(props) {
    super();

    this.actualizarMapa = this.actualizarMapa.bind(this);
    this.elegirEspacio = this.elegirEspacio.bind(this);
  }

  state = {
    usuario: {},
    coworks: [],
    espacios: [],
    puestos: [],
    localidades: [{ id_localidad: 0, nombre_localidad: 'Cargando..' }],
    provincias: [{ id_provincia: 0, nombre_localidad: 'Cargando..' }],
    paises: [{ id_pais: 0, nombre_localidad: 'Cargando..' }],
    id_pais: 0,
    id_provincia: 0,
    id_localidad: 0,
    id_espacio: 0,
    fechaReserva: moment(new Date())
  };

  getProvinciasDelPais() {
    let provincias = [];

    if (this.state.id_pais === 0) {
      provincias = [{ id_provincia: 0, nombre_provincia: 'Seleccione Pais..' }];
    } else {
      provincias = [
        { id_provincia: 0, nombre_provincia: 'Seleccione Provincia..' }
      ];
    }

    if (this.state.id_pais) {
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
    let localidades = [];

    if (this.state.id_provincia === 0) {
      localidades = [
        { id_localidad: 0, nombre_localidad: 'Seleccione Provincia..' }
      ];
    } else {
      localidades = [
        { id_localidad: 0, nombre_localidad: 'Seleccione Localidad..' }
      ];
    }

    if (this.state.id_provincia) {
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
          let espacios = [...new Set(data.map((puesto) => puesto.espacio))];
          let coworks = [...new Set(espacios.map((espacio) => espacio.cowork))];
          this.setState({
            puestos: [
              { id_puesto: 0, nombre_puesto: 'Seleccione Puesto..' },
              ...data
            ],
            espacios: [
              { id_espacio: 0, nombre_espacio: 'Seleccione Espacio..' },
              ...espacios
            ],
            coworks: [
              { id_cowork: 0, nombre_cowork: 'Seleccione Cowork..' },
              ...coworks
            ]
          });
        })
        .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
  }

  fetchLocalidades() {
    httpClient
      .get(`api/localidades/`)
      .then((data) =>
        this.setState({
          localidades: data.map((localidad) =>
            this.completarLocalidad(localidad)
          )
        })
      )
      .catch((error) => console.log(error));
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

  componentDidMount() {
    //Si hay un token de autenticación en las cookies del navegador, significa que ya inició sesión un usuario, por lo que podemos obtener sus detalles desde el backend
    if (getCookie('csrftoken')) {
      httpClient
        .get(`api/get_detalles_usuario/`)
        .then((data) => this.setState({ usuario: data }))
        .catch((error) => console.log(error));
    }

    this.fetchInformacionGeografica();
  }

  actualizarMapa(props) {
    let seleccion = {
      fechaReserva: this.state.fechaReserva,
      id_pais: this.state.id_pais,
      id_provincia: this.state.id_provincia,
      id_localidad: this.state.id_localidad
    };

    if (props.fechaReserva) {
      this.setState({ fechaReserva: props.fechaReserva });
      seleccion.fechaReserva = props.fechaReserva;
    } else if (typeof props.id_pais !== typeof undefined) {
      this.setState({
        id_pais: props.id_pais,
        id_provincia: 0,
        id_localidad: 0
      });
      seleccion.id_pais = props.id_pais;
      seleccion.id_provincia = 0;
      seleccion.id_localidad = 0;
    } else if (typeof props.id_provincia !== typeof undefined) {
      this.setState({
        id_provincia: props.id_provincia,
        id_localidad: 0
      });
      seleccion.id_provincia = props.id_provincia;
      seleccion.id_localidad = 0;
    } else if (typeof props.id_localidad !== typeof undefined) {
      this.setState({
        id_localidad: props.id_localidad
      });
      seleccion.id_localidad = props.id_localidad;
    }

    this.fetchCoworksConVacantes(seleccion);
  }

  elegirEspacio(props) {
    this.setState({ id_espacio: props.id_espacio });
  }

  render() {
    return (
      <div className='principal'>
        <Router>
          <Cabecera usuario={this.state.usuario} />
          <Route
            exact
            path={['/', '/elegir-accion']}
            component={() => <ElegirAccion usuario={this.state.usuario} />}
          />
          <Route
            exact
            path={['/reservar-puesto']}
            component={() => (
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
                actualizarMapa={this.actualizarMapa}
                fechaReserva={this.state.fechaReserva}
                elegirEspacio={this.elegirEspacio}
              />
            )}
          />
          <Pie />
        </Router>
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
