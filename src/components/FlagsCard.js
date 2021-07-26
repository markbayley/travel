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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    transition: "all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)",
    "&:hover": {
      transform: 'scale(1.05)',
    },
  },


  media: {
    height: 200,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    border: "1px solid cyan",
  },
  icon: {
    color: "#fff",
  },
}));

const FlagsCard = ({ 
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

  
  const classes = useStyles();

  return (
    <Card onClick={() => clickHandler()} className={classes.root}>
      <CardMedia
        className={classes.media}
        image={travel}
        title={capital}
        style={{ position: "relative" }}
      >
        {" "}
        <CardActions
          disableSpacing
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          {/* <IconButton className={classes.icon} aria-label="add to favorites">
            {" "}
            <MoreVertIcon />
          </IconButton> */}
          {/* <IconButton className={classes.icon} aria-label="share">
           <FavoriteBorderIcon />
          </IconButton> */}
        </CardActions>
      </CardMedia>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={flag} alt="flag" width="70px" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={region + " " +  "(" +  ((population / 1000000).toFixed(2)) + "m)" }
      /> 
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is perfect.
        </Typography>
      </CardContent> */}
    </Card>
  );
};

export default FlagsCard;
