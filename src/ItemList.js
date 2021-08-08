import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Loader from "./components/Loader";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { StayCurrentLandscape } from "@material-ui/icons";

const ItemList = ({
  handleFavouritesClick,
  favouriteComponent,
  filteredFlags,
  loading,

  population,
  region,
  capital,
  travel,
  flag,
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
    


    console.log(item.name, "name");

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
          <>
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
            </Card>
          </>
        ))}
    </>
  );
};

export default ItemList;
