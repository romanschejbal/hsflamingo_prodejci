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
      <div className="App">
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 49.75458, lng: 15.471093 }}
        >
          {this.props.prodejci.map(({ lat, lng, ...prodejce }, i) => (
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
                    <p>Makáááme</p>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(App));
