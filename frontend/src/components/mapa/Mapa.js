import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

class Mapa extends Component {
  static propTypes = {
    coworks: PropTypes.array.isRequired,
    elegirCowork: PropTypes.func.isRequired,
    googleMapsApiKey: PropTypes.string.isRequired
  };

  getCoworksReales() {
    return this.props.coworks.filter(
      (cowork) => cowork.id_cowork !== 0 && cowork.lat && cowork.lng
    );
  }

  render() {
    let coworks = this.getCoworksReales();
    return (
      <LoadScript
        id='script-loader'
        googleMapsApiKey={this.props.googleMapsApiKey}
      >
        <GoogleMap
          id='marker-example'
          mapContainerStyle={{
            height: '360px',
            width: '100%'
          }}
          zoom={14}
          center={{
            lat:
              coworks
                .map((cowork) => cowork.lat)
                .reduce((prev, curr) => (curr += prev)) / coworks.length,
            lng:
              coworks
                .map((cowork) => cowork.lng)
                .reduce((prev, curr) => (curr += prev)) / coworks.length
          }}
        >
          {coworks.map((cowork, index) => (
            <Marker
              key={index}
              position={{ lat: cowork.lat, lng: cowork.lng }}
              onClick={(evt) => {
                return this.props.elegirCowork({
                  id_cowork: cowork.id_cowork
                });
              }}
              title={cowork.nombre}
              label={cowork.nombre}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Mapa;
