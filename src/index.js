import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import Form from "./Form";
import GMap from "./GMap";
// import * as serviceWorker from "./serviceWorker";

export default function renderMap(
  { data, language, googleKey },
  formContainer,
  mapContainer
) {
  const formHeight = formContainer.offsetHeight;
  const mapHeight = mapContainer.offsetHeight;
  const categories =
    language === "cs" ? ["Stavba krbů", "Kamenný obchod", "Topenář"] : [];
  let searchingValue = "";
  let searchingCategories = categories.slice(0);
  function renderMap() {
    ReactDOM.render(
      <GMap
        prodejci={data}
        height={mapHeight}
        searchingValue={searchingValue}
        searchingCategories={searchingCategories}
        googleKey={googleKey}
      />,
      mapContainer
    );
  }
  ReactDOM.render(
    <Form
      language={language}
      categories={categories}
      prodejci={data}
      height={formHeight}
      onSearch={value => {
        searchingValue = value;
        renderMap();
      }}
      onCategoryChange={(category, checked) => {
        if (checked) {
          searchingCategories.push(category);
        } else {
          searchingCategories = searchingCategories.filter(c => c !== category);
        }
        renderMap();
      }}
    />,
    formContainer
  );
  renderMap();

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
