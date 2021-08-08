import React from "react";
import { Row, Col, Card, Tag } from "antd";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";

const { Meta } = Card;

const UserCard = ({
  seed,
  gender,
  name,
  dob,
  key,
  picture,
  email,
  ShowDetail,
  DetailRequest,
  ActivateModal,
}) => {
  const clickHandler = () => {
    ActivateModal(true);
    DetailRequest(true);

    fetch(`https://randomuser.me/api/?i=${key}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response.results(key));
        console.log(response, "response.results - usercard");
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };

  return (
    <Col>
      <Card
        style={{ width: 200, borderRadius: '5px', padding: '0.3em' }}
        cover={
          <img
            style={{ borderRadius: "200px", border: '1px solid orange' }}
            alt={name.first}
            src={
              picture.large === "N/A"
                ? "https://placehold.it/198x264&text=Image+Not+Found"
                : picture.large
            }
          />
        }
        onClick={() => clickHandler()}
      >
        <Meta title={seed} description={false} />
        <Row>
          <Col>
            <h4>
              {name.first}, {dob.age}
            </h4>
            {/* <h5>
              {gender}, {dob.age}
            </h5> */}
            <IconButton
              style={{ position: "absolute", bottom: -3, left: 100 }}
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="secondary"
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default UserCard;
