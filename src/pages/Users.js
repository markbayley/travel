import React, { useEffect, useState } from "react";
import { Layout, Row, Alert, Modal } from "antd";
import "antd/dist/antd.css";
import SearchBox from "../components/SearchBox";
import UserCard from "../components/UserCard";
import UserDetail from "../components/UserDetail";
import Loader from "../components/Loader";

const { Content, Footer } = Layout;

function Users() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState("bob");
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`https://randomuser.me/api/?results=50`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.Response === "False") {
          setError(response.Error);
        } else {
          console.log(response, "response - users");
          setData(response.results);
          console.log(response.results, "response.results - users");
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, [q]);

  return (
    <div className="wrapper">
      <Content >
          <SearchBox searchHandler={setQuery} />
          <br />
          <Row>
            {loading && <Loader />}
            {error !== null && (
              <div style={{ margin: "20px 0" }}>
                <Alert message={error} type="error" />
              </div>
            )}

            {data !== null &&
              data.length > 0 &&
              data.map((results, index) => (
                <UserCard
                  ShowDetail={setShowDetail}
                  DetailRequest={setDetailRequest}
                  ActivateModal={setActivateModal}
                  key={index}
                  {...results}
                />
              ))}
          </Row>
        <Modal
          title="Detail"
          centered
          visible={activateModal}
          onCancel={() => setActivateModal(false)}
          footer={null}
          width={800}
        >
          {detailRequest === false ? <UserDetail {...detail} /> : <Loader />}
        </Modal>
      </Content>
      <Footer style={{ textAlign: "center" }}>Users ©2019</Footer>
    </div>
  );
}

export default Users;
