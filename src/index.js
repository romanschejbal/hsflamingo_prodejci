// @ts-check
import React from "react";
import { createRoot } from "react-dom/client";
import Form from "./Form";
import GMap from "./GMap";

export default function renderMap(
  { data, language, googleKey, defaultZoom },
  formContainer,
  mapContainer
) {
  const mapHeight = mapContainer.offsetHeight;
  const categories =
    language === "cs" ? ["Stavba krbů", "Kamenný obchod", "Topenář"] : [];

  if (process.env.NODE_ENV === "development") {
    data = require("./prodejci.json");
    window.prodejci = data;
  }

  let searchingCategories = categories.slice(0);
  let searchingValue = "";

  const mapRoot = createRoot(mapContainer);
  function renderMap() {
    mapRoot.render(
      <GMap
        language={language}
        prodejci={data}
        height={mapHeight}
        googleKey={googleKey}
        defaultZoom={defaultZoom || 7}
        categories={categories}
        searchingCategories={searchingCategories}
        searchingValue={searchingValue}
      />
    );
  }

  const formRoot = createRoot(formContainer);
  function renderForm() {
    formRoot.render(
      <Form
        language={language}
        categories={categories}
        searchingCategories={searchingCategories}
        onSearch={(value) => {
          searchingValue = value;
          renderForm();
          renderMap();
        }}
        onCategoryChange={(category, checked) => {
          if (checked) {
            searchingCategories = [...searchingCategories, category];
          } else {
            searchingCategories = searchingCategories.filter(
              (c) => c !== category
            );
          }
          renderForm();
          renderMap();
        }}
      />
    );
  }

  renderForm();
  renderMap();

  return () => {};
}

window.renderMap = renderMap;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
