import React from "react";
import { Row, Col, Tag, Typography } from "antd";

const TextTitle = Typography.Title;

const TravelDetail = ({ image, status, country, description }) => {
  return (
    <Row>
      <Col span={11}>
        <img
          src={
          image === "N/A"
              ? "https://placehold.it/198x264&text=Image+Not+Found"
              : image
          }
          alt={country}
        />
      </Col>
      <Col span={13}>
        <Row>
          <Col span={21}>
            <TextTitle level={4}>{country}</TextTitle>
          </Col>
          <Col span={3} style={{ textAlign: "right" }}>
            <TextTitle level={4}>
              <span style={{ color: "#41A8F8" }}>{status}</span>
            </TextTitle>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Tag>{description}</Tag>
       
          </Col>
        </Row>
        <Row>
          <Col>{status}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TravelDetail;
