import React, { useState, useEffect, useRef } from "react";
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
import { Button, CardContent } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import Loader from "../components/Loader";
import { Modal } from "antd";
// import FlagsDetail from "../components/FlagsDetail";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Message } from "../components/ChatBox";
import ImageCarousel from "../components/ImageCarousel";
import "../components/ImageCarousel.css";
import MailIcon from "@material-ui/icons/Mail";
import ReplayIcon from "@material-ui/icons/Replay";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import { Grid } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

import Action from "../components/Action";
import Pagination from "../components/Pagination";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/ChatBox";
import { SignIn } from "../components/ChatBox";
import AppBar from "../components/AppBar";
import AppBarNoAuth from "../components/AppBarNoAuth";

  


const FilterComponent = ({
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



  //Slider
  function valuetext(value) {
    return `${value} + "m" `;
  }

  const [value, setValue] = useState([200, 600]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
     return setFilteredFlags(RangePop);
  };


  const RangePop = filteredFlags.filter((item) => item?.population < (value));

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
    <div style={{ margin: "1em 0em", display: "inline-block" }}>
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
        step={100}
        min={0}
        max={1000}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
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
      <Button
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
      </Button>

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
          className={filteredPopulation === "Ascending" ? classes.Europe : null}
          disableElevation
          style={{
            marginRight: 35,
          }}
        >
          <PersonIcon />-
        </Button>
      </Tooltip>

      <Tooltip title="My Favourites" placement="top">
        <IconButton
          onClick={toggleShow}
          style={{
            marginRight: 5,
          }}
        >
          <Badge badgeContent={favourites.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Chip
        style={{
          marginRight: 5,
        }}
        label={favourites[0]?.name}
        onDelete={handleDelete}
        color="secondary"
        variant="outlined"
      />
      <Chip
        style={{
          marginRight: 5,
        }}
        label={favourites[1]?.name}
        onDelete={handleDelete}
        color="secondary"
        variant="outlined"
      />
      <Chip
        style={{
          marginRight: 5,
        }}
        label={favourites[2]?.name}
        onDelete={handleDelete}
        color="secondary"
        variant="outlined"
      />
      <Chip
        style={{
          marginRight: 5,
        }}
        label={favourites[3]?.name}
        onDelete={handleDelete}
        color="secondary"
        variant="outlined"
      />
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
// const AddFavourite = () => {
//   return <FavoriteBorderIcon />;
// };

// const RemoveFavourite = () => {
//   return <FavoriteIcon />;
// };

const ItemList = ({
  handleFavouritesClick,
  favouriteComponent,
  filteredFlags,
  loading,

  population,
  region,
  capital,
  travel,
  flag,

  ActivateModal,
  DetailRequest,
  ShowDetail,
}) => {
  const clickHandler = (item) => {
    ActivateModal(true);
    DetailRequest(true);

    console.log(item.name, "name");

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

  //Map here and Favourites work item.(value) but Gallery doesn't
  return (
    <>
      {loading && <Loader />}
      {filteredFlags !== null &&
        filteredFlags.length > 0 &&
        filteredFlags.slice(0, size).map((item, i) => (
          <>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={item.travel}
                onClick={() => clickHandler(item)}
              >
                <CardActions disableSpacing>
                  <Tooltip title="More" placement="left">
                    <IconButton className={classes.icon} aria-label="more">
                      <MoreVertIcon />
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
                  <Tooltip title="Favourite" placement="top">
                    <IconButton
                      onClick={() => handleFavouritesClick(item)}
                      color="secondary"
                    >
                      <FavouriteComponent />
                    </IconButton>
                  </Tooltip>
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
          </>
        ))}
    </>
  );
};

//Fetch
const Items = () => {

   const [user] = useAuthState(auth);

  const [items, setItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activateModal, setActivateModal] = useState(false);
  const [details, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  // const getItemRequest = async (searchValue) => {
  //   const url = `https://restcountries.eu/rest/v2/name/${searchValue}`;

  //   const response = await fetch(url);
  //   const responseJson = await response.json();

  //   if (responseJson) {
  //     console.log(responseJson);
  //     setItems(responseJson);
  //   }
  // };

  const [filteredFlags, setFilteredFlags] = useState([]);
  const [filteredTravel, setFilteredTravel] = useState([]);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((p) => !p);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // setData(null);

    fetch(`https://restcountries.eu/rest/v2/all`)
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
    setFilteredFlags(items);
  }, [items]);

  useEffect(() => {
    setFilteredFlags(searchedFlags);
  }, [setSearchValue, searchValue]);

  //Travel
  const searchedTravel = jsonData.filter((item) =>
    item?.country.toLowerCase().includes(searchValue)
  );

  useEffect(() => {
    setFilteredTravel(jsonData);
  }, []);

  useEffect(() => {
    setFilteredTravel(searchedTravel);
  }, [setSearchValue, searchValue]);

  searchedTravel.map((child) => {
    for (let parent of searchedFlags) {
      if (parent.name === child.country) {
        if (!parent.children) {
          parent.travel = [];
        }
        parent.travel.push(child.image);
      }
    }
  });

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
  console.log(filteredFlags, "filteredFlags");

  const AddFavourite = () => {
    return <FavoriteBorderIcon />;
  };

  const RemoveFavourite = () => {
    return <FavoriteIcon />;
  };

  //  const FavouriteComponent = favouriteComponent;

  const size = 15;
  //Map here and Gallery works (value)
  return (
    <div className="wrapper">
      {/* <Grid
        className=""
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "start",
        }}
      > */}
      {/* {user ? (
        <>
          {" "}
          <AppBar
            searchHandler={setSearchValue}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />{" "}
          <Action />{" "}
        </>
      ) : (
        <AppBarNoAuth
          searchHandler={setSearchValue}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      )} */}
      {/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      <FilterComponent
        items={items}
        setItems={setItems}
        filteredFlags={filteredFlags}
        setFilteredFlags={setFilteredFlags}
        favourites={favourites}
        toggleShow={toggleShow}
      />
      {/* </Grid> */}

      <ul className="card-grid">
        {/* {loading && <Loader />}
        {filteredFlags !== null &&
          filteredFlags.length > 0 &&
          filteredFlags.slice(0, size).map((items, i) => ( */}
        <>
          <ItemList
            // key={i}
            // {...items}
            // {...items.travel}
            handleFavouritesClick={addFavouriteItem}
            favouriteComponent={AddFavourite}
            filteredFlags={filteredFlags}
            ShowDetail={setShowDetail}
            DetailRequest={setDetailRequest}
            ActivateModal={setActivateModal}
          />
        </>
        {/* ))} */}
      </ul>

      <Modal
        centered
        visible={show}
        onCancel={() => setShow(false)}
        footer={null}
        width={800}
        height={700}
      >
        <h3>FAVOURITES</h3>
        <ul className="card-grid">
          <ItemList
            // items={favourites}
            handleFavouritesClick={removeFavouriteItem}
            favouriteComponent={RemoveFavourite}
            filteredFlags={favourites}
          />
        </ul>
      </Modal>

      <Modal
        // title={detail.name + " " + "(" + detail.region + ")"}
        centered
        visible={activateModal}
        onCancel={() => setActivateModal(false)}
        footer={null}
        width={800}
        height={700}
      >
        {detailRequest === false ? (
          <FlagsDetail
            {...details}
            filteredFlags={filteredFlags}
            ShowDetail={setShowDetail}
            DetailRequest={setDetailRequest}
            ActivateModal={setActivateModal}
          />
        ) : (
          <Loader />
        )}
      </Modal>
    </div>
  );
};

export default Items;

const superagent = require("superagent");

const clientID =
  "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

const simpleGet = (options) => {
  superagent.get(options.url).then(function (res) {
    if (options.onSuccess) options.onSuccess(res);
  });
};

const FlagsDetail = ({ flag, population, region, name, capital, travel }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
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
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [images, setImages] = useState();

  let [photos, setPhotos] = useState([]);
  let [query, setQuery] = useState("");
  const queryInput = useRef(null);

  const numberOfPhotos = 10;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  useEffect(() => {
    const photosUrl = name ? `${url}&query=${name}` : url;

    simpleGet({
      url: photosUrl,
      onSuccess: (res) => {
        setPhotos(res.body);
      },
    });
  }, [name, url]);

  const searchPhotos = (e) => {
    e.preventDefault();
    setQuery(name.current.value);
  };

  // useEffect(() => {
  //   setImages(
  //     Array.from(Array(10).keys()).map((id) => ({
  //       id,
  //       url: `https://api.unsplash.com/photos/random/?count=10&client_id=PvvWIfrMMfNqoEEuVve3X6KE1gksd31-C1Pn-SP3yL4`,
  //       // url: `https://picsum.photos/1000?random=${id}`,
  //     }))
  //   );
  // }, []);

  console.log(photos, "photos");

  return (
    <div style={{ zIndex: 20 }}>
      <Card className={classes.root}>
        <CardMedia
          image={flag}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name + " (" + region + ")"}
          subheader={
            "Population:" + (population / 1000000).toFixed(2) + " million"
          }
        />
        {/* <CardMedia className={classes.media} image={flag} /> */}
        <ImageCarousel photos={photos} flag={flag} name={name} />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Located in <strong>{region}</strong>, the nation of{" "}
            <strong>{name}</strong> has a population of{" "}
            <strong>{(population / 1000000).toFixed(2) + " million"}</strong>{" "}
            people. The capital city is <strong>{capital}</strong>.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites"> */}
          {/* <FavoriteIcon /> */}
          <MailIcon />
          {/* </IconButton> */}
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            {/* <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography> */}
            <Message />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
