import SearchBar from "material-ui-search-bar";

export default function SearchComponent({ keyword, setKeyword }) {
  return (
    <SearchBar
      style={{
        width: "280px",
        margin: "20px 0",
        backgroundColor: "#efefef",
        boxShadow: "none",
      }}
      value={keyword}
      onChange={(item) => setKeyword(item.toLowerCase())}
      // onSearch={(value) => searchHandler(value)}
    />
  );
}
