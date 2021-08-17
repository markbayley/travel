import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import jsonData from "../country.json";
import Action from "./Action";
import AppBar from "./AppBar";
import AppBarNoAuth from "./AppBarNoAuth";
import { auth } from "./ChatBox";
import Loader from "./Loader";
import SearchBox from "./SearchBox";
import FlagsDetail from "./FlagsDetail";
import Filter from "./Filter";
import ItemList from "./ItemList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Modal } from "antd";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Map from "./Map";
import SideBar from "./SideBar";

const Travel = () => {
  const [user] = useAuthState(auth);

  const [items, setItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activateModal, setActivateModal] = useState(false);
  const [details, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  const [filteredFlags, setFilteredFlags] = useState([]);
  const [filteredTravel, setFilteredTravel] = useState([]);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((p) => !p);

  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((e) => !e);

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

  //Covid
  // const [countries, setCountries] = useState([]);
  // useEffect(() => {
  //   async function fetchCountries() {
  //     try {
  //       const result = await fetch("https://corona.lmao.ninja/v2/countries");
  //       const countries = await result.json();
  //       setCountries([...countries]);
  //       console.log(countries[0].country, "countries");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchCountries();
  // }, []);

  // const getData = (key) => {
  //   return countries.map((country) => country[key]);
  // };
  // const countryLabels = getData("country");
  // console.log(countryLabels, "countryLabels");

  //Flags
  const searchedFlags = items.filter((item) =>
    item?.name.toLowerCase().includes(searchValue)
  );

  useEffect(() => {
    delete items[33];
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

  //Merge Travel Data
  searchedTravel.map((child) => {
    for (let parent of searchedFlags) {
      if (parent.name === child.country) {
        if (!parent.children) {
          parent.travel = [];
          parent.status = [];
        }
        parent.travel.push(child.image);
        parent.status.push(child.status);
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

  const AddFavourite = () => {
    return <FavoriteBorderIcon />;
  };

  const RemoveFavourite = () => {
    return <FavoriteIcon />;
  };

  //Map
  const [viewport, setViewport] = useState({
    latitude: 30,
    longitude: 0,
    bearing: 0,
    zoom: 1,
  });

  console.log(items, "items - delete");

  return (
    <>
      <div className="wrapper">
        <SideBar
          filteredFlags={filteredFlags}
          ShowDetail={setShowDetail}
          DetailRequest={setDetailRequest}
          ActivateModal={setActivateModal}
          items={items}
          setFilteredFlags={setFilteredFlags}
        />

        <Router>
          {user ? (
            <>
              {" "}
              <AppBar
                searchHandler={setSearchValue}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                favourites={favourites}
                toggleShow={toggleShow}
              />{" "}
              <Action />{" "}
            </>
          ) : (
            <AppBarNoAuth
              searchHandler={setSearchValue}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          )}
          <Switch>
            <Route
              exact
              path="/"
              component={Travel}
              // favourites={favourites}
              // setFavourites={setFavourites}
              // searchValue={searchValue}
              // setSearchValue={setSearchValue}
              // toggleShow={toggleShow}
              // show={show}
              // setShow={setShow}
            />
            <Route path="/contact" component={Contact} />
            <Route path="/map" component={Map} />
            <Route path="/home" component={Home} />
          </Switch>

          {/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}

          <Filter
            items={items}
            setItems={setItems}
            filteredFlags={filteredFlags}
            setFilteredFlags={setFilteredFlags}
            favourites={favourites}
            toggleShow={toggleShow}
            setViewport={setViewport}
            viewport={viewport}
          />

          {/* </Grid> */}

          <br />
          <ul className="card-grid">
            {/* {loading && <Loader />}
        {filteredFlags !== null &&
          filteredFlags.length > 0 &&
          filteredFlags.slice(0, size).map((items, i) => ( */}
            <>
              <ItemList
                // key={i}
                // {...items}
                // {...items.latlng}
                handleFavouritesClick={addFavouriteItem}
                favouriteComponent={AddFavourite}
                filteredFlags={filteredFlags}
                ShowDetail={setShowDetail}
                DetailRequest={setDetailRequest}
                ActivateModal={setActivateModal}
                clicked={clicked}
                toggleClicked={toggleClicked}
              />
            </>
            {/* ))} */}
          </ul>

          {/* <Map filteredFlags={filteredFlags} /> */}

          <Modal
            centered
            visible={show}
            onCancel={() => setShow(false)}
            footer={null}
            width={750}
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
            width={750}
            // height={500}
          >
            {detailRequest === false ? (
              <FlagsDetail
                {...details}
                {...details.latlng}
                loading={loading}
                filteredFlags={filteredFlags}
                ShowDetail={setShowDetail}
                DetailRequest={setDetailRequest}
                ActivateModal={setActivateModal}
              />
            ) : (
              <Loader />
            )}
          </Modal>
        </Router>
      </div>
    </>
  );
};

export default Travel;
