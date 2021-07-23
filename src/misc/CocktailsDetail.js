import React from "react";
import { Row, Col, Tag, Typography } from "antd";

const TextTitle = Typography.Title;

const CocktailsDetail = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  strInstructions,
  strTags,
  strGlass
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
      <Col span={13}>
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
      </Col>
    </Row>
  );
};

export default CocktailsDetail;
