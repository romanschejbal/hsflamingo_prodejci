import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import Form from "./Form";
import GMap from "./GMap";
// import * as serviceWorker from "./serviceWorker";

export default function renderMap(data, formContainer, mapContainer) {
  const formHeight = formContainer.offsetHeight;
  const mapHeight = mapContainer.offsetHeight;
  ReactDOM.render(<Form prodejci={data} height={formHeight} />, formContainer);
  ReactDOM.render(<GMap prodejci={data} height={mapHeight} />, mapContainer);

  return () => {
    ReactDOM.unmountComponentAtNode(formContainer);
    ReactDOM.unmountComponentAtNode(mapContainer);
  };
}

window.renderMap = renderMap;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
