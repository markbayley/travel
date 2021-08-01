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
import Tooltip from "@material-ui/core/Tooltip";



const FilterComponent = ({
  items,
  filteredFlags,
  setFilteredFlags,
  favourites,
  toggleShow,
}) => {

  const classes = useStyles();
  const [id, setId] = useState(0);

  const [filterRegion, setRegion] = useState(0);
  const [filterPopulation, setPopulation] = useState(null);

 

  // const [region, setRegion] = useState([]);
  // const [population, setPopulation] = useState([]);

  const Europe = items.filter((item) => item?.region === "Europe");
  const Americas = items.filter((item) => item?.region === "Americas");
  const Oceania = items.filter((item) => item?.region === "Oceania");
  const Asia = items.filter((item) => item?.region === "Asia");
  const Africa = items.filter((item) => item?.region === "Africa");

  const HighPop = filteredFlags.filter((item) => item?.population > 100000000);
  const MedPop = filteredFlags.filter((item) => item?.population > 10000000);
  const LowPop = filteredFlags.filter((item) => item?.population < 1000000);


   

  const filterAllCountries = () => {
    setId(0);
    return setFilteredFlags(items);
  };

  //  id === 1 ? setId(1) : !setId(1);
  const filterAmericas = () => {
    if( id === 1 ){
        setId(0);  
         return setFilteredFlags(items); 
    }
    else {
      setId(1);
      return setFilteredFlags(Americas);
    }
  };

  const filterEurope = () => {
    setId(2);
    return setFilteredFlags(Europe);
  };

  const filterAsia = () => {
    setId(3);
    return setFilteredFlags(Asia);
  };

  const filterAfrica = () => {
    setId(4);
    return setFilteredFlags(Africa);
  };

  const filterOceania = () => {
    setId(5);
    return setFilteredFlags(Oceania);
  };



  const filterHighPop = () => {
    if (id === 6) {
      setId(0);
      return setFilteredFlags(items);
    } 
    if (id < 6) {
       setPopulation(0);
       setRegion(id);
      return setFilteredFlags(HighPop);
    }
    else {
       setId(6);
       return setFilteredFlags(HighPop);
    }
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

  console.log(id, "id");


  return (
    <div style={{ marginBottom: "0em" }}>
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

      <Tooltip title="Highest Population" placement="top">
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
      </Tooltip>

      <Tooltip title="Lowest Population" placement="top">
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
      </Tooltip>

      <Tooltip title="My Favourites" placement="top">
        <IconButton
          variant={id === 11 ? "contained" : "outlined"}
          onClick={toggleShow}
          className={id === 11 ? classes.HighPop : null}
          disableElevation
          style={{
            marginTop: 10,
            marginRight: 5,
          }}
        >
          <Badge badgeContent={favourites.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      {/* <div>
        <Badge badgeContent={favourites[0]?.name} color="secondary"></Badge>
      </div> */}
      <div style={{ display: "flex", color: "red" }}>
        <p>{favourites[0]?.name}</p>
        <p>{favourites[1]?.name}</p>
        <p>{favourites[2]?.name}</p>
        <p>{favourites[3]?.name}</p>
      </div>
    </div>
  );
};

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

    console.log(item.name, 'name')


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
      })
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

  const size = 15

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
                  <Tooltip title="Favourite" placement="left">
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
      <div className="">
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <FilterComponent
          items={items}
          setItems={setItems}
          filteredFlags={filteredFlags}
          setFilteredFlags={setFilteredFlags}
          favourites={favourites}
          toggleShow={toggleShow}
        />
      </div>

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


const FlagsDetail = ({
  
  
  flag,
  population,
  region,
  name,
  capital,
  travel,
}) => {

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

  console.log(photos, 'photos')

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
        <ImageCarousel photos={photos} flag={flag} name={name}  />

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



