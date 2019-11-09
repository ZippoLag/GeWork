import React, { Component } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'

class Mapa extends Component {
  handleMarkerOnClick = (evt) => {

  };

  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyB1_33zOJdjINon3cnefz8vYBgTPOYCtpE"
      >
      <GoogleMap
          id="marker-example"
          mapContainerStyle={{
            height: "360px",
            width: "360px"
          }}
          zoom={15}
          center={{lat: -32.954, lng: -60.645}}
        >
          <MarkerClusterer
            options={{imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"}}
          >
            {
              (clusterer) => [
                {
                  nombre: "Uteniano",
                  coordenadas:{lat: -32.95476, lng: -60.6459824}
                },
              ].map((cowork, i) => (
                <Marker
                  key={i}
                  position={cowork.coordenadas}
                  clusterer={clusterer}
                  onClick={this.handleMarkerOnClick}
                  title={cowork.nombre}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
     )
  }
}

export default Mapa;