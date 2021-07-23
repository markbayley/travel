import React from "react";
import { Row, Col, Card, Tag } from "antd";

const { Meta } = Card;

const CocktailsCard = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  ActivateModal,
  DetailRequest,
  ShowDetail
}) => {
  const clickHandler = () => {

    ActivateModal(true);
    DetailRequest(true);

    fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response.drinks);
        console.log(response, "response - cocktailcard");
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };

  return (
    <Col >
        <Card
          style={{ width: 250, marginLeft: "1em" }}
          cover={
            <img
              style={{ borderRadius: "5px" }}
              alt={strDrink}
              src={
                strDrinkThumb === "N/A"
                  ? "https://placehold.it/198x264&text=Image+Not+Found"
                  : strDrinkThumb
              }
            />
          }
          onClick={() => clickHandler()}
        >
          <Meta title={strDrink} description={false} />
          <Row>
            <Col>
            
            </Col>
          </Row>
        </Card>
    </Col>
  );
}

export default CocktailsCard;
