import { useState, useEffect } from "react";
import "../api/FetchApi.scss";
import jsonData from "../country.json";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Loader from "../components/Loader";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import SideBar from "../components/SideBar";
import ChartBar from "../components/ChartBar";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//Travel
const Fetch = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState([
    // "capital",
    "country",
    "population",
    "status",
    "continent",
  ]);
  const [filteredRegion, setFilteredRegion] = useState("Europe");
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [filteredStatus, setFilteredStatus] = useState("Open");
  const [filteredRisk, setFilteredRisk] = useState("100000000");

  useEffect(() => {
    fetch("https://corona.lmao.ninja/v2/countries")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  jsonData.map((child) => {
    for (let parent of items) {
      if (parent.country === child.country) {
        if (!parent.children) {
          parent.travel = [];
          parent.status = [];
        }
        parent.travel.push(child.image);
        parent.status.push(child.status);
      }
    }
  });

  console.log(items, "items");

  function search(items) {
    return items.filter((item) => {
      if (
        item.population >= filteredPopulation &&
        filteredRegion.includes(item.continent) &&
        filteredStatus.includes(item.status)
        // item.activePerOneMillion <= filteredRisk
      ) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  console.log(
    filteredRegion,
    filteredPopulation,
    filteredStatus,
    filteredRisk,
    "searchParam",
    search(items)
  );

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div>
        <div className="wrapper">
          <div
            className="search-wrapper"
            style={{ zIndex: 1, marginBottom: "1em" }}
          >
            <Search q={q} setQ={setQ} />
            <FilterRegion setFilteredRegion={setFilteredRegion} />
            <FilterPopulation setFilteredPopulation={setFilteredPopulation} />
            <FilterStatus setFilteredStatus={setFilteredStatus} />
            {/* <FilterRisk setFilteredRisk={setFilteredRisk} /> */}

            <SideBar
              filteredFlags={search(items)}
              // ShowDetail={setShowDetail}
              // DetailRequest={setDetailRequest}
              // ActivateModal={setActivateModal}
              items={items}
              setFilteredFlags={setItems}
            />
            {/* <ChartBar
              filteredFlags={search(items)}
              // ShowDetail={setShowDetail}
              // DetailRequest={setDetailRequest}
              // ActivateModal={setActivateModal}
              items={items}
              setFilteredFlags={setItems}
            /> */}
          </div>
          <LoadFlags search={search} items={items} />
        </div>
      </div>
    );
  }
};

export default Fetch;

//Filter
const FilterRegion = ({ setFilteredRegion }) => {
  return (
    <div className="select">
      <select
        onChange={(e) => {
          setFilteredRegion(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Region"
      >
        <option value="Europe">Europe</option>
        <option
          value={[
            "Europe",
            "Asia",
            "South America",
            "North America",
            "Africa",
            "Australia-Oceania",
          ]}
        >
          Any Region
        </option>

        <option value="Africa">Africa</option>
        <option value="North America">Nth America</option>
        <option value="South America">Sth America</option>
        <option value="Asia">Asia</option>
        <option value="Australia-Oceania">Oceania</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

const FilterPopulation = ({ setFilteredPopulation }) => {
  return (
    <div className="select">
      <select
        onChange={(e) => {
          setFilteredPopulation(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Population"
      >
        <option value={0}>Size</option>
        <option value={10000000}>10m+</option>
        <option value={25000000}>25m+</option>
        <option value={50000000}>50m+</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

export const FilterStatus = ({ setFilteredStatus }) => {
  return (
    <div className="select" style={{ marginLeft: "0px" }}>
      <select
        onChange={(e) => {
          setFilteredStatus(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Status"
      >
        <option value="Open">Open</option>
        <option value={["Closed", "Restricted", "Open"]}>Status</option>

        <option value="Restricted">Restricted</option>
        <option value="Closed">Closed</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

const FilterRisk = ({ setFilteredRisk }) => {
  return (
    <div className="select">
      <select
        onChange={(e) => {
          setFilteredRisk(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Covid Risk"
      >
        <option value="1000000">Any Risk</option>
        <option value="100">Low</option>
        <option value="1000">Medium</option>
        <option value="10000">High</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

//ItemsList (map)
const LoadFlags = ({ search, items }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleOpen = (index) => {
    setSelectedItem(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("close");
  };

  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 345,
      transition: "all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)",
      "&:hover": {
        transform: "scale(1.05)",
      },
      textTransform: "capitalize",
    },
    media: {
      height: 200,
      paddingTop: "56.25%", // 16:9
      position: "relative",
      cursor: "pointer",
    },
    avatar: {
      border: "1px solid cyan",
    },
    icon: {
      color: "#fff",
      position: "absolute",
      top: 0,
      right: 0,
    },
    title: {
      maxWidth: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <ul className="card-grid">
      {search(items).map((item, i) => (
        // <li onClick={() => handleOpen(index)}>
        //   <article className="card" key={item.index}>
        //     <div className="card-image">
        //       <img src={item.travel} alt="" />
        //     </div>
        //     <div className="card-content">
        //       <h3 className="card-name">{item.country}</h3>
        //       <ol className="card-list">
        //         <li>
        //           Population:{" "}
        //           <span>{(item.population / 1000000).toFixed(2) + "m"}</span>
        //         </li>
        //         <li>
        //           Region: <span>{item.continent}</span>
        //         </li>
        //         <li>
        //           Covid Risk: <span>{item.activePerOneMillion.toFixed(0)}</span>
        //         </li>
        //         <li>
        //           Status: <span>{item.status}</span>
        //         </li>
        //       </ol>
        //     </div>
        //   </article>
        // </li>
        <div key={i} style={{ zIndex: 0 }}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={item.travel}
              // onClick={() => clickHandler(item)}
            >
              <CardActions disableSpacing>
                <Tooltip title="Travel Status" placement="left">
                  <IconButton className={classes.icon} aria-label="more">
                    {/* <MoreVertIcon /> */}
                    <Badge
                      style={{ marginRight: 20, marginTop: 7, zIndex: 0 }}
                      badgeContent={
                        item.status == "Restricted" ? "Limited" : item.status
                      }
                      color="error"
                    ></Badge>
                  </IconButton>
                </Tooltip>
              </CardActions>
            </CardMedia>
            <CardHeader
              avatar={
                <Avatar aria-label="flag" className={classes.avatar}>
                  <img src={item.countryInfo.flag} alt="flag" width="70px" />
                </Avatar>
              }
              action={
                <>
                  <Tooltip title="COVID Risk" placement="top">
                    <IconButton
                      // onClick={() => handleFavouritesClick(item)}
                      color="error"
                    ></IconButton>
                  </Tooltip>
                  <Tooltip title="Favourite?" placement="top">
                    <IconButton
                      // onClick={() => handleFavouritesClick(item)}
                      color="secondary"
                    >
                      {/* <Badge badgeContent={count} color="secondary"> */}
                      {/* <FavouriteComponent /> */}
                      <FavoriteBorderIcon />

                      {/* <Badge
                            color="secondary"
                            badgeContent={item.status}
                          ></Badge> */}
                      {/* </Badge> */}
                    </IconButton>
                  </Tooltip>
                </>
              }
              title={
                item.country
                // + item.activePerOneMillion > 1000
                //   ? "High"
                //   : item.activePerOneMillion > 100
                //   ? "Med"
                //   : "Low"
              }
              className={classes.title}
              subheader={item.continent}
            ></CardHeader>
          </Card>
        </div>
      ))}
      {/* {open && (
        <Modal
          selectedItem={selectedItem}
          onClose={handleClose}
          {...items}
        ></Modal>
      )} */}
    </ul>
  );
};

// const Modal = ({ selectedItem, onClose, country }) => {
//   return (
//     <div>
//       <button
//         onClick={onClose}
//         style={{ zIndex: 5, position: "absolute", right: 10 }}
//       >
//         <h3 className="card-name">{country}</h3>
//       </button>
//     </div>
//   );
// };

//SearchBox
const Search = ({ q, setQ }) => {
  return (
    <label htmlFor="search-form">
      <input
        type="search"
        name="search-form"
        id="search-form"
        className="search-input"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <span className="sr-only">Search...</span>
    </label>
  );
};
