import React, { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const t = {
  loading: {
    cs: "Načítám",
    en: "Loading",
  },
  seeDetail: {
    cs: "Podrobné informace",
    en: "See detail",
  },
};

const colorScheme = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c3252e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

function GMap(props) {
  const [selected, setSelected] = useState(null);

  return (
    <Map
      options={{ styles: colorScheme }}
      defaultZoom={props.defaultZoom}
      defaultCenter={{ lat: 49.15458, lng: 17.471093 }}
    >
      {props.prodejci
        .filter(
          (p) =>
            props.searchingCategories.length === 0 ||
            props.searchingCategories.length === props.categories.length ||
            props.searchingCategories.some(
              (category) =>
                (p.popis || "")
                  .toLowerCase()
                  .indexOf(category.toLowerCase()) !== -1
            )
        )
        .filter((p) => {
          const reg = new RegExp(props.searchingValue, "i");
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
            key={i}
            position={{ lat, lng }}
            icon={{
              scaledSize: { width: 27, height: 40, equals: () => false },
              url: prodejce.isExpert
                ? "https://www.hsflamingo.cz/wp-content/uploads/2018/12/map-v4-Expert@2x.png"
                : "https://www.hsflamingo.cz/wp-content/uploads/2018/12/map-v4-Partner@2x.png",
            }}
            onClick={(e) => {
              setSelected({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                url,
                ...prodejce,
              });
            }}
            onMouseOver={(e) => {
              // setSelected(props.prodejci[i]);
            }}
          />
        ))}
      {selected !== null ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h4>{selected.nazev}</h4>
            <p>
              {selected.ulice}
              <br />
              {selected.psc} {selected.mesto}
              <br />
              Tel.: {selected.telefon}
              <br />
              E-mail: <a href={`mailto:${selected.email}`}>{selected.email}</a>
            </p>
            <a href={selected.url}>{t.seeDetail[props.language]}</a>
          </div>
        </InfoWindow>
      ) : null}
    </Map>
  );
}

export default function Wrapper(props) {
  const {
    prodejci,
    height,
    searchingValue,
    searchingCategories,
    googleKey,
    language,
    defaultZoom,
    categories,
  } = props;

  return (
    <APIProvider apiKey={googleKey}>
      <GMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleKey}`}
        loadingElement={t.loading[language]}
        language={language}
        containerElement={<div style={{ height: `${height}px` }} />}
        mapElement={<div style={{ height: `${height}px` }} />}
        prodejci={prodejci}
        categories={categories}
        searchingValue={searchingValue}
        searchingCategories={searchingCategories}
        defaultZoom={defaultZoom}
      />
    </APIProvider>
  );
}
