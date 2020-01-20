import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

class Mapa extends Component {
  handleMarkerOnClick = (evt) => {};

  render() {
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
              this.props.coworks
                .map((cowork) => cowork.lat)
                .reduce((prev, curr) => (curr += prev)) /
              this.props.coworks.length,
            lng:
              this.props.coworks
                .map((cowork) => cowork.lng)
                .reduce((prev, curr) => (curr += prev)) /
              this.props.coworks.length
          }}
        >
          {this.props.coworks.map((cowork, index) => (
            <Marker
              key={index}
              position={{ lat: cowork.lat, lng: cowork.lng }}
              onClick={this.handleMarkerOnClick}
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
