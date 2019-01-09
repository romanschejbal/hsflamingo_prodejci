import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

export default function renderMap(data, container) {
  ReactDOM.render(
    <App
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB_LaaS3U3CFKlscbug2He-GDAKPstQVds"
      loadingElement={"Načítám"}
      containerElement={<div style={{ height: window.innerHeight }} />}
      mapElement={<div style={{ height: `100%` }} />}
      prodejci={data}
    />,
    container
  );

  return () => ReactDOM.unmountComponentAtNode(container);
}

window.renderMap = renderMap;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
