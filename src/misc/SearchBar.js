import SearchBar from "material-ui-search-bar"

export default function SearchComponent({ keyword, setKeyword}) {
  return (
    <SearchBar
      style={{
        margin: "20px auto",
        backgroundColor: "#efefef",
        boxShadow: "none"
      }}
      value={keyword}
      onChange={(item) => setKeyword(item.toLowerCase())}
      // onRequestSearch={null}
    />
  )
}