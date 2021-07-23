import React, { useEffect, useState } from "react";
import { Layout, Row, Alert, Modal } from "antd";
import "antd/dist/antd.css";
import SearchBox from "../components/SearchBox";
// import CocktailsCard from "../components/CocktailsCard";
// import CocktailsDetail from "../components/CocktailsDetail";
import Loader from "../components/Loader";
import { Col, Card, Tag } from "antd";
import { Typography } from "antd";

const TextTitle = Typography.Title;

const CocktailsDetail = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  strInstructions,
  strTags,
  strGlass,
}) => {
  return (
    <Row>
      <Col span={11}>
        <img
          src={
            strDrinkThumb === "N/A"
              ? "https://placehold.it/198x264&text=Image+Not+Found"
              : strDrinkThumb
          }
          alt={strDrink}
        />
      </Col>

      {/* <Col span={13}>
        <Row>
          <Col span={21}>
            <TextTitle level={4}>{strDrink}</TextTitle>
          </Col>
          <Col span={3} style={{ textAlign: "right" }}>
            <TextTitle level={4}>
              <span style={{ color: "#41A8F8" }}>{idDrink}</span>
            </TextTitle>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Tag>{strTags}</Tag>
            <Tag>{strGlass}</Tag>
          </Col>
        </Row>
        <Row>
          <Col>{strInstructions}</Col>
        </Row>
      </Col> */}
    </Row>
  );
};

const { Meta } = Card;

export const CocktailsCard = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  strIBA,
  strInstructions,
  strGlass,
  strIngredient1,
  strIngredient2,
  strIngredient3,
  strIngredient4,
  strIngredient5,
  ActivateModal,
  DetailRequest,
  ShowDetail,
}) => {
  const clickHandler = () => {
    ActivateModal(true);
    DetailRequest(true);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response.drinks[0]);
        console.log(response, "response - cocktailcard");
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };

  return (
    <li onClick={() => clickHandler()}>
      <article className="card" key={idDrink}>
        <div className="card-image">
          <img
            style={{ borderRadius: "5px", height: 'auto' }}
            alt={strDrink}
            src={
              strDrinkThumb === "N/A"
                ? "https://placehold.it/198x264&text=Image+Not+Found"
                : strDrinkThumb
            }
          />
        </div>
        <div className="card-content" style={{ minHeight: "90px" }}>
          <h3 className="card-name">{strDrink}</h3>
          <ol className="card-list">
            <ol className="card-list">
              <li style={{ padding: "0px 15px" }}>
                <em>{strIngredient1}</em> <em>{strIngredient2}</em>,{" "}
                <em>{strIngredient3}</em>, <em>{strIngredient4}</em>{" "}
                {/* <em>{strIngredient5}</em> */}
              </li>
            </ol>
          </ol>
        </div>
      </article>
    </li>
  );
};

const { Content, Footer } = Layout;

function Cocktails() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState("v");
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${q}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.Response === "False") {
          setError(response.Error);
        } else {
          console.log(response, "response -cocktails");
          setData(response.drinks);
          console.log(response.drinks, "response.drinks -cocktails");
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
      <SearchBox searchHandler={setQuery} q={q} setQuery={setQuery} />
      <Content>
        <ul className="card-grid">
          {loading && <Loader />}

          {error !== null && (
            <div style={{ margin: "20px 0" }}>
              <Alert message={error} type="error" />
            </div>
          )}

          {data !== null &&
            data.length > 0 &&
            data.map((result, index) => (
              <CocktailsCard
                ShowDetail={setShowDetail}
                DetailRequest={setDetailRequest}
                ActivateModal={setActivateModal}
                key={index}
                {...result}
              />
            ))}
        </ul>

        <Modal
          title={detail.strDrink}
          centered
          visible={activateModal}
          onCancel={() => setActivateModal(false)}
          footer={null}
          width={750}
          height={750}
        >
          {detailRequest === false ? (
            <CocktailsDetail {...detail} />
          ) : (
            <Loader />
          )}
        </Modal>
      </Content>
      <Footer style={{ textAlign: "center" }}>Cocktails DB</Footer>
    </div>
  );
}

export default Cocktails;
