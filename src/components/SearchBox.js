import React from "react";
import SearchBar from "material-ui-search-bar";

const SearchBox = ({ setSearchValue, value }) => {
  return (
    <SearchBar
      style={{
        width: "280px",
        backgroundColor: "#efefef",
        boxShadow: "none",
      }}
      value={value}
      onChange={(item) => setSearchValue(item.toLowerCase())}
    />
  );
};

export default SearchBox;
