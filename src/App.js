import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class App extends Component {
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

export default withScriptjs(withGoogleMap(App));
