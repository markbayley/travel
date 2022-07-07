import React, { useState } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Button, Typography, Grid } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Badge from "@material-ui/core/Badge";
import "./ImageCarousel.css";
import ReplayIcon from "@material-ui/icons/Replay";
import PublicIcon from "@material-ui/icons/Public";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import Slider from "@material-ui/core/Slider";
import RangeSlider from "../misc/RangeSlider";
import SearchIcon from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Pagination from "./Pagination";
import { RadioButtons } from "./SideBar";

const Filter = ({
  items,
  filteredFlags,
  setFilteredFlags,
  favourites,
  toggleShow,
  setViewport,
  viewport,
}) => {
  const classes = useStyles();
  // const [id, setId] = useState(0);
  //SnackBar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Slider
  // function valuetext(value) {
  //   return `${value} + "m" `;
  // }
  // const [value, setValue] = useState([0, 300]);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   console.log(value, newValue[1]);
  //   return setFilteredFlags(RangePop);
  // };

  // const marks = [
  //   {
  //     value: 0,
  //     label: "0m",
  //   },
  //   {
  //     value: 150,
  //     label: "Population",
  //   },
  //   {
  //     value: 300,
  //     label: "300m",
  //   },
  //   // {
  //   //   value: 1000,
  //   //   label: "1 billion",
  //   // },
  // ];

  // const RangePop = filteredFlags.filter(
  //   (item) =>
  //     item?.population > value[0] * 1000000 &&
  //     item?.population < value[1] * 1000000
  // );

  const [filteredRegion, setRegion] = useState("All Regions");
  const [filteredPopulation, setPopulation] = useState("Total Population");
  const [filteredStatus, setStatus] = useState("Any");

  const Europe = items.filter((item) => item?.region === "Europe");
  const Americas = items.filter((item) => item?.region === "Americas");
  const Oceania = items.filter((item) => item?.region === "Oceania");
  const Asia = items.filter((item) => item?.region === "Asia");
  const Africa = items.filter((item) => item?.region === "Africa");

  const HighPop = filteredFlags.filter((item) => item?.population > 50000000);
  const MedPop = filteredFlags.filter(
    (item) => item?.population > 10000000 && item.population < 100000000
  );
  const LowPop = filteredFlags.filter((item) => item?.population < 10000000);

  //Region
  const filterAllCountries = () => {
    setRegion("All Regions");
    return setFilteredFlags(items);
  };

  const filterAmericas = () => {
    if (filteredRegion === "Americas") {
      setRegion("All Regions");
      return setFilteredFlags(items);
    } else {
      setRegion("Americas");
      setOpen(true);
      return setFilteredFlags(Americas);
    }
  };

  const filterEurope = () => {
    if (filteredRegion === "Europe") {
      setRegion("All Regions");
      return setFilteredFlags(items);
    } else {
      setRegion("Europe");
      setOpen(true);
      return setFilteredFlags(Europe);
    }
  };

  const filterAsia = () => {
    if (filteredRegion === "Asia") {
      setRegion("All Regions");
      return setFilteredFlags(items);
    } else {
      setRegion("Asia");
      setOpen(true);
      return setFilteredFlags(Asia);
    }
  };

  const filterAfrica = () => {
    if (filteredRegion === "Africa") {
      setRegion("All Regions");
      return setFilteredFlags(items);
    } else {
      setRegion("Africa");
      setOpen(true);
      return setFilteredFlags(Africa);
    }
  };

  const filterOceania = () => {
    if (filteredRegion === "Oceania") {
      setRegion("All Regions");
      return setFilteredFlags(items);
    } else {
      setRegion("Oceania");
      setOpen(true);
      return setFilteredFlags(Oceania);
    }
  };

  //Population
  const filterHighPop = () => {
    if (filteredPopulation === "HighPop") {
      return setFilteredFlags(filteredFlags);
    } else {
      setPopulation("HighPop");
      setOpen(true);
      return setFilteredFlags(HighPop);
    }
  };

  const filterMedPop = () => {
    if (filteredPopulation === "MedPop") {
      return setFilteredFlags(filteredFlags);
    } else {
      setPopulation("MedPop");
      setOpen(true);
      return setFilteredFlags(MedPop);
    }
  };

  const filterLowPop = () => {
    if (filteredPopulation === "LowPop") {
      return setFilteredFlags(filteredFlags);
    } else {
      setPopulation("LowPop");
      setOpen(true);
      return setFilteredFlags(LowPop);
    }
  };

  const highPopulation = () => {
    const sorted = [...items].sort((a, b) => {
      setPopulation("Descending");
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
    setOpen(true);
  };

  const lowPopulation = () => {
    const sorted = [...items].sort((b, a) => {
      setPopulation("Ascending");
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
    setOpen(true);
  };

  console.log(filteredRegion, filteredPopulation, "fR, fP");

  //Chips
  // const handleDelete = () => {
  //   console.info("You clicked the delete icon.");
  // };

  return (
    <Grid
      container
      style={{
        // display: "flex",
        // justifyContent: "space-evenly",
        // flexWrap: "wrap",
        flexGrow: 1,
        // border: "1px solid grey",
        // position: "fixed",

        // zIndex: 1,
        // backgroundColor: "#fff",

        // marginTop:"1.4em",
      }}
    >
      <Grid item md={6} lg={5} style={{ marginTop: "0em", textAlign: "left" }}>
        <Button
          size="medium"
          variant={filteredRegion === "Americas" ? "contained" : "outlined"}
          onClick={filterAmericas}
          className={filteredRegion === "Americas" ? classes.Americas : null}
      
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {/* {Americas.length} */}
          Americas
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Europe" ? "contained" : "outlined"}
      
          onClick={filterEurope}
          className={filteredRegion === "Europe" ? classes.Europe : null}
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {/* {Europe.length} */}
          Europe
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Asia" ? "contained" : "outlined"}
          onClick={filterAsia}
          className={filteredRegion === "Asia" ? classes.Asia : null}
     
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {/* {Asia.length} */}
          Asia{" "}
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Africa" ? "contained" : "outlined"}
          onClick={filterAfrica}
          className={filteredRegion === "Africa" ? classes.Africa : null}
       
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {/* {Africa.length} */}
          Africa
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Oceania" ? "contained" : "outlined"}
  
          onClick={filterOceania}
          className={filteredRegion === "Oceania" ? classes.Oceania : null}
          style={{ marginRight: 10, marginBottom: 10 }}
        >
          {/* {Oceania.length} */}
          Oceania
        </Button>
        {/* <Button
          size="small"
       
          variant={filteredRegion === "All Regions" ? "contained" : "outlined"}
          onClick={filterAllCountries}
          className={
            filteredRegion === "All Regions" ? classes.allCountries : null
          }
          style={{ marginRight: 5 }}
        >
          <ReplayIcon />
        </Button> */}

        <Tooltip title="Reset" placement="top">
          <Button
            // size="small"
            variant={
              filteredRegion === "All Regions" ? "contained" : "outlined"
            }
            onClick={filterAllCountries}
            className={
              filteredRegion === "All Regions" ? classes.allCountries : null
            }
            style={{
              marginRight: 10,
              marginBottom: 10,
            }}
     
          >
            {/* {items.length} */}
            <ReplayIcon />
          </Button>
        </Tooltip>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        lg={3}
        style={{ margin: "0em 0em 0em 0em", textAlign: "center" }}
      >
        <Tooltip title="Min Population" placement="top">
          <IconButton
            variant={
              filteredPopulation === "Ascending" ? "contained" : "outlined"
            }
            onClick={lowPopulation}
            className={
              filteredPopulation === "Ascending" ? classes.Europe : null
            }
           
            style={{
              marginRight: 10,
              borderRadius: 100,
              border: "1px solid #aaa",
              fontSize: "small",
              padding: 10,
              marginTop: -5,
            }}
          >
            <PersonOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Small Population" placement="top">
          <IconButton
            // size="small"
            variant={filteredPopulation === "LowPop" ? "contained" : "outlined"}
            onClick={filterLowPop}
            className={filteredPopulation === "LowPop" ? classes.LowPop : null}
         
            style={{
              marginRight: 5,
              borderRadius: 100,

              fontSize: "medium",
              marginTop: -5,
            }}
          >
            1m+
          </IconButton>
        </Tooltip>

        <Tooltip title="Medium Population" placement="top">
          <IconButton
            // size="small"
            variant={filteredPopulation === "MedPop" ? "contained" : "outlined"}
            onClick={filterMedPop}
            className={filteredPopulation === "MedPop" ? classes.MedPop : null}
          
            style={{
              marginRight: 5,
              borderRadius: 100,

              fontSize: "medium",
              marginTop: -5,
            }}
          >
            10m+
          </IconButton>
        </Tooltip>

        <Tooltip title="Large Population" placement="top">
          <IconButton
            // size="small"
            variant={
              filteredPopulation === "HighPop" ? "contained" : "outlined"
            }
            onClick={filterHighPop}
            className={
              filteredPopulation === "HighPop" ? classes.HighPop : null
            }
           
            style={{
              marginRight: 5,
              borderRadius: 100,

              fontSize: "medium",
              marginTop: -5,
            }}
          >
            50m+
          </IconButton>
        </Tooltip>

        <Tooltip title="Max Population" placement="top">
          <IconButton
            variant={
              filteredPopulation === "Descending" ? "contained" : "outlined"
            }
            onClick={highPopulation}
            className={
              filteredPopulation === "Descending" ? classes.Europe : null
            }
         
            style={{
              marginLeft: 5,
              borderRadius: 100,
              border: "1px solid #aaa",
              fontSize: "small",
              padding: 10,
              marginTop: -5,
            }}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid
        item
        xs={12}
        sm={5}
        md={5}
        lg={4}
        style={{ margin: "0em 0em 0em 0em", textAlign: "center" }}
      >
        <RadioButtons
          items={items}
          setFilteredFlags={setFilteredFlags}
          filteredFlags={filteredFlags}
          filteredStatus={filteredStatus}
          setStatus={setStatus}
        />
        {/* <Pagination /> */}
        {/* <Tooltip title="Population Range" placement="top">
          <Slider
        
            className={classes.slider}
            value={value}
            step={10}
            min={0}
            max={300}
            onChange={handleChange}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
        
            marks={marks}
          />
        </Tooltip> */}
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={
          filteredFlags.length +
          " Results: " +
          filteredRegion +
          " (" +
          filteredPopulation +
          ")"
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    allCountries: {
      backgroundColor: "darkgrey",
      color: "#fff",
    },
    Europe: {
      backgroundColor: "#FF8D23",
      color: "#fff",
    },
    Oceania: {
      backgroundColor: "#119DA4",
      color: "#fff",
    },
    Americas: {
      backgroundColor: "#ED5D5D",
      color: "#fff",
    },
    Africa: {
      backgroundColor: "#119DA4",
      color: "#fff",
    },
    Asia: {
      backgroundColor: "#ED5D5D",
      color: "#fff",
    },

    HighPop: {
      backgroundColor: "#ED5D5D",
      color: "#fff",
    },
    MedPop: {
      backgroundColor: "#119DA4",
      color: "#fff",
    },
    LowPop: {
      backgroundColor: "#ED5D5D",
      color: "#fff",
    },

    slider: {
      minWidth: "250px",
      color: "#FF8D23",
      marginBottom: "-0px",
      display: "flex",
    },
    mapButton: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    mapButtonSmall: {
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
  })
);

export default Filter;
