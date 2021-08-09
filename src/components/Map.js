import { useState, useCallback } from "react";
import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
// import MapControlsComponent from "./MapControlsComponent";
import "./Map.css";
import Loader from "./Loader";
import {
  AttributionControl,
  FullscreenControl,
  NavigationControl,
} from "react-map-gl";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const Map = ({
  latlng,
  flag,
  name,
  population,
  region,
  travel,
  loading,
  filteredFlags,
}) => {


  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 0,
    bearing: 0,
    zoom: 3,
  });

  const size = 25;

  console.log(filteredFlags, 'filteredFlags(map)')

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ"
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {loading && <Loader />}
        <MapControlsComponent />
        {filteredFlags?.slice(0, size).map((item, i) => (
              <Marker
                key={i}
                latitude={item.latlng && item.latlng[0]}
                longitude={item.latlng && item.latlng[1]}
              >
                {/* <p>{item.name}</p> */}
                <img
                  src={item.travel}
               
               
                  alt="flag"
                 
                  className="marker"
                />
              </Marker>

        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map




export const MapControlsComponent = () => {
  const attributionStyle = {
    left: 0,
    bottom: 0
  };

  return (
    <>
      <AttributionControl compact={true} style={attributionStyle} />

      <div
        style={{
          position: "relative",
          top: 10,
          left: 10,
          zIndex: 200
        }}
      >
        <FullscreenControl />
      </div>

      <div
        style={{
          position: "relative",
          top: 50,
          left: 10,
          zIndex: 200
        }}
      >
        <NavigationControl />
      </div>
    </>
  );
}

