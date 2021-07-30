import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Badge from "@material-ui/core/Badge";
import { Favorite } from '../pages/Contact'
import Pagination from "./Pagination";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";


export default function FilterComponent({ items, setFilteredFlags, favourites }) {
  const classes = useStyles();
  const [id, setId] = useState(0);

  const Europe = items.filter((item) => item?.region === "Europe");
  const Americas = items.filter((item) => item?.region === "Americas");
  const Oceania = items.filter((item) => item?.region === "Oceania");
  const Asia = items.filter((item) => item?.region === "Asia");
  const Africa = items.filter((item) => item?.region === "Africa");

  const HighPop = items.filter((item) => item?.population > 100000000);
  const MedPop = items.filter(
    (item) => item?.population > 10000000 && item.population < 100000000
  );
  const LowPop = items.filter((item) => item?.population < 10000000);

  // const Favs = items.filter((item) => favourites.includes(item.name));

  

 
  const filterAllCountries = () => {
    setId(0);
    return setFilteredFlags(items);
  };

  const filterEurope = () => {
    setId(1);
    return setFilteredFlags(Europe);
  };

  const filterOceania = () => {
    setId(2);
    return setFilteredFlags(Oceania);
  };

  const filterAmericas = () => {
    setId(3);
    return setFilteredFlags(Americas);
  };

  const filterAsia = () => {
    setId(4);
    return setFilteredFlags(Asia);
  };

  const filterAfrica = () => {
    setId(5);
    return setFilteredFlags(Africa);
  };



   const filterHighPop = () => {
     setId(6);
     return setFilteredFlags(HighPop);
   };

   const filterMedPop = () => {
     setId(7);
     return setFilteredFlags(MedPop);
   };

   const filterLowPop = () => {
     setId(8);
     return setFilteredFlags(LowPop);
   };



  const highPopulation = () => {
    const sorted = [...items].sort((a, b) => {
         setId(9);
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
  };

  const lowPopulation = () => {
    const sorted = [...items].sort((b, a) => {
         setId(10);
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
  };

 

  return (
    <div style={{ marginBottom: "1em" }}>
      <Button
        variant={id === 0 ? "contained" : "outlined"}
        onClick={filterAllCountries}
        className={id === 0 ? classes.allCountries : null}
        style={{
          marginRight: 5,
          marginTop: 10,
        }}
        disableElevation
      >
        {/* {items.length} */}
        All
      </Button>
      <Button
        variant={id === 1 ? "contained" : "outlined"}
        disableElevation
        onClick={filterEurope}
        className={id === 1 ? classes.Europe : null}
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Europe.length} */}
        Europe
      </Button>
      <Button
        variant={id === 2 ? "contained" : "outlined"}
        disableElevation
        onClick={filterOceania}
        className={id === 2 ? classes.Oceania : null}
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Oceania.length} */}
        Oceania
      </Button>
      <Button
        variant={id === 3 ? "contained" : "outlined"}
        onClick={filterAmericas}
        className={id === 3 ? classes.Americas : null}
        disableElevation
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Americas.length} */}
        Americas
      </Button>
      <Button
        variant={id === 4 ? "contained" : "outlined"}
        onClick={filterAsia}
        className={id === 4 ? classes.Asia : null}
        disableElevation
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Asia.length} */}
        Asia{" "}
      </Button>
      <Button
        variant={id === 5 ? "contained" : "outlined"}
        onClick={filterAfrica}
        className={id === 5 ? classes.Africa : null}
        disableElevation
        style={{ marginTop: 10, marginRight: 5 }}
      >
        {/* {Africa.length} */}
        Africa
      </Button>

      <Button
        variant={id === 6 ? "contained" : "outlined"}
        onClick={filterHighPop}
        className={id === 6 ? classes.HighPop : null}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 5,
        }}
      >
        100m+
      </Button>
      <Button
        variant={id === 7 ? "contained" : "outlined"}
        onClick={filterMedPop}
        className={id === 7 ? classes.MedPop : null}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 5,
        }}
      >
        10m+
      </Button>
      <Button
        variant={id === 8 ? "contained" : "outlined"}
        onClick={filterLowPop}
        className={id === 8 ? classes.LowPop : null}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 5,
        }}
      >
        10m-
      </Button>

      <Button
        variant={id === 9 ? "contained" : "outlined"}
        onClick={highPopulation}
        className={id === 9 ? classes.Europe : null}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 5,
        }}
      >
        <PersonIcon />+
      </Button>

      <Button
        variant={id === 10 ? "contained" : "outlined"}
        onClick={lowPopulation}
        className={id === 10 ? classes.Europe : null}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 5,
        }}
      >
        <PersonIcon />-
      </Button>

      <Button
        variant={id === 15 ? "contained" : "outlined"}
        // onClick={highPopulation}
        className={id === 15 ? classes.HighPop : null}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 5,
        }}
      >
        <Badge badgeContent={3} color="secondary">
          <FavoriteIcon />
        </Badge>
      </Button>
      {/* <Pagination /> */}
    </div>
  );
}


const useStyles = makeStyles((theme) =>
  createStyles({
  allCountries: {
    backgroundColor: "#333",
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
  
}));
