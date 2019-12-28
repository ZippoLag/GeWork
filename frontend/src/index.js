import React, { Suspense, Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Cabecera from './components/cabecera/Cabecera';
import Pie from './components/pie/Pie';

import ElegirAccion from './components/elegirAccion/ElegirAccion';
import ReservarPuesto from './components/reservarPuesto/ReservarPuesto';

import httpClient from './fetchWrapper';
import getCookie from './utils';

import './index.css';

class Index extends Component {
  state = {
    usuario: {},
    espacios: [],
    localidades: [],
    provincias: [],
    paises: []
  };

  getLocalidadGeo() {
    let localidad;

    if (this.state.localidades.length > 0) {
      //TODO: usar API de ubicación para obtener localidad más cercana a la actual como default
      localidad = this.state.localidades[0];
      if (Number.isInteger(localidad.provincia)) {
        localidad.provincia = {
          id_provincia: localidad.provincia,
          nombre_provincia: 'Cargando...',
          pais: {
            id_pais: 0,
            nombre_pais: 'Cargando...'
          }
        };
      }
    } else {
      localidad = {
        id_localidad: 0,
        nombre_localidad: 'Cargando...',
        provincia: {
          id_provincia: 0,
          nombre_provincia: 'Cargando...',
          pais: {
            id_pais: 0,
            nombre_pais: 'Cargando...'
          }
        }
      };
    }

    return localidad;
  }

  fetchInformacionGeografica() {
    this.fetchPaises();
  }

  fetchPaises() {
    httpClient
      .get(`api/paises/`)
      .then((data) => this.setState({ paises: data }))
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
                provincias={this.state.provincias}
                localidades={this.state.localidades}
                id_pais_default={this.getLocalidadGeo().provincia.pais.id_pais}
                id_provincia_default={
                  this.getLocalidadGeo().provincia.id_provincia
                }
                id_localidad_default={this.getLocalidadGeo().id_localidad}
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
