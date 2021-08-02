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

const superagent = require("superagent");

const clientID =
  "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

const simpleGet = (options) => {
  superagent.get(options.url).then(function (res) {
    if (options.onSuccess) options.onSuccess(res);
  });
};

const FlagsDetail = ({ flag, population, region, name, capital, travel }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
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
  const queryInput = useRef(null);

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
    setQuery(query + " food");

    console.log(query, "query");
  };

  const searchPeople = (e) => {
    e.preventDefault();
    setQuery(query + " people");

    console.log(query, "query");
  };

  const searchAnimals = (e) => {
    e.preventDefault();
    setQuery(query + " animals");

    console.log(query, name, "query");
  };

  const searchTravel = (e) => {
    e.preventDefault();
    setQuery(query + " travel");

    console.log(query, name, "query");
  };

  const searchCulture = (e) => {
    e.preventDefault();
    setQuery(query + " culture");

    console.log(query, name, "query");
  };

  const searchNature = (e) => {
    e.preventDefault();
    setQuery(query + " nature");

    console.log(query, name, "query");
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
              size="small"
              variant="outlined"
              value={"food"}
              onClick={(e) => searchFood(e, "value")}
            >
              Food
            </Button>
            <Button
              size="small"
              variant="outlined"
              value={"people"}
              onClick={(e) => searchPeople(e, "value")}
            >
              People
            </Button>
            <Button
              size="small"
              variant="outlined"
              value={"animals"}
              onClick={(e) => searchAnimals(e, "value")}
            >
              Animals
            </Button>
            <Button
              size="small"
              variant="outlined"
              value={"travel"}
              onClick={(e) => searchTravel(e, "value")}
            >
              Culture
            </Button>
            <Button
              size="small"
              variant="outlined"
              value={"culture"}
              onClick={(e) => searchCulture(e, "value")}
            >
              Travel
            </Button>
            <Button
              size="small"
              variant="outlined"
              value={"Nature"}
              onClick={(e) => searchNature(e, "value")}
            >
              Nature
            </Button>
          </div>
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
