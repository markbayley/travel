import React, { useEffect, useState } from "react";
import { Layout, Row, Alert, Modal } from "antd";
import "antd/dist/antd.css";
import TravelCard from "../components/TravelCard";
import TravelDetail from "../components/MovieDetail";
import Loader from "../components/Loader";
import SearchComponent from "../components/SearchComponent";
import FilterTravel from "../components/FilterTravel";
import jsonData from "../country.json";

const { Content, Footer } = Layout;

function Travel() {
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [filteredTravel, setFilteredTravel] = useState([]);

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   setData(null);

  //   fetch(`https://mocki.io/v1/97754a55-46e5-4f05-b1fe-918e09adf16f`)
  //     .then((resp) => resp)
  //     .then((resp) => resp.json())
  //     .then((response) => {
  //       if (response.Response === "False") {
  //         setError(response.Error);
  //       } else {
  //         console.log(response, "response - travel");
  //         setData(response);
  //         console.log(response, "response - travel");
  //       }
  //       setLoading(false);
  //     })
  //     .catch(({ message }) => {
  //       setError(message);
  //       setLoading(false);
  //     });
  // }, []);

  //Travel
  const searchedTravel = jsonData.filter((item) =>
    item?.country.toLowerCase().includes(keyword)
  );

  useEffect(() => {
    setFilteredTravel(jsonData);
  }, []);

  useEffect(() => {
    setFilteredTravel(searchedTravel);
  }, [setKeyword, keyword]);

  return (
    <div className="wrapper">
      <FilterTravel jsonData={jsonData} setFilteredTravel={setFilteredTravel} />
      <SearchComponent keyword={keyword} setKeyword={setKeyword} />
      <Content>
        <br />

        <div className="card-grid">
          {filteredTravel !== null &&
            filteredTravel.length > 0 &&
            filteredTravel.map((items, index) => (
              <TravelCard
                ShowDetail={setShowDetail}
                DetailRequest={setDetailRequest}
                ActivateModal={setActivateModal}
                key={index}
                {...items}
                // filteredTravel={filteredTravel}
              />
            ))}
        </div>

        <Modal
          title="Detail"
          centered
          visible={activateModal}
          onCancel={() => setActivateModal(false)}
          footer={null}
          width={800}
        
        >
          {detailRequest === false ? <TravelDetail {...detail} /> : <Loader />}
        </Modal>
      </Content>
      <Footer style={{ textAlign: "center" }}>Travel ©2019</Footer>
    </div>
  );
}

export default Travel;
