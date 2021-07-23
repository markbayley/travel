import React from "react";
import { Row, Col, Card, Tag } from "antd";

const { Meta } = Card;

const TravelCard = ({
  image,
  status,
  country,
  description,

  ShowDetail,
  DetailRequest,
  ActivateModal,
}) => {
  const clickHandler = () => {
    // Display Modal and Loading Icon
    ActivateModal(true);
    DetailRequest(true);

    fetch(`https://mocki.io/v1/97754a55-46e5-4f05-b1fe-918e09adf16f/?i=${country}`
    )
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response);
        console.log(response, "response - travelcard");
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };

  return (
    <Card
      style={{
        width: "230px",
        height: "300px",
        objectFit: "cover",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px"
      }}
      cover={
        <img
          style={{
            height: "200px",
          }}
          alt={country}
          src={
            image === "N/A"
              ? "https://placehold.it/198x264&text=Image+Not+Found"
              : image
          }
        />
      }
      onClick={() => clickHandler()}
    >
      <Meta title={country} description={false} />
      <h4 style={{ color: "grey" }}>
        {status}: {description}
      </h4>
    </Card>
  );
};

export default TravelCard;
