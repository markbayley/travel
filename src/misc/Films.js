import React, { useState, useEffect } from "react";
import "../App.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import jsonData from "../country.json";
import SearchBar from "material-ui-search-bar";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";




function FilterComponent({ items, setItems, filterValue, setFilterValue }) {
  const classes = useStyles();
  const [id, setId] = useState(0);

  // const [region, setRegion] = useState([]);
  // const [population, setPopulation] = useState([]);


  const Europe = items.filter((item) => item?.region === "Europe");
  const Americas = items.filter((item) => item?.region === "Americas");
  const Oceania = items.filter((item) => item?.region === "Oceania");
  const Asia = items.filter((item) => item?.region === "Asia");
  const Africa = items.filter((item) => item?.region === "Africa");

  const HighPop = items.filter((item) => item?.population > 100000000);
  const MedPop = items.filter((item) => item?.population > 10000000);
  const LowPop = items.filter((item) => item?.population > 1000000);




  const filterAllCountries = () => {
    setId(0);
    return setItems(items);
  };

  const filterAmericas = () => {
    setId(1);
    return setItems(Americas);
  };

  const filterEurope = () => {
    setId(2);
    return setItems(Europe);
  };

   const filterAsia = () => {
    setId(3);
    return setItems(Asia);
  };

   const filterAfrica = () => {
    setId(4);
    return setItems(Africa);
  };

  const filterOceania = () => {
    setId(5);
    return setItems(Oceania);
  };

    const filterHighPop = () => {
      setId(6);
      return setItems(HighPop);
    };

    const filterMedPop = () => {
      setId(7);
      return setItems(MedPop);
    };

    const filterLowPop = () => {
      setId(8);
      return setItems(LowPop);
    };

  const highPopulation = () => {
    const sorted = [...items].sort((a, b) => {
      setId(9);
      return b.population - a.population;
    });
    setItems(sorted);
  };

  const lowPopulation = () => {
    const sorted = [...items].sort((b, a) => {
      setId(10);
      return b.population - a.population;
    });
    setItems(sorted);
  };

  console.log(id, 'id')
  console.log(filterValue, 'filterValue')
 


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
        onClick={filterAmericas}
        className={id === 1 ? classes.Americas : null}
        disableElevation
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Americas.length} */}
        Americas
      </Button>

      <Button
        variant={id === 2 ? "contained" : "outlined"}
        disableElevation
        onClick={filterEurope}
        className={id === 2 ? classes.Europe : null}
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Europe.length} */}
        Europe
      </Button>
      <Button
        variant={id === 3 ? "contained" : "outlined"}
        onClick={filterAsia}
        className={id === 3 ? classes.Asia : null}
        disableElevation
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Asia.length} */}
        Asia{" "}
      </Button>
      <Button
        variant={id === 4 ? "contained" : "outlined"}
        onClick={filterAfrica}
        className={id === 4 ? classes.Africa : null}
        disableElevation
        style={{ marginTop: 10, marginRight: 5 }}
      >
        {/* {Africa.length} */}
        Africa
      </Button>

      <Button
        variant={id === 5 ? "contained" : "outlined"}
        disableElevation
        onClick={filterOceania}
        className={id === 5 ? classes.Oceania : null}
        style={{ marginRight: 5, marginTop: 10 }}
      >
        {/* {Oceania.length} */}
        Oceania
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
        1m+
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
        variant={id === 11 ? "contained" : "outlined"}
        onClick={highPopulation}
        className={id === 11 ? classes.HighPop : null}
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
  })
);

//Search
const SearchBox = ({ setSearchValue, value }) => {
  return (
    <SearchBar
      style={{
        width: "280px",
        backgroundColor: "#efefef",
        boxShadow: "none",
      }}
      value={value}
      onChange={(item) => setSearchValue(item.toLowerCase())}
    />
  );
};

//Card
const AddFavourite = () => {
  return <FavoriteBorderIcon />;
};

const RemoveFavourite = () => {
  return <FavoriteIcon />;
};

const ItemList = ({ items, handleFavouritesClick, favouriteComponent, filterValue }) => {
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
      {items.slice(0, size).map((item, index) => (
        <Card className={classes.root} key={index}>
          <CardMedia className={classes.media} image={item.travel}>
            <CardActions disableSpacing>
              <IconButton className={classes.icon} aria-label="more">
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          </CardMedia>
          <CardHeader
            avatar={
              <Avatar aria-label="flag" className={classes.avatar}>
                <img src={item.flag} alt="flag" width="70px" />
              </Avatar>
            }
            action={
              <IconButton
                onClick={() => handleFavouritesClick(item)}
                color="secondary"
              >
                <FavouriteComponent />
              </IconButton>
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
        </Card>
      ))}
    </>
  );
};

//Fetch
const Films = () => {
  const [items, setItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filterValue, setFilterValue] = useState([]);

  // const getItemRequest = async (searchValue) => {
  //   const url = `https://restcountries.eu/rest/v2/name/${searchValue}`;

  //   const response = await fetch(url);
  //   const responseJson = await response.json();

  //   if (responseJson) {
  //     console.log(responseJson);
  //     setItems(responseJson);
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    setError(null);
    // setData(null);

    fetch(`https://restcountries.com/v2/all`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.Response === "False") {
          setError(response.Error);
        } else {
          setItems(response);
          console.log(response, "response -flags");
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, []);

  //Flags
  const searchedFlags = items.filter((item) =>
    item?.name.toLowerCase().includes(searchValue)
  );

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    setItems(searchedFlags);
  }, [setSearchValue, searchValue]);

  //Blend Data
  jsonData.map((child) => {
    for (let parent of items) {
      if (parent.name === child.country) {
        if (!parent.children) {
          parent.travel = [];
        }
        parent.travel.push(child.image);
      }
    }
  });

//Filter
// const filteredFlags = items.filter((item) =>
//   item?.name.toLowerCase().includes(filterValue)
// );

//     useEffect(() => {
//       setFilterValue(items);
//     }, [items]);

//       useEffect(() => {
//         setFilterValue(filteredFlags);
//       }, [setFilterValue, filterValue]);


//        console.log(filterValue, "filterValue");




  // useEffect(() => {
  //   getItemRequest(searchValue);
  // }, [searchValue]);

  //Favourites
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-items-app-favourites", JSON.stringify(items));
  };

  const addFavouriteItem = (item) => {
    const newFavouriteList = [...favourites, item];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteItem = (item) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.name !== item.name
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  console.log(favourites, "favourites");
  console.log(items, "items");

  return (
    <div className="wrapper">
      <div className="">
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <FilterComponent
          items={items}
          setItems={setItems}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </div>
      <ul className="card-grid">
        <ItemList
          items={items}
          handleFavouritesClick={addFavouriteItem}
          favouriteComponent={AddFavourite}
        />
      </ul>
      <div className="">FAVOURITES</div>
      <ul className="card-grid">
        <ItemList
          items={favourites}
          handleFavouritesClick={removeFavouriteItem}
          favouriteComponent={RemoveFavourite}
        />
      </ul>
    </div>
  );
};

export default Films;
