import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import httpClient from '../fetchWrapper';

import getCookie from '../utils';

import './App.css';

class App extends Component {
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

  render() {
    return (
      <Container>
          <h1>GeWork</h1>
        <Router>
          <Route
            exact
            path={['/']}
            component={() => (
              <div>
                {this.state.usuario ? `Bienvenidx ${this.state.usuario.username}!` : `Nadie inició sesión aún (o estamos ejecutando mediante 'npm start' por lo que la autenticación de django no nos provée el token)`}
              </div>
            )}
          />
        </Router>
      </Container>
    );
  }
}

export default App;
