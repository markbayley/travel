import React from "react";
import { Row, Col, Tag, Typography } from "antd";

const TextTitle = Typography.Title;

const UserDetail = ({
  username,
  picture,
  name,
  gender,
  dob,
}) => { 
  return (
   
    <Row>
      <Col span={11}>
        <img
          src={
            picture.large === "N/A"
              ? "https://placehold.it/198x264&text=Image+Not+Found"
              : picture.large
          }
          alt={name.first}
        />
      </Col>
      <Col span={13}>
        <Row>
          <Col span={21}>
            <TextTitle level={4}>{name.first}</TextTitle>
          </Col>
          <Col span={3} style={{ textAlign: "right" }}>
            <TextTitle level={4}>
              <span style={{ color: "#41A8F8" }}>{gender}</span>
            </TextTitle>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Tag>{name.first}</Tag>
            <Tag>{gender}</Tag>
            <Tag>{dob.age}</Tag>
          </Col>
        </Row>
        <Row>
          <Col>{username}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default UserDetail;
