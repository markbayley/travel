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
import "mapbox-gl/dist/mapbox-gl.css";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';



import { Badge } from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  withStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { pink, orange, grey, red } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import { title } from "process";

const useStyles = makeStyles(() =>
  createStyles({
    Open: {
      backgroundColor: "#FF8D23",
      color: "#fff",
    },
    Restricted: {
      border: "5px solid #FF8D23",
      color: "#fff",
    },
    Closed: {
      border: "5px solid #119DA4",
      color: "#fff",
    },
  })
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      contrastText: "#fff",
    },
    secondary: pink,
    error: {
      main: "#f57c00",
      light: "#2196f3",
      contrastText: "#fff",
    },
  },
});

const Map = ({
  loading,
  filteredFlags,

  count,
  ActivateModal,
  DetailRequest,
  ShowDetail,

  filteredStatus,
}) => {
  const clickHandler = (item) => {
    ActivateModal(true);
    DetailRequest(true);

    fetch(`https://restcountries.com/v2/name/${item.name}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response[0]);
        console.log(response[0], "response[0] - flagcard");
        console.log(item.name, "name");
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };



  const classes = useStyles();

  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 0,
    bearing: 0,
    zoom: 3,
  });

  const size = 25;

  console.log(filteredFlags, "filteredFlags(map)");
  
  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNsNWEwcTg3bTJmdmEzbm10YXNyam11dncifQ.sd4ANl8aHUgxmv-iXBGexw"
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {loading && <Loader />}
        <MapControlsComponent />
        {filteredFlags?.slice(0, size).map((item, i) => (
          <>
            <Marker
              key={i}
              latitude={item.latlng && item.latlng[0]}
              longitude={item.latlng && item.latlng[1]}
              onClick={() => clickHandler(item)}
            >
              <Tooltip title="View Images" placement="top">
                <img
                  className="marker"
                  src={item.travel}
                  // width={(item.population/1000000)*3}
                  // height={(item.population/1000000)*3}

                  alt="marker"
                />
              </Tooltip>

              <ThemeProvider theme={theme}>
                {/* <Tooltip title="Population" placement="top">
                  <Badge
                    badgeContent={
                      filteredStatus === "Closed"
                        ? "C"
                        : filteredStatus === "Open"
                        ? "O"
                        : filteredStatus === "Restricted"
                        ? "R"
                        : "N"
                    }
                    color="error"
                    style={{ paddingBottom: 40 }}
                  ></Badge>
                </Tooltip> */}
                <Tooltip title={item.status} placement="top">
                  <Badge
                    style={{ marginRight: 200 }}
                    badgeContent={item.name.slice(0, 15)}
                    color={
                      item.status == "Closed"
                        ? "secondary"
                        : item.status == "Open"
                        ? "primary"
                        : item.status == "Restricted"
                        ? "error"
                        : "primary"
                    }
                    // color="secondary"
                  ></Badge>
                </Tooltip>
              </ThemeProvider>
            </Marker>
          </>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;

export const MapControlsComponent = () => {
  const attributionStyle = {
    left: 0,
    bottom: 0,
  };

  return (
    <>
      <AttributionControl compact={true} style={attributionStyle} />

      <div
        style={{
          position: "relative",
          top: 10,
          left: 10,
          zIndex: 200,
        }}
      >
        <FullscreenControl />
      </div>

      <div
        style={{
          position: "relative",
          top: 50,
          left: 10,
          zIndex: 200,
        }}
      >
        <NavigationControl />
      </div>
    </>
  );
};
