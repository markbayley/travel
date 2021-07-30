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
import MailIcon from "@material-ui/icons/Mail";
// import { FavouriteComponent } from '../Template'

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
        <ImageCarousel photos={photos} flag={flag} name={name}  />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Located in <strong>{region}</strong>, the nation of{" "}
            <strong>{name}</strong> has a population of{" "}
            <strong>{(population / 1000000).toFixed(2) + " million"}</strong>{" "}
            people. The capital city is <strong>{capital}</strong>.
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
