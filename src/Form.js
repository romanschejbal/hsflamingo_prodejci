import React, { useRef, useEffect, useState } from "react";

export default function Form({ onSearch, categories, onCategoryChange }) {
  const ref = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.offsetHeight);
  });

  return (
    <form ref={ref} className="ff-custom-form fg-text-dark" action="#">
      <div
        style={{ padding: "20px 0px 10px" }}
        className="ffb-id-2m4m6dth fg-row row fg-text-dark"
      >
        <div className="ffb-id-2m4mofr8 fg-col col-xs-12 col-md-5 fg-text-dark">
          <h1
            className="ffb-id-2m4glikf fg-heading text-center fg-text-dark"
            style={{
              display: "inline",
              fontFamily: "Montserrat",
              fontWeight: 500
            }}
          >
            Naši prodejci
          </h1>
          <p>
            <input
              className="ffb-id-2m4ftnpj form-control ff-form-input ff-form-input-item fg-text-dark"
              type="text"
              data-name="ProdejceMisto:"
              placeholder="Hledej"
              data-input-type="text"
              data-validation='{"checkbox-validation":"0","checkbox-validation-message":"Checking this box is required.","is-required":"1","is-required-message":"jak\u00e9 hled\u00e1te m\u00edsto?","validation-type":"none","validation-type-regex":"","validation-type-custom-function":"","validation-message":"This field is not valid.","min-length-has":"1","min-length":"2","min-length-message":"Zadejte jm\u00e9no m\u011bsta, kter\u00e9 hled\u00e1te."}'
              style={{ display: "inline" }}
              name="ff-contact-input-0"
              onChange={e => onSearch(e.target.value)}
            />
          </p>
        </div>
        <div className="ffb-id-2m4m6ltd fg-col col-xs-6 col-md-3 fg-text-dark">
          {categories.map(text => {
            return (
              <div
                key={text}
                className="ffb-id-2m4lja3i checkbox fg-text-dark"
                data-fg-height='{"1":"15","2":"15","3":"15","4":"15"}'
                style={{ display: "block" }}
              >
                <label>
                  <input
                    type="checkbox"
                    className="ff-form-input ff-form-input-item"
                    defaultChecked="checked"
                    value={text}
                    onChange={e =>
                      onCategoryChange(e.target.value, e.target.checked)
                    }
                  />{" "}
                  {text}
                </label>
              </div>
            );
          })}
        </div>
        <div className="ffb-id-2m4m6lb5 fg-col col-xs-6 col-md-4 fg-text-dark">
          <div className="ffb-id-2m4n9dih fg-row row     fg-text-dark">
            <div
              className="ffb-id-2m4n9dii fg-col col-xs-12 col-md-12 fg-text-dark"
              data-fg-height='{"1":"50","2":"50","3":"60","4":"60"}'
            >
              <div className="fg-vcenter-wrapper">
                <div className="fg-vcenter">
                  <p
                    className="ffb-id-2m4n9dim fg-paragraph text-left fg-text-dark"
                    style={{ display: "inline" }}
                  >
                    Expert
                  </p>
                  <img
                    style={{ margin: "0 20px", width: "30px" }}
                    className="ffb-id-2m4n9dil fg-image  img-responsive fg-text-dark"
                    src="http://beta.hsflamingo.cz/wp-content/uploads/2018/12/map-v4-Expert@2x.png"
                    alt="map-v4-Expert@2x"
                  />
                  <p
                    className="ffb-id-2m4n9dir fg-paragraph text-left fg-text-dark"
                    style={{ display: "inline" }}
                  >
                    Partner
                  </p>
                  <img
                    style={{ margin: "0 20px", width: "30px" }}
                    className="ffb-id-2m4n9diq fg-image  img-responsive fg-text-dark"
                    src="http://beta.hsflamingo.cz/wp-content/uploads/2018/12/map-v4-Partner@2x.png"
                    alt="map-v4-Partner@2x"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ff-contact-info" style={{ display: "none" }}>
        5110,5021,5088,5096,5084,5092,5095,5021,5045,5021,5108,5098,5104,5101,5051,5088,5096,5084,5092,5095,5033,5086,5098,5096,5021,5031,5021,5102,5104,5085,5093,5088,5086,5103,5021,5045,5021,5054,5098,5097,5103,5084,5086,5103,5019,5057,5098,5101,5096,5021,5112
      </div>
      <input
        type="hidden"
        name="ff-name-to-title-map"
        defaultValue='{"ff-contact-input-0":"ProdejceMisto:","ff-contact-input-1":"map_select_stavba_krbu","ff-contact-input-2":"map_select_obchod","ff-contact-input-3":"map_select_topenar"}'
      />
    </form>
  );
}
