import React, { Suspense , Component} from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import App from './components/App';
import Cabecera from './components/cabecera/Cabecera'

import httpClient from './fetchWrapper';
import getCookie from './utils';

import './index.css';

class Index extends Component {
  state = {
    usuario: null
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

  //TODO: agregar history al router

  render() {
    return (
      <Container>
        <Cabecera usuario={this.state.usuario} />
        <App usuario={this.state.usuario} />
      </Container>
    );
  }
}

ReactDOM.render(
  <Suspense fallback="Loading..">
    <Index />
  </Suspense>,
  document.getElementById('root')
);
