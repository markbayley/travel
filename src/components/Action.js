import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { ChatBox } from './ChatBox';
 
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 5,
      right: 10,
      zIndex: 11,
    },
  },
  extendedIcon: {
    marginLeft: theme.spacing(30),
  },
}));

export default function Action() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="secondary" aria-label="like">
        <ChatBox />
      </Fab>
    </div>
  );
}
