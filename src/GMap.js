import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class GMap extends Component {
  state = { openedMarker: null };

  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 49.75458, lng: 15.471093 }}
      >
        {this.props.prodejci.map(({ lat, lng, url, ...prodejce }, i) => (
          <Marker
            key={i}
            position={{ lat, lng }}
            onClick={() => this.setState({ openedMarker: i })}
          >
            {this.state.openedMarker === i ? (
              <InfoWindow
                onCloseClick={() => this.setState({ openedMarker: null })}
              >
                <div>
                  <h4>{prodejce.nazev}</h4>
                  <p>...</p>
                  <a href={url}>Podrobné informace</a>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    );
  }
}

const ConnectedMap = withScriptjs(withGoogleMap(GMap));

export default function Map(props) {
  const { prodejci, height } = props;

  return (
    <ConnectedMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB_LaaS3U3CFKlscbug2He-GDAKPstQVds"
      loadingElement={"Načítám"}
      containerElement={<div style={{ height: `${height}px` }} />}
      mapElement={<div style={{ height: `${height}px` }} />}
      prodejci={prodejci}
    />
  );
}
