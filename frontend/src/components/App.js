import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

//import httpClient from '../fetchWrapper';

import './App.css';

class App extends Component {
  state = {}
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
                Copiar estructura..
              </div>
            )}
          />
        </Router>
      </Container>
    );
  }
}

export default App;
