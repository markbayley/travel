import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Message } from "./ChatBox";
// import { Favorite } from "../pages/Contact";
import { Favorites } from "../components/Favorites";
import ImageCarousel from "./ImageCarousel";
import "./ImageCarousel.css";

const superagent = require("superagent");

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


   const clientID =
     "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

   const simpleGet = (options) => {
     superagent.get(options.url).then(function (res) {
       if (options.onSuccess) options.onSuccess(res);
     });
   };


const FlagsDetail = ({
  code,
  flag,
  population,
  region,
  name,
  capital,
  travel,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [images, setImages] = useState();




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
      const photosUrl = name ? `${url}&query=${name}` : url;

      simpleGet({
        url: photosUrl,
        onSuccess: (res) => {
          setPhotos(res.body);
        },
      });
    }, [name, url]);

    const searchPhotos = (e) => {
      e.preventDefault();
      setQuery(name.current.value);
    };

  // useEffect(() => {
  //   setImages(
  //     Array.from(Array(10).keys()).map((id) => ({
  //       id,
  //       url: `https://api.unsplash.com/photos/random/?count=10&client_id=PvvWIfrMMfNqoEEuVve3X6KE1gksd31-C1Pn-SP3yL4`,
  //       // url: `https://picsum.photos/1000?random=${id}`,
  //     }))
  //   );
  // }, []);

  console.log(photos, 'photos')

  return (
    <>
      {/* <div className="box">
      <form
        id="unsplash-search"
        className="unsplash-search form"
        onSubmit={searchPhotos}
      >
        <label>
          Search Photos on Unsplash
          <input
            ref={queryInput}
            placeholder="Try 'dogs' or 'coffee'!"
            type="search"
            className="input"
            defaultValue=""
            style={{ marginBottom: 20 }}
          />
        </label>
      </form>

      <ul className="photo-grid">
        {photos.map(photo => {
          return (
            <li key={photo.id}>
              <img
                src={photo.urls.regular} width="250px"
                onSuccessfulClipboardCopy={() => {
                  // showUserMessage();
                  // pingUnsplash(photo.links.download_location);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div> */}
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={flag} alt="flag" width="75px" />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name + ' (' + region + ')'}
          subheader={"Population:" + (population / 1000000).toFixed(2) + " million"}
        />
        {/* <CardMedia className={classes.media} image={flag} /> */}
        <ImageCarousel photos={photos} />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {name} is located in {region}, and has a population of {(population / 1000000).toFixed(2) + " million"} people. The capital city is {capital}.
            The photos above were taken by travellers and locals in this country.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites"> */}
          {/* <FavoriteIcon /> */}
          <Favorites />
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
    </>
  );
};

export default FlagsDetail;
