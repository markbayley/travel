import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Button, Typography, Grid } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import "./components/ImageCarousel.css";
import ReplayIcon from "@material-ui/icons/Replay";
import PublicIcon from "@material-ui/icons/Public";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import Slider from "@material-ui/core/Slider";
import RangeSlider from './RangeSlider'


const Filter = ({
  items,
  filteredFlags,
  setFilteredFlags,
  favourites,
  toggleShow,
}) => {
  const classes = useStyles();
  // const [id, setId] = useState(0);

  const [filteredRegion, setRegion] = useState("All");
  const [filteredPopulation, setPopulation] = useState("All");

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
  
  //Slider
  function valuetext(value) {
    return `${value} + "m" `;
  }

  const [value, setValue] = useState([50, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value, newValue[1])
    return setFilteredFlags(RangePop);
  };


const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 200,
    label: "200m",
  },
  {
    value: 500,
    label: "500m",
  },
  {
    value: 1000,
    label: "1 billion",
  },
];


  const RangePop = filteredFlags.filter(
    (item) => item?.population > (value[0]*1000000) && item?.population < (value[1]*1000000)
  );

  const HighPop = filteredFlags.filter((item) => item?.population > 100000000);

  const MedPop = filteredFlags.filter(
    (item) => item?.population > 10000000 && item.population < 100000000
  );
  const LowPop = filteredFlags.filter((item) => item?.population < 10000000);

  const filterAllCountries = () => {
    setRegion("All");
    return setFilteredFlags(items);
  };

  //  id === 1 ? setId(1) : !setId(1);
  const filterAmericas = () => {
    if (filteredRegion === "Americas") {
      setRegion("All");
      return setFilteredFlags(items);
    } else {
      setRegion("Americas");
      return setFilteredFlags(Americas);
    }
  };

  const filterEurope = () => {
    if (filteredRegion === "Europe") {
      setRegion("All");
      return setFilteredFlags(items);
    } else {
      setRegion("Europe");
      return setFilteredFlags(Europe);
    }
  };

  const filterAsia = () => {
    if (filteredRegion === "Asia") {
      setRegion("All");
      return setFilteredFlags(items);
    } else {
      setRegion("Asia");
      return setFilteredFlags(Asia);
    }
  };

  const filterAfrica = () => {
    if (filteredRegion === "Africa") {
      setRegion("All");
      return setFilteredFlags(items);
    } else {
      setRegion("Africa");
      return setFilteredFlags(Africa);
    }
  };

  const filterOceania = () => {
    if (filteredRegion === "Oceania") {
      setRegion("All");
      return setFilteredFlags(items);
    } else {
      setRegion("Oceania");
      return setFilteredFlags(Oceania);
    }
  };

  const filterHighPop = () => {
    if (filteredPopulation === "HighPop") {
      setPopulation("All");
      return setFilteredFlags(filteredFlags);
    } else {
      setFilteredFlags(items);
      setPopulation("HighPop");
      return setFilteredFlags(HighPop);
    }
  };

  const filterMedPop = () => {
    if (filteredPopulation === "MedPop") {
      setPopulation("All");
      return setFilteredFlags(filteredFlags);
    } else {
      setFilteredFlags(items);
      setPopulation("MedPop");
      return setFilteredFlags(MedPop);
    }
  };

  const filterLowPop = () => {
    if (filteredPopulation === "LowPop") {
      setPopulation("All");
      return setFilteredFlags(filteredFlags);
    } else {
      setFilteredFlags(items);
      setPopulation("LowPop");
      return setFilteredFlags(LowPop);
    }
  };

  const highPopulation = () => {
    const sorted = [...items].sort((a, b) => {
      setPopulation("Descending");
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
  };

  const lowPopulation = () => {
    const sorted = [...items].sort((b, a) => {
      setPopulation("Ascending");
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
  };

  console.log(filteredRegion, filteredPopulation, "fR, fP");

  //Chips
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div  style={{ margin: "1.4em 0em" }}>
    
        <Tooltip title="Reset" placement="top">
          <Button
            variant={filteredRegion === "All" ? "contained" : "outlined"}
            onClick={filterAllCountries}
            className={filteredRegion === "All" ? classes.allCountries : null}
            style={{
              marginRight: 5,
            }}
            disableElevation
          >
            {/* {items.length} */}
            <ReplayIcon />
          </Button>
        </Tooltip>
        <Button
          variant={filteredRegion === "Americas" ? "contained" : "outlined"}
          onClick={filterAmericas}
          className={filteredRegion === "Americas" ? classes.Americas : null}
          disableElevation
          style={{ marginRight: 5 }}
        >
          {/* {Americas.length} */}
          Americas
        </Button>
        <Button
          variant={filteredRegion === "Europe" ? "contained" : "outlined"}
          disableElevation
          onClick={filterEurope}
          className={filteredRegion === "Europe" ? classes.Europe : null}
          style={{ marginRight: 5 }}
        >
          {/* {Europe.length} */}
          Europe
        </Button>
        <Button
          variant={filteredRegion === "Asia" ? "contained" : "outlined"}
          onClick={filterAsia}
          className={filteredRegion === "Asia" ? classes.Asia : null}
          disableElevation
          style={{ marginRight: 5 }}
        >
          {/* {Asia.length} */}
          Asia{" "}
        </Button>
        <Button
          variant={filteredRegion === "Africa" ? "contained" : "outlined"}
          onClick={filterAfrica}
          className={filteredRegion === "Africa" ? classes.Africa : null}
          disableElevation
          style={{ marginRight: 5 }}
        >
          {/* {Africa.length} */}
          Africa
        </Button>
        <Button
          variant={filteredRegion === "Oceania" ? "contained" : "outlined"}
          disableElevation
          onClick={filterOceania}
          className={filteredRegion === "Oceania" ? classes.Oceania : null}
          style={{ marginRight: 35 }}
        >
          {/* {Oceania.length} */}
          Oceania
        </Button>
   
     
        <Slider
          style={{ marginRight: 35 }}
          className={classes.slider}
          value={value}
          step={10}
          min={0}
          max={1100}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        //    value={value}
        // min={0}
        // step={0.1}
        // max={11}
        // scale={(x) => x ** 10}
        // getAriaValueText={valueLabelFormat}
        // valueLabelFormat={valueLabelFormat}
        // onChange={handleChange}
        // valueLabelDisplay="on"
        // aria-labelledby="non-linear-slider"
        marks={marks}
        />
   
     
        <Button
          variant={filteredPopulation === "HighPop" ? "contained" : "outlined"}
          onClick={filterHighPop}
          className={filteredPopulation === "HighPop" ? classes.HighPop : null}
          disableElevation
          style={{
            marginRight: 5,
          }}
        >
          100m+
        </Button>
        {/* <Button
          variant={filteredPopulation === "MedPop" ? "contained" : "outlined"}
          onClick={filterMedPop}
          className={filteredPopulation === "MedPop" ? classes.MedPop : null}
          disableElevation
          style={{
            marginRight: 5,
          }}
        >
          10m+
        </Button>
        <Button
          variant={filteredPopulation === "LowPop" ? "contained" : "outlined"}
          onClick={filterLowPop}
          className={filteredPopulation === "LowPop" ? classes.LowPop : null}
          disableElevation
          style={{
            marginRight: 5,
          }}
        >
          1m+
        </Button> */}

        <Tooltip title="Descending" placement="top">
          <Button
            variant={
              filteredPopulation === "Descending" ? "contained" : "outlined"
            }
            onClick={highPopulation}
            className={
              filteredPopulation === "Descending" ? classes.Europe : null
            }
            disableElevation
            style={{
              marginRight: 5,
            }}
          >
            <PersonIcon />+
          </Button>
        </Tooltip>

        <Tooltip title="Ascending" placement="top">
          <Button
            variant={
              filteredPopulation === "Ascending" ? "contained" : "outlined"
            }
            onClick={lowPopulation}
            className={
              filteredPopulation === "Ascending" ? classes.Europe : null
            }
            disableElevation
            style={{
              marginRight: 35,
            }}
          >
            <PersonIcon />-
          </Button>
        </Tooltip>

        <Tooltip title="My Favourites" placement="top">
          <Button
          variant="outlined"
            onClick={toggleShow}
            style={{
              marginRight: 5,
            }}
          >
            <Badge badgeContent={favourites.length} color="secondary">
              <FavoriteIcon />
            </Badge>
          </Button>
        </Tooltip>

        {/* <Chip
          style={{
            marginRight: 5,
          }}
          label={favourites[0]?.name}
          onDelete={handleDelete}
          color="secondary"
          variant="outlined"
        /> */}

        <Tooltip title="View Map" placement="top">
          <Button variant="outlined">
            {/* <PublicIcon /> */}
            Map
          </Button>
        </Tooltip>
    

      {/* <RangeSlider /> */}
    </div>
  );
};

const useStyles = makeStyles(() =>
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
      width: "300px",
      color: "#FF8D23",
      marginBottom: "-15px",
    },
  })
);

export default Filter;
