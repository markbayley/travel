import React, { useEffect, useState, useMemo } from "react";
import { Layout, Alert, Button, Modal } from "antd";
import { Grid, Typography } from "@material-ui/core";
import SearchBox from "./components/SearchBox";
import FlagsCard from "./components/FlagsCard";
import FlagsDetail from "./components/FlagsDetail";
import Loader from "./components/Loader";
import "./api/FetchApi.scss";
import FilterComponent from "./components/FilterComponent";
import jsonData from "./country.json";
import { ChatBox } from "./components/ChatBox";
import { Cart } from "./components/ChatBox";
import { Profile } from "./components/ChatBox";
import Action from "./components/Action";
import Pagination from "./components/Pagination";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./components/ChatBox";
import { SignIn } from "./components/ChatBox";
import AppBar from './components/AppBar'
import AppBarNoAuth from './components/AppBarNoAuth';

function Travel() {
  const [user] = useAuthState(auth);

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState("");
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [filteredFlags, setFilteredFlags] = useState([]);

  const [filteredTravel, setFilteredTravel] = useState([]);




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
    item?.name.toLowerCase().includes(q)
  );

  useEffect(() => {
    setFilteredFlags(items);
  }, [items]);

  useEffect(() => {
    setFilteredFlags(searchedFlags);
  }, [setQuery, q]);

  //Travel
  const searchedTravel = jsonData.filter((item) =>
    item?.country.toLowerCase().includes(q)
  );

  useEffect(() => {
    setFilteredTravel(jsonData);
  }, []);

  useEffect(() => {
    setFilteredTravel(searchedTravel);
  }, [setQuery, q]);


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

  // const searchedFlags = useMemo(() => {
  // return items.filter((item) => { item?.name.toLowerCase().includes(q);
  //   })}, [q]);

  console.log(searchedFlags, "searchedFlags");
  console.log(searchedTravel, "searchedTravel");
   console.log(filteredFlags, "filteredFlags");
    console.log(items, "items");

  const size = 15;

  return (
    <div className="wrapper">
      {user ? <> <AppBar searchHandler={setQuery} q={q} setQuery={setQuery} />  <Action />  </>: <AppBarNoAuth searchHandler={setQuery} q={q} setQuery={setQuery} />}
   
      <Grid>
        <FilterComponent items={items} setFilteredFlags={setFilteredFlags} />
      </Grid>

      <ul className="card-grid">
        {loading && <Loader />}
        {filteredFlags !== null &&
          filteredFlags.length > 0 &&
          filteredFlags.slice(0, size).map((items, i) => {
            return (
              <FlagsCard
                ShowDetail={setShowDetail}
                DetailRequest={setDetailRequest}
                ActivateModal={setActivateModal}
                key={i}
                {...items}
                {...items.borders}
                {...items.travel}
              />
            );
          })}
      </ul>
      <Modal
        style={{ padding: "0px" }}
        // title={detail.name + " " + "(" + detail.region + ")"}
        centered
        visible={activateModal}
        onCancel={() => setActivateModal(false)}
        footer={null}
        width={800}
        height={700}
      >
        {detailRequest === false ? <FlagsDetail {...detail} /> : <Loader />}
      </Modal>
      {/* <Action /> */}
      {/* <Pagination /> */}
    </div>
  );
}

export default Travel;