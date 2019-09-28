import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

//TODO: usar Navbar?
//TODO: revisar que onda los links para react router

class Cabecera extends Component {
  state = {
    usuario: null
  }

  componentDidMount(){
    //let instance = this;
  }

  //TODO: agregar history al router

  render() {
    return (
      <Row className='justify-content-between'>
        <div><h1>GeWork</h1></div>
        <div>{this.props.usuario ? this.props.usuario.username : "Login"}</div>
      </Row>
    );
  }
}

export default Cabecera;
