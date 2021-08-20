import React, { useState, useEffect } from "react";
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
import Rating from "@material-ui/lab/Rating";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const ItemList = ({
  handleFavouritesClick,
  favouriteComponent,
  filteredFlags,
  loading,
  count,
  ActivateModal,
  DetailRequest,
  ShowDetail,
}) => {
  const clickHandler = (item) => {
    ActivateModal(true);
    DetailRequest(true);

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
      {/* {filteredFlags !== null &&
        filteredFlags.length > 0 && */}
      {filteredFlags?.slice(0, size).map((item, i) => (
        <div key={i} style={{ zIndex: 0 }}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={item.travel}
              onClick={() => clickHandler(item)}
            >
              <CardActions disableSpacing>
                <Tooltip title="Travel Status" placement="left">
                  <IconButton className={classes.icon} aria-label="more">
                    {/* <MoreVertIcon /> */}
                    <Badge
                      style={{ marginRight: 20, marginTop: 7, zIndex: 0 }}
                      badgeContent={
                        item.status == "Restricted" ? "Limited" : item.status
                      }
                      color={
                        item.status == "Closed"
                          ? "secondary"
                          : item.status == "Open"
                          ? "primary"
                          : item.status == "Restricted"
                          ? "error"
                          : "primary"
                      }
                    ></Badge>
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
                <>
                  {/* <Tooltip title="Population" placement="top">
                      <IconButton
                        // onClick={() => handleFavouritesClick(item)}
                        color="error"
                      >
                        <Badge
                          style={{ marginRight: 5, zIndex: 0 }}
                          badgeContent={
                            item.population > 1000000
                              ? (item.population / 1000000).toFixed(0) + "m"
                              : (item.population / 1000000).toFixed(2) + "m"
                          }
                          color="error"
                        >
                     \
                        </Badge>
                      </IconButton>
                    </Tooltip> */}
                  <Tooltip title="Favourite?" placement="top">
                    <IconButton
                      onClick={() => handleFavouritesClick(item)}
                      color="secondary"
                    >
                      <Badge badgeContent={count} color="secondary">
                        <FavouriteComponent />
                        {/* <Badge
                            color="secondary"
                            badgeContent={item.status}
                          ></Badge> */}
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </>
              }
              title={item.name}
              className={classes.title}
              subheader={item.region}
            ></CardHeader>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ItemList;
