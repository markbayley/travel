import React, { useEffect, useState } from "react";
// import { Layout, Row, Alert, Modal, Button } from "antd";
import { Grid, Typography, Modal } from "@material-ui/core";
import SearchBox from "./components/SearchBox";
import FlagsCard from "./components/FlagsCard";
import FlagsDetail from "./components/FlagsDetail";
import Loader from "./components/Loader";
import "./api/FetchApi.scss";
import FilterComponent from "./components/FilterComponent";
import TravelCard from "./components/TravelCard";

function Template() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState("");
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [filteredFlags, setFilteredFlags] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://restcountries.eu/rest/v2/all`)
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
  }, [q]);

  const searchedFlags = items.filter((item) =>
    item?.name.toLowerCase().includes(q)
  );

  useEffect(() => {
    setFilteredFlags(items);
  }, [items]);

  useEffect(() => {
    setFilteredFlags(searchedFlags);
  }, [setQuery, q]);

  return (
    <div className="wrapper">
      <FilterComponent items={items} setFilteredFlags={setFilteredFlags} />
      <SearchBox searchHandler={setQuery} q={q} setQuery={setQuery} />
      <ul className="card-grid">
        {loading && <Loader />}
        {filteredFlags !== null &&
          filteredFlags.length > 0 &&
          filteredFlags.map((result, index) => (
            <FlagsCard
              ShowDetail={setShowDetail}
              DetailRequest={setDetailRequest}
              ActivateModal={setActivateModal}
              key={index}
              {...result}
            />
          ))}
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

export default Template;
