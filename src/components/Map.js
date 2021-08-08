import { useState, useCallback } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
// import MapControlsComponent from "./MapControlsComponent";

import geoData from "../travel.geojson";

export default function Map({lat, lng}) {
  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 0,
    bearing: 0,
    zoom: 1,
  });
  const [hoverInfo, setHoverInfo] = useState(null);

  const dataLayer = {
    id: "geoData",
    type: "fill",
    paint: {
      "fill-outline-color": "#fff",
      "fill-color": {
        property: "statusNum",
        stops: [
          [1, "#119DA4"],
          [2, "#ED5D5D"],
          [3, "#FF8D23"],
        ],
      },
      "fill-opacity": 0.8,
    },
  };

  const onHover = useCallback((event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY,
          }
        : null
    );
  }, []);

  return (
    <div className="map" style={{ height: "50vh", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ"
        width="100%"
        height="100%"
        onHover={onHover}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <div
          style={{
            position: "relative",
            top: 50,
            left: 10,
            zIndex: 200,
          }}
        >
          {/* <MapControlsComponent /> */}
          <Source type="geojson" data={geoData}>
            <Layer {...dataLayer} />
          </Source>
          {hoverInfo && (
            <div
              className="tooltip"
              style={{ left: hoverInfo.x, top: hoverInfo.y }}
            >
              <div style={{ fontWeight: 600 }}>
                {hoverInfo.feature.properties.country}
              </div>
              <div>{hoverInfo.feature.properties.status}</div>
              <div>{hoverInfo.feature.properties.description}</div>
              <div>{hoverInfo.feature.properties.moreDetails}</div>
            </div>
          )}
        </div>
        <Marker longitude={lng} latitude={lat}>
          <div className="marker">
            <span></span>
          </div>
        </Marker>
      </ReactMapGL>
    </div>
  );
}
