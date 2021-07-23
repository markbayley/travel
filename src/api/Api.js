import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Alert,
  Modal,
  Typography,
} from "antd";
import "antd/dist/antd.css";
import SearchBox from "../components/SearchBox";
import CardBox from "../components/CardBox";
import MovieDetail from "../components/MovieDetail";
import Loader from "../components/Loader";


const API_KEY = "ce762116";
const { Header, Content, Footer } = Layout;

const TextTitle = Typography.Title;


function Api() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState('batman');
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.Response === "False") {
          setError(response.Error);
        } else {
          setData(response.Search);
        }

        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, [q]);

  return (
    <div className="App">
        <SearchBox searchHandler={setQuery} />
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <br />

            <Row gutter={16} type="flex" justify="center">
              {loading && <Loader />}

              {error !== null && (
                <div style={{ margin: "20px 0" }}>
                  <Alert message={error} type="error" />
                </div>
              )}

              {data !== null &&
                data.length > 0 &&
                data.map((result, index) => (
                  <CardBox
                    ShowDetail={setShowDetail}
                    DetailRequest={setDetailRequest}
                    ActivateModal={setActivateModal}
                    key={index}
                    {...result}
                  />
                ))}
            </Row>
          </div>
          <Modal
            title="Detail"
            centered
            visible={activateModal}
            onCancel={() => setActivateModal(false)}
            footer={null}
            width={800}
          >
            {detailRequest === false ? <MovieDetail {...detail} /> : <Loader />}
          </Modal>
        </Content>
        <Footer style={{ textAlign: "center" }}>OMDB Movies ©2019</Footer>

    </div>
  );
}

export default Api;
