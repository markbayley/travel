import React, { useState,  useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Loader from "./Loader";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import Map from './Map'

import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
// import MapControlsComponent from "./MapControlsComponent";
// import geoData from "../../travel.geojson";







import { CardContent } from "@material-ui/core";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import { Typography, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Message } from "./ChatBox";
import ImageCarousel from "./ImageCarousel";
import "./ImageCarousel.css";
import MailIcon from "@material-ui/icons/Mail";
import EcoIcon from "@material-ui/icons/Eco";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import PeopleIcon from "@material-ui/icons/People";
import PetsIcon from "@material-ui/icons/Pets";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import { DeleteForeverOutlined, Details } from "@material-ui/icons";

// import{ Map }  from "./ItemList";









const superagent = require("superagent");

const clientID =
  "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

const simpleGet = (options) => {
  superagent.get(options.url).then(function (res) {
    if (options.onSuccess) options.onSuccess(res);
  });
};



export const FlagsDetail = ({
 
  latlng,
  flag,
  population,
  region,
  name,
  capital,
  travel,
  loading,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      zIndex: theme.zIndex.appBar + 1,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();

   const [viewport, setViewport] = useState({
     latitude: latlng && latlng[0],
     longitude: latlng && latlng[1],
     bearing: 0,
     zoom: 5,
   });

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let [photos, setPhotos] = useState([]);
  let [query, setQuery] = useState("");
  // const queryInput = useRef(null);
 
  const numberOfPhotos = 10;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  useEffect(() => {
    const photosUrl = name ? `${url}&query=${name + query}` : url;

    simpleGet({
      url: photosUrl,
      onSuccess: (res) => {
        setPhotos(res.body);
      },
    });
  }, [name, query, url]);

  const searchFood = (e) => {
    e.preventDefault();
    setQuery(" Food ");
  };

  const searchPeople = (e) => {
    e.preventDefault();
    setQuery(" People ");
  };

  const searchAnimals = (e) => {
    e.preventDefault();
    setQuery(" Animals ");
  };

  const searchTravel = (e) => {
    e.preventDefault();
    setQuery(" Travel ");
  };

  const searchCulture = (e) => {
    e.preventDefault();
    setQuery(" Culture ");
  };

  const searchNature = (e) => {
    e.preventDefault();
    setQuery(" Nature ");
  };

  console.log(photos, "photos");
  console.log(latlng, "latlngy");

  return (
    <div style={{ zIndex: 20 }}>
      <Card className={classes.root}>
        {/* <CardMedia
          image={flag}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name + " (" + region + ")"}
          subheader={
            "Population:" + (population / 1000000).toFixed(2) + " million"
          }
        /> */}
        {/* <CardMedia className={classes.media} image={flag} /> */}
        <ImageCarousel
          photos={photos}
          flag={flag}
          name={name}
          travel={travel}
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "1em",
            }}
          >
            <Button
              size="small"
              style={{
                fontSize: "small",
                textTransform: "none",
                color: "#FF8D23",
              }}
              variant="outlined"
              value={" Food"}
              onClick={(e) => searchFood(e, "value")}
            >
              <FastfoodIcon /> Food
            </Button>
            <Button
              size="small"
              style={{
                fontSize: "small",
                textTransform: "none",
                color: "#FF8D23",
              }}
              variant="outlined"
              value={" People"}
              onClick={(e) => searchPeople(e, "value")}
            >
              <PeopleIcon /> People
            </Button>
            <Button
              size="small"
              style={{
                fontSize: "small",
                textTransform: "none",
                color: "#FF8D23",
              }}
              variant="outlined"
              value={" Animals"}
              onClick={(e) => searchAnimals(e, "value")}
            >
              <PetsIcon /> Animals
            </Button>
            <Button
              size="small"
              style={{
                fontSize: "small",
                textTransform: "none",
                color: "#FF8D23",
              }}
              variant="outlined"
              value={" Travel"}
              onClick={(e) => searchTravel(e, "value")}
            >
              <AssistantPhotoIcon /> Culture
            </Button>
            <Button
              size="small"
              style={{
                fontSize: "small",
                textTransform: "none",
                color: "#FF8D23",
              }}
              variant="outlined"
              value={" Culture"}
              onClick={(e) => searchCulture(e, "value")}
            >
              <FlightTakeoffIcon /> Travel
            </Button>
            <Button
              size="small"
              style={{
                fontSize: "small",
                textTransform: "none",
                color: "#FF8D23",
              }}
              variant="outlined"
              value={" Nature"}
              onClick={(e) => searchNature(e, "value")}
            >
              <EcoIcon /> Nature
            </Button>
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ textAlign: "center", marginBottom: "0.5em" }}
          ></Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Nation: <strong>{name}</strong> Region: <strong>{region}</strong>{" "}
            Population:{" "}
            <strong>{(population / 1000000).toFixed(2) + " million"}</strong>{" "}
            Capital: <strong>{capital}</strong>.{" "}
            <em>Searching...{name + " " + query + " "}</em>
          </Typography>
          <br />

          <div>{/* {latlng[0]},{latlng[1]} */}</div>
        </CardContent>
        {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            <MailIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions> */}
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>

            <Message />
          </CardContent>
        </Collapse> */}
      </Card>
      {/* {latlng[0]},{latlng[1]} */}
      <div className="map" style={{ height: "50vh", width: "100%" }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ"
          width="100%"
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          <Marker
            latitude={latlng && latlng[0]}
            longitude={latlng && latlng[1]}
          >
            {/* <div className="marker"></div> */}
          </Marker>
          <Popup
            latitude={latlng && latlng[0]}
            longitude={latlng && latlng[1]}
            // onClose={closePopup}
            closeButton={true}
            closeOnClick={false}
            offsetTop={0}
            offsetLeft={10}
          >
            <img src={flag} width="70px" alt="flag" />
            <h6 style={{ color: "black", textAlign: 'center', paddingBottom: '0px' }}>
              {name}
            </h6>
          </Popup>
        </ReactMapGL>
      </div>
    </div>
  );
};







// export function Map({lat, lng, population}) {
//   const [viewport, setViewport] = useState({
//     latitude: 30,
//     longitude: 0,
//     bearing: 0,
//     zoom: 1,
//   });
 

//   return (
//     <div className="map" style={{ height: "50vh", width: "100%" }}>
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken="pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ"
//         width="100%"
//         height="100%"
     
//         onViewportChange={(viewport) => setViewport(viewport)}
//       >
    
//         <Marker longitude={lng} latitude={lat}>
//           <div className="marker">
//             <span>{population}</span>
//           </div>
//         </Marker>
//       </ReactMapGL>
//     </div>
//   );
// }




const ItemList = ({
  handleFavouritesClick,
  favouriteComponent,
  filteredFlags,
  loading,


  count,
  ActivateModal,
  DetailRequest,
  ShowDetail,

  toggleClicked,
  clicked,

}) => {
  const clickHandler = (item) => {
    ActivateModal(true);
    DetailRequest(true);
    

    //  const lat = item.latlng[0];

    // console.log(lat, "lat");

    fetch(`https://restcountries.eu/rest/v2/name/${item.name}`)
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

  

  const FavouriteComponent = favouriteComponent;

  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 345,
      transition: "all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)",
      "&:hover": {
        transform: "scale(1.05)",
      },
      textTransform: "capitalize",
    },
    media: {
      height: 200,
      paddingTop: "56.25%", // 16:9
      position: "relative",
      cursor: "pointer",
    },
    avatar: {
      border: "1px solid cyan",
    },
    icon: {
      color: "#fff",
      position: "absolute",
      top: 0,
      right: 0,
    },
    title: {
      maxWidth: "100%",
    },
  }));

  const classes = useStyles();

  const size = 15;

  

  return (
    <>
      {loading && <Loader />}
      {filteredFlags !== null &&
        filteredFlags.length > 0 &&
        filteredFlags.slice(0, size).map((item, i) => (
          <div key={i}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={item.travel}
                onClick={() => clickHandler(item)}
              >
                <CardActions disableSpacing>
                  <Tooltip title="More" placement="left">
                    <IconButton className={classes.icon} aria-label="more">
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </CardMedia>
              <CardHeader
                avatar={
                  <Avatar aria-label="flag" className={classes.avatar}>
                    <img src={item.flag} alt="flag" width="70px" />
                  </Avatar>
                }
                action={
                  <Tooltip title="Favourite" placement="top">
                    <IconButton
                      onClick={() => handleFavouritesClick(item)}
                      color="secondary"
                    >
                      <Badge badgeContent={count} color="secondary">
                        <FavouriteComponent />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                }
                title={item.name}
                className={classes.title}
                subheader={
                  item.region +
                  " " +
                  "(" +
                  (item.population / 1000000).toFixed(2) +
                  "m)"
                }
              />
              {/* <IconButton color="secondary" onClick={() => toggleClicked(item)}>
                {clicked === true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton> */}
              {/* {item.latlng[0]},
              {item.latlng[1]}.... */}
        
            </Card>
            {/* <Map lat={item.latlng[0]} lng={item.latlng[1]} population={item.population}/> */}
          </div>
        ))}
    </>
  );
};




export default ItemList;
