import React, { Suspense , Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Cabecera from './components/cabecera/Cabecera'
import Pie from './components/pie/Pie'

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
  }

  getInformacionGeografica(){
    this.getPaises();
  }

  getPaises(){
    httpClient.get(`api/paises/`)
    .then((data) => this.setState({paises: data}))
    .then(this.getProvincias())
    .catch((error) => console.log(error));
  }

  getProvincias(){
    httpClient.get(`api/provincias/`)
    .then((data) => this.setState({provincias: data.map(provincia => this.completarProvincia(provincia))}))
    .then(this.getLocalidades())
    .catch((error) => console.log(error));
  }

  getLocalidades(){
    httpClient.get(`api/localidades/`)
    .then((data) => this.setState({localidades: data.map(localidad => this.completarLocalidad(localidad))}))
    .catch((error) => console.log(error));
  }

  completarProvincia = (provincia) => {
    provincia.pais = this.state.paises.find(pais => pais.id_pais === provincia.pais) || provincia.pais;

    return provincia;
  };

  completarLocalidad = (localidad) => {
    localidad.provincia = this.state.paises.find(provincia => provincia.id_provincia === localidad.provincia) || localidad.provincia;

    return localidad;
  };

  componentDidMount(){
    //Si hay un token de autenticación en las cookies del navegador, significa que ya inició sesión un usuario, por lo que podemos obtener sus detalles desde el backend
    if(getCookie('csrftoken')){
      httpClient
        .get(`api/get_detalles_usuario/`)
        .then((data) => this.setState({usuario: data}))
        .catch((error) => console.log(error));
    }

    this.getInformacionGeografica();
  }

    render() {
    return (
      <div className="principal">
        <Router>
          <Cabecera usuario={this.state.usuario} />
          <Route
            exact
            path={['/', '/elegir-accion']}
            component={() => (
              <ElegirAccion usuario={this.state.usuario} />
            )}
          />
          <Route
            exact
            path={['/reservar-puesto']}
            component={() => (
              <ReservarPuesto usuario={this.state.usuario} />
            )}
          />
          <Pie />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <Suspense fallback="Loading..">
    <Index />
  </Suspense>,
  document.getElementById('root')
);
