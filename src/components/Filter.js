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



const Filter = ({
  items,
  filteredFlags,
  setFilteredFlags,
  favourites,
  toggleShow,
}) => {
  const classes = useStyles();
  // const [id, setId] = useState(0);

  const [filteredRegion, setRegion] = useState("All Regions");
  const [filteredPopulation, setPopulation] = useState("Total Population");

  const Europe = items.filter((item) => item?.region === "Europe");
  const Americas = items.filter((item) => item?.region === "Americas");
  const Oceania = items.filter((item) => item?.region === "Oceania");
  const Asia = items.filter((item) => item?.region === "Asia");
  const Africa = items.filter((item) => item?.region === "Africa");

  //   function valueLabelFormat(value) {
  //   const [coefficient, exponent] = value
  //     .toExponential()
  //     .split('e')
  //     .map((item) => Number(item));
  //   return `${Math.round(coefficient)}e^${exponent}`;
  // }

  //   const [value, setValue] = useState([0, 1000]);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //     console.log(value, newValue);
  //     return setFilteredFlags(RangePop);
  //   };


  //SnackBar 
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  

  //Slider
  function valuetext(value) {
    return `${value} + "m" `;
  }

  const [value, setValue] = useState([0, 300]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value, newValue[1]);
    return setFilteredFlags(RangePop);
  };

  const marks = [
    {
      value: 0,
      label: "0m",
    },
    {
      value: 150,
      label: "Population",
    },
    {
      value: 300,
      label: "300m",
    },
    // {
    //   value: 1000,
    //   label: "1 billion",
    // },
  ];

  const RangePop = filteredFlags.filter(
    (item) =>
      item?.population > value[0] * 1000000 &&
      item?.population < value[1] * 1000000
  );

  const HighPop = filteredFlags.filter((item) => item?.population > 50000000);

  const MedPop = filteredFlags.filter(
    (item) => item?.population > 10000000 && item.population < 100000000
  );
  const LowPop = filteredFlags.filter((item) => item?.population < 10000000);

  const filterAllCountries = () => {
    setRegion("All Regions");
    return setFilteredFlags(items);
  };

  //  id === 1 ? setId(1) : !setId(1);
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

        textAlign: "left",
        // marginTop:"1.4em",
      }}
    >
      <Grid item md={12} lg={5} style={{ marginTop: "1.4em" }}>
        <Button
          // size="small"
          variant={filteredRegion === "Americas" ? "contained" : "outlined"}
          onClick={filterAmericas}
          // onClick={handleClick({ vertical: "top", horizontal: "right" })}
          className={filteredRegion === "Americas" ? classes.Americas : null}
          disableElevation
          style={{ marginRight: 8 }}
        >
          {/* {Americas.length} */}
          Americas
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Europe" ? "contained" : "outlined"}
          disableElevation
          onClick={filterEurope}
          className={filteredRegion === "Europe" ? classes.Europe : null}
          style={{ marginRight: 8 }}
        >
          {/* {Europe.length} */}
          Europe
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Asia" ? "contained" : "outlined"}
          onClick={filterAsia}
          className={filteredRegion === "Asia" ? classes.Asia : null}
          disableElevation
          style={{ marginRight: 7 }}
        >
          {/* {Asia.length} */}
          Asia{" "}
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Africa" ? "contained" : "outlined"}
          onClick={filterAfrica}
          className={filteredRegion === "Africa" ? classes.Africa : null}
          disableElevation
          style={{ marginRight: 7 }}
        >
          {/* {Africa.length} */}
          Africa
        </Button>
        <Button
          // size="small"
          variant={filteredRegion === "Oceania" ? "contained" : "outlined"}
          disableElevation
          onClick={filterOceania}
          className={filteredRegion === "Oceania" ? classes.Oceania : null}
          style={{ marginRight: 5 }}
        >
          {/* {Oceania.length} */}
          Oceania
        </Button>
        {/* <Button
          size="small"
            disableElevation
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
            }}
            disableElevation
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
        md={6}
        lg={4}
        style={{ margin: "1.4em 0em 0.7em 0em" }}
      >
        <Tooltip title="Ascending" placement="top">
          <Button
            // size="small"
            variant={
              filteredPopulation === "Ascending" ? "contained" : "outlined"
            }
            onClick={lowPopulation}
            className={
              filteredPopulation === "Ascending" ? classes.Europe : null
            }
            disableElevation
            style={{
              marginLeft: 0,
              marginRight: 5,
            }}
          >
            <PersonIcon />-
          </Button>
        </Tooltip>

        <Tooltip title="Large Population" placement="top">
          <Button
            // size="small"
            variant={
              filteredPopulation === "HighPop" ? "contained" : "outlined"
            }
            onClick={filterHighPop}
            className={
              filteredPopulation === "HighPop" ? classes.HighPop : null
            }
            disableElevation
            style={{
              marginRight: 0,
            }}
          >
            50m+
          </Button>
        </Tooltip>
        <Tooltip title="Medium Population" placement="top">
          <Button
            // size="small"
            variant={filteredPopulation === "MedPop" ? "contained" : "outlined"}
            onClick={filterMedPop}
            className={filteredPopulation === "MedPop" ? classes.MedPop : null}
            disableElevation
            style={{
              marginRight: 0,
            }}
          >
            10m+
          </Button>
        </Tooltip>
        <Tooltip title="Small Population" placement="top">
          <Button
            // size="small"
            variant={filteredPopulation === "LowPop" ? "contained" : "outlined"}
            onClick={filterLowPop}
            className={filteredPopulation === "LowPop" ? classes.LowPop : null}
            disableElevation
            style={{
              marginRight: 0,
            }}
          >
            1m+
          </Button>
        </Tooltip>

        <Tooltip title="Descending" placement="top">
          <Button
            // size="small"
            variant={
              filteredPopulation === "Descending" ? "contained" : "outlined"
            }
            onClick={highPopulation}
            className={
              filteredPopulation === "Descending" ? classes.Europe : null
            }
            disableElevation
            style={{
              marginLeft: 5,
            }}
          >
            <PersonIcon />+
          </Button>
        </Tooltip>
      </Grid>

      <Grid
        item
        xs={12}
        sm={5}
        md={5}
        lg={1}
        style={{ margin: "1em 0em 1.8em 0em" }}
      >
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
          vertical: "top",
          horizontal: "right",
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
      backgroundColor: "#FF8D23",
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
