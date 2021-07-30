import React from "react";
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
import { red, cyan } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ItemList from '../Travel'
// import { FavouriteComponent } from "../Template";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    transition: "all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  media: {
    height: 200,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    border: "1px solid cyan",
  },
  icon: {
    color: "#fff",
  },
  title: {
    maxWidth: '100%'
  },
}));

const FlagsCard = ({ 
  handleFavouritesClick,

  favouriteComponent,
  item,
  searchedTravel,
  searchedFlags,
  travel,
  flag,
  capital,
  population,
  region,
  name,
  ActivateModal,
  DetailRequest,
  ShowDetail,
}) => {
  const clickHandler = () => {
    ActivateModal(true);
    DetailRequest(true);

      fetch(`https://restcountries.eu/rest/v2/name/${name}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response[0]);
        console.log(response[0], "response[0] - flagcard");     
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });   
  };


  //  const Faved = favourites.filter((name) => favourites.includes(name));

  const classes = useStyles();

   const FavouriteComponent = favouriteComponent;

  return (
    <Card
      className={classes.root}
      style={{
        textTransform: "capitalize",
      }}
    >
      <CardMedia
        className={classes.media}
        image={travel}
        style={{ position: "relative" }}
        onClick={() => clickHandler()}
      >
        <CardActions
          disableSpacing
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          <IconButton className={classes.icon} aria-label="add to favorites">
            {" "}
            <MoreVertIcon />
          </IconButton>
          {/* <IconButton className={classes.icon} aria-label="share">
            <FavoriteBorderIcon />
          </IconButton> */}
        </CardActions>
      </CardMedia>
      <CardHeader
        avatar={
          <Avatar aria-label="flag" className={classes.avatar}>
            <img src={flag} alt="flag" width="70px" />
          </Avatar>
        }
        action={
          <IconButton
            // onClick={() => handleFavouritesClick(name)}
            aria-label="favourite"
            color="secondary"
          >
            {/* { Faved ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
            <FavoriteBorderIcon />
          </IconButton>
        }
        title={name}
        className={classes.title}
        subheader={
          region + " " + "(" + (population / 1000000).toFixed(2) + "m)"
        }
      />
  

    </Card>
  );
};

export default FlagsCard;
