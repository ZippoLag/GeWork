import React, { Suspense , Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Cabecera from './components/cabecera/Cabecera'
import Pie from './components/pie/Pie'

import IniciarReserva from './components/iniciarReserva/IniciarReserva';
import ReservarPuesto from './components/reservarPuesto/ReservarPuesto';

import httpClient from './fetchWrapper';
import getCookie from './utils';

import './index.css';

class Index extends Component {
  state = {
    usuario: {}
  }

  componentDidMount(){
    let instance = this;

    //Si hay un token de autenticación en las cookies del navegador, significa que ya inició sesión un usuario, por lo que podemos obtener sus detalles desde el backend
    if(getCookie('csrftoken')){
      httpClient
        .get(`api/get_detalles_usuario`)
        .then((data) => {
          instance.setState({
            usuario: data
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

    render() {
    return (
      <div className="principal">
        <Router>
          <Cabecera usuario={this.state.usuario} />
          <Route
            exact
            path={['/', '/iniciar-reserva']}
            component={() => (
              <IniciarReserva usuario={this.state.usuario} />
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
