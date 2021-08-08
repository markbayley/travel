import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CardContent } from "@material-ui/core";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import { Typography, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Message } from "./components/ChatBox";
import ImageCarousel from "./components/ImageCarousel";
import "./components/ImageCarousel.css";
import MailIcon from "@material-ui/icons/Mail";
import EcoIcon from "@material-ui/icons/Eco";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import PeopleIcon from "@material-ui/icons/People";
import PetsIcon from "@material-ui/icons/Pets";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";

const superagent = require("superagent");

const clientID =
  "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

const simpleGet = (options) => {
  superagent.get(options.url).then(function (res) {
    if (options.onSuccess) options.onSuccess(res);
  });
};

const FlagsDetail = ({ flag, population, region, name, capital  }) => {
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

  return (
    <div style={{ zIndex: 20 }}>
      <Card className={classes.root}>
        <CardMedia
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
        />
        {/* <CardMedia className={classes.media} image={flag} /> */}
        <ImageCarousel photos={photos} flag={flag} name={name} />

        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "1em",
            }}
          >
            <Button
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
          <Typography variant="body2" color="textSecondary" component="p" style={{textAlign: "center", marginBottom: "0.5em"}}>
            <em>Searching...{name + " " + query + " "}</em>
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Located in <strong>{region}</strong>, the nation of{" "}
            <strong>{name}</strong> has a population of{" "}
            <strong>{(population / 1000000).toFixed(2) + " million"}</strong>{" "}
            people. The capital city is <strong>{capital}</strong>. Search
            photos by topic...
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites"> */}
          {/* <FavoriteIcon /> */}
          <MailIcon />
          {/* </IconButton> */}
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
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            {/* <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography> */}
            <Message />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default FlagsDetail;
