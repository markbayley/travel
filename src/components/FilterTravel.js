import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

export default function FilterTravel({ jsonData, setFilteredTravel }) {
  const classes = useStyles();
  const [id, setId] = useState(0);
  const openCountries = jsonData.filter((item) => item?.status === "Open");

  const closedCountries = jsonData.filter((item) => item?.status === "Closed");

  const restrictedCountries = jsonData.filter(
    (item) => item?.status === "Restricted"
  );

  const filterAllCountries = () => {
    setId(0);
    return setFilteredTravel(jsonData);
  };

  const filterOpenCountries = () => {
    setId(1);
    return setFilteredTravel(openCountries);
  };

  const filterRestrictedCountries = () => {
    setId(2);
    return setFilteredTravel(restrictedCountries);
  };

  const filterClosedCountries = () => {
    setId(3);
    return setFilteredTravel(closedCountries);
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
        {jsonData.length} All
      </Button>
      <Button
        variant={id === 1 ? "contained" : "outlined"}
        disableElevation
        onClick={filterOpenCountries}
        className={id === 1 ? classes.openCountries : null}
        style={{ marginRight: 10, marginTop: 10 }}
      >
        {openCountries.length} Open
      </Button>
      <Button
        variant={id === 2 ? "contained" : "outlined"}
        disableElevation
        onClick={filterRestrictedCountries}
        className={id === 2 ? classes.restrictedCountries : null}
        style={{ marginRight: 10, marginTop: 10 }}
      >
        {restrictedCountries.length} Restricted
      </Button>
      <Button
        variant={id === 3 ? "contained" : "outlined"}
        onClick={filterClosedCountries}
        className={id === 3 ? classes.closedCountries : null}
        disableElevation
        style={{ marginTop: 10 }}
      >
        {closedCountries.length} Closed
      </Button>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  allCountries: {
    backgroundColor: "#333",
    color: "#fff",
  },
  openCountries: {
    backgroundColor: "#119DA4",
    color: "#fff",
  },
  restrictedCountries: {
    backgroundColor: "#FF8D23",
    color: "#fff",
  },
  closedCountries: {
    backgroundColor: "#ED5D5D",
    color: "#fff",
  },
}));
