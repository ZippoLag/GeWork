import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';

import Dropdown from 'react-bootstrap/Dropdown';

import Spinner from 'react-bootstrap/Spinner';

//TODO: mover el router a index.js y usar los Links de ese componente con className="nav-link" (en lugar del componente Nav.Link de react-bootstrap)

import './Cabecera.css';

export class Cabecera extends Component {
  static propTypes = {
    usuario: PropTypes.object
  };

  state = {};

  render() {
    return (
      <header className='row w-100 m-0 p-0 d-flex justify-content-between align-items-center gework-bg-primario bg-primary'>
        <Col className='col-12 col-md-6 d-flex justify-content-center navbar-brand'>
          <Link to='/'>
            {/* TODO: agregar logo: <img
              src="/static/logo.png"
              width="33px"
              height="33px"
              alt={"Logo GeWork"}
            /> */}
            <h1>GeWork</h1>
          </Link>
          {/* TODO: mejorar responsividad partiendo título y links en rows */}
          <Link className='nav-link' to='/reservar-puesto'>
            Reservar puesto
          </Link>
        </Col>
        <Col className='col-12 col-md-4 d-flex justify-content-end justify-content-md-center'>
          <Dropdown>
            <Dropdown.Toggle
              drop='none'
              id='menu-usuario'
              bsPrefix='menu-usuario-style'
              variant='none'
            >
              <span
                className='d-flex justify-content-center align-items-center dropdown-toggle username-circle gework-bg-secundario'
                data-toggle='dropdown-menu'
                aria-expanded='false'
              >
                {(this.props.usuario && this.props.usuario.iniciales) || (
                  <Spinner animation='border' role='status' size='lg' />
                )}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu x-placement='bottom-start'>
              {this.props.usuario ? (
                <Dropdown.Item href='/adminlogout/'>
                  {`Cerrar sesión ${this.props.usuario.username || ''}`}
                </Dropdown.Item>
              ) : (
                ''
              )}
              {this.props.usuario && this.props.usuario.isAdmin ? (
                <Dropdown.Item href='/admin'>Administración</Dropdown.Item>
              ) : (
                ''
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </header>
    );
  }
}

export default Cabecera;
