import React, { useEffect, useState } from "react";
import { Layout, Row, Alert, Modal, Button } from "antd";
import { Grid, Typography } from "@material-ui/core";
import SearchBox from "../misc/SearchBox";
import FlagsCard from "../misc/FlagsCard";
import FlagsDetail from "../misc/FlagsDetail";
import Loader from "../components/Loader";
import "../api/FetchApi.scss";
import FilterComponent from "../misc/FilterComponent";
import TravelCard from "../misc/TravelCard";
import jsonData from "./../country.json";

function Flags() {
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
    fetch(`https://restcountries.com/v2/all`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.Response === "False") {
          setError(response.Error);
        } else {
          console.log(response, "response -flags");
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
          parent.children = [];
        }
        parent.children.push(child);
      }
    }
  });

  console.log(searchedFlags, 'searchedFlags')

  return (
    <div className="wrapper">
      <FilterComponent items={items} setFilteredFlags={setFilteredFlags} />
      <SearchBox searchHandler={setQuery} q={q} setQuery={setQuery} />
      <ul className="card-grid">
        {loading && <Loader />}
        {filteredFlags !== null &&
          filteredFlags.length > 0 &&
          filteredFlags.map((items) => {
            return (
              <>
                <FlagsCard
                  ShowDetail={setShowDetail}
                  DetailRequest={setDetailRequest}
                  ActivateModal={setActivateModal}
                  // key={index}
                  {...items}
                  {...items.borders}
                />
                {/* <div>{items.borders[0]}</div> */}
                {/* <div>
                  {items.children.map((items) => {
                    return (
                      <div >
                            {items.status}
                      </div>
                    );
                  })}
                </div> */}
                {/* 
                 <div>
                  {items.borders.map((border, i) => {
                    return (
                      <div key={i}>
                        <p> {border}</p>
                      </div>
                    );
                  })}
                </div> */}
              </>
            );
          })}
      </ul>
      <Modal
        title={detail.name + " " + "(" + detail.region + ")"}
        centered
        visible={activateModal}
        onCancel={() => setActivateModal(false)}
        footer={null}
        width={800}
      >
        {detailRequest === false ? <FlagsDetail {...detail} /> : <Loader />}
      </Modal>
    </div>
  );
}

export default Flags;
