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
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const FlagsCard = ({

  
  

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
        console.log(response, "response - flagcard");
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };

  const classes = useStyles();

  // console.log(children, 'children')

  return (
    <Card onClick={() => clickHandler()} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={flag} alt="flag" />
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={name}
        subheader={region}
      />
      <CardMedia
        className={classes.media}
        image={flag}
        title={capital}
      />
      {/* {children.map((items, index) => (
        <Card
          key={index}
          {...items}
        />
      ))} */}

      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook.
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton className={classes.expand} aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
    // <li onClick={() => clickHandler()}>
    //   <article className="card" key={alpha3code}>
    //     <div className="card-image" style={{height: '150px'}}>
    //       <img src={flag} alt="flag"/>
    //     </div>
    //     <div className="card-content">
    //       <h3 className="card-name">{name}</h3>
    //       <ol className="card-list">
    //         <li>
    //           Population: <span>{(population / 1000000).toFixed(2) + "m"}</span>
    //         </li>
    //         <li>
    //           Region: <span>{region}</span>
    //         </li>
    //         <li>
    //           Capital: <span>{capital}</span>
    //         </li>
    //       </ol>
    //     </div>
    //   </article>
    // </li>
  );
};

export default FlagsCard;
