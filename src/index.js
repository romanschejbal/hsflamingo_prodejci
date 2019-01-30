import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

export default function renderMap(data, container) {
  const height = container.offsetHeight;
  ReactDOM.render(<App prodejci={data} height={height} />, container);

  return () => ReactDOM.unmountComponentAtNode(container);
}

window.renderMap = renderMap;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
