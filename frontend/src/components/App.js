import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from "prop-types";

//import httpClient from '../fetchWrapper';

import './App.css';

class App extends Component {
  static propTypes = {
    usuario: PropTypes.object
  };

  componentDidMount(){
    //let instance = this;
  }

  //TODO: agregar history al router

  render() {
    return (
      <Router>
        <Route
          exact
          path={['/']}
          component={() => (
            <div>
              {this.props.usuario ? `Bienvenidx ${this.props.usuario.username}!` : `Nadie inició sesión aún (o estamos ejecutando mediante 'npm start' por lo que la autenticación de django no nos provée el token)`}
              <span>Dicho sea de paso, este div debería ser un componente en un .js aparte, si bien no hace falta que implementemos redux, tendríamos que poner toda la data (y los métodos para llamar a la API) en el componente de index y su state y pasarlos como parámetros a los demás; App debería encargarse del routing más que nada</span>
            </div>
          )}
        />
      </Router>
    );
  }
}

export default App;
