import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from "@material-ui/icons/Person";

export default function FilterComponent({ items, setFilteredFlags }) {
  const classes = useStyles();
  const [id, setId] = useState(0);

  const Europe = items.filter((item) => item?.region === "Europe");
  const Americas = items.filter((item) => item?.region === "Americas");
  const Oceania = items.filter((item) => item?.region === "Oceania");
  const Asia = items.filter((item) => item?.region === "Asia");
  const Africa = items.filter((item) => item?.region === "Africa");

  const HighPop = items.filter((item) => item?.population > 100000000);
  const MedPop = items.filter((item) => item?.population > 10000000);
  const LowPop = items.filter((item) => item?.population > 1000000);

  const filterHighPop = () => {
    return setFilteredFlags(HighPop);
  }

   const filterMedPop = () => {
     return setFilteredFlags(MedPop);
   };

     const filterLowPop = () => {
       return setFilteredFlags(LowPop);
     };

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

  const highPopulation = () => {
    const sorted = [...items].sort((a, b) => {
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
  };

  const lowPopulation = () => {
    const sorted = [...items].sort((b, a) => {
      return b.population - a.population;
    });
    setFilteredFlags(sorted);
  };

  return (
    <div>
      <Button
        variant={id === 0 ? "contained" : "outlined"}
        onClick={filterAllCountries}
        className={id === 0 ? classes.allCountries : null}
        style={{
          marginRight: 10,
          marginTop: 10,
        }}
        disableElevation
      >
        {items.length} All
      </Button>
      <Button
        variant={id === 3 ? "contained" : "outlined"}
        onClick={filterAmericas}
        className={id === 3 ? classes.Americas : null}
        disableElevation
        style={{ marginRight: 10, marginTop: 10 }}
      >
        {Americas.length} Americas
      </Button>
      <Button
        variant={id === 1 ? "contained" : "outlined"}
        disableElevation
        onClick={filterEurope}
        className={id === 1 ? classes.Europe : null}
        style={{ marginRight: 10, marginTop: 10 }}
      >
        {Europe.length} Europe
      </Button>
      <Button
        variant={id === 5 ? "contained" : "outlined"}
        onClick={filterAfrica}
        className={id === 5 ? classes.Africa : null}
        disableElevation
        style={{ marginTop: 10, marginRight: 10 }}
      >
        {Africa.length} Africa
      </Button>

      <Button
        variant={id === 2 ? "contained" : "outlined"}
        disableElevation
        onClick={filterOceania}
        className={id === 2 ? classes.Oceania : null}
        style={{ marginRight: 10, marginTop: 10 }}
      >
        {Oceania.length} Oceania
      </Button>
      <Button
        variant={id === 4 ? "contained" : "outlined"}
        onClick={filterAsia}
        className={id === 4 ? classes.Asia : null}
        disableElevation
        style={{ marginRight: 30, marginTop: 10 }}
      >
        {Asia.length} Asia
      </Button>

      <Button
        variant={id === 8 ? "contained" : "outlined"}
        onClick={filterHighPop}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 10,
        }}
      >
        100m+
      </Button>
      <Button
        variant={id === 9 ? "contained" : "outlined"}
        onClick={filterMedPop}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 10,
        }}
      >
        10m+
      </Button>
      <Button
        variant={id === 10 ? "contained" : "outlined"}
        onClick={filterLowPop}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 10,
        }}
      >
        1m+
      </Button>
      <Button
        variant={id === 6 ? "contained" : "outlined"}
        onClick={lowPopulation}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 10,
        }}
      >
        <PersonIcon />-
      </Button>
      <Button
        variant={id === 7 ? "contained" : "outlined"}
        onClick={highPopulation}
        disableElevation
        style={{
          marginTop: 10,
          marginRight: 30,
        }}
      >
        <PersonIcon />+
      </Button>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  allCountries: {
    backgroundColor: "#333",
    color: "#fff",
  },
  Europe: {
    backgroundColor: "#119DA4",
    color: "#fff",
  },
  Oceania: {
    backgroundColor: "#FF8D23",
    color: "#fff",
  },
  Americas: {
    backgroundColor: "#ED5D5D",
    color: "#fff",
  },
}));
