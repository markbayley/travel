import React from "react";
import { Input, Row, Col } from "antd";
import SearchBar from "material-ui-search-bar";

const { Search } = Input;

const SearchBox = ({ searchHandler, q, setQuery }) => {
  return (
    <>
      {/* <Row style={{ marginTop: 75, display: "flex", justifyContent: "center" }}>
        <Col style={{ width: "250px" }}>
          <Search
            placeholder="Search..."
            enterButton="Search"
            size="large"
            onSearch={(value) => searchHandler(value)}
          />
        </Col>
      </Row> */}
      <SearchBar
        style={{
          width: "280px",
          margin: "0px 40px 0px 0px",
          backgroundColor: "#efefef",
          boxShadow: "none",
       
        }}
        value={q}
        onChange={(item) => setQuery(item.toLowerCase())}
        // onSearch={(value) => searchHandler(value)}
      />
    </>
  );
};

export default SearchBox;
