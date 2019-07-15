import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const colorScheme = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c3252e"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  }
];

class GMap extends Component {
  state = { openedMarker: null };

  render() {
    return (
      <GoogleMap
        options={{ styles: colorScheme }}
        defaultZoom={7}
        defaultCenter={{ lat: 49.15458, lng: 17.471093 }}
      >
        {this.props.prodejci
          .filter(p =>
            this.props.searchingCategories.some(
              category =>
                p.popis.toLowerCase().indexOf(category.toLowerCase()) !== -1
            )
          )
          .filter(p => {
            const reg = new RegExp(this.props.searchingValue, "i");
            return (
              reg.test(p.nazev) ||
              reg.test(p.ulice) ||
              reg.test(p.mesto) ||
              reg.test(p.psc) ||
              reg.test(p.telefon) ||
              reg.test(p.email)
            );
          })
          .map(({ lat, lng, url, ...prodejce }, i) => (
            <Marker
              key={JSON.stringify({ lat, lng, ...prodejce })}
              icon={{
                scaledSize: { width: 27, height: 40 },
                url: prodejce.isExpert
                  ? "https://www.hsflamingo.cz/wp-content/uploads/2018/12/map-v4-Expert@2x.png"
                  : "https://www.hsflamingo.cz/wp-content/uploads/2018/12/map-v4-Partner@2x.png"
              }}
              position={{ lat, lng }}
              onMouseOver={() => this.setState({ openedMarker: i })}
              onClick={() => this.setState({ openedMarker: i })}
            >
              {this.state.openedMarker === i ? (
                <InfoWindow
                  onCloseClick={() => this.setState({ openedMarker: null })}
                >
                  <div>
                    <h4>{prodejce.nazev}</h4>
                    <p>
                      {prodejce.ulice}
                      <br />
                      {prodejce.psc} {prodejce.mesto}
                      <br />
                      Tel.: {prodejce.telefon}
                      <br />
                      E-mail:{" "}
                      <a href={`mailto:${prodejce.email}`}>{prodejce.email}</a>
                    </p>
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
  const { prodejci, height, searchingValue, searchingCategories } = props;

  return (
    <ConnectedMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB_LaaS3U3CFKlscbug2He-GDAKPstQVds"
      loadingElement={"Načítám"}
      containerElement={<div style={{ height: `${height}px` }} />}
      mapElement={<div style={{ height: `${height}px` }} />}
      prodejci={prodejci}
      searchingValue={searchingValue}
      searchingCategories={searchingCategories}
    />
  );
}
