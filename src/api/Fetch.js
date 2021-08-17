import { useState, useEffect } from "react";
import "./FetchApi.scss";
import Button from "@material-ui/core/Button";
import Action from "../components/Action";
import jsonData from "../country.json";

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
  const [filteredPopulation, setFilteredPopulation] = useState("0");
  const [filteredStatus, setFilteredStatus] = useState("Open");
  const [filteredRisk, setFilteredRisk] = useState("1000000");

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
        filteredStatus.includes(item.status) &&
        item.activePerOneMillion <= filteredRisk
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
      <>
        <Action />
        <div className="wrapper">
          <div className="search-wrapper">
            <Search q={q} setQ={setQ} />
            <FilterRegion setFilteredRegion={setFilteredRegion} />
            <FilterPopulation setFilteredPopulation={setFilteredPopulation} />
            <FilterStatus setFilteredStatus={setFilteredStatus} />
            <FilterRisk setFilteredRisk={setFilteredRisk} />
          </div>
          <LoadFlags search={search} items={items} />
        </div>
      </>
    );
  }
};

export default Fetch;

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
        <option value="Africa">Africa</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Asia">Asia</option>
        <option value="Australia-Oceania">Oceania</option>
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
          Any Country
        </option>
        {/* <option value="Region">Region</option> */}
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
        {/* <option value="1">Population</option> */}
        {/* <option value="100000000">100m+</option> */}
        <option value="0">Any Size</option>
        <option value="5000000">Small</option>
        <option value="10000000">Medium</option>
        <option value="50000000">Large</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

const FilterStatus = ({ setFilteredStatus }) => {
  return (
    <div className="select">
      <select
        onChange={(e) => {
          setFilteredStatus(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Status"
      >
        <option value="Open">Open</option>
        <option value="Restricted">Restricted</option>
        <option value="Closed">Closed</option>
        <option value={["Closed", "Restricted", "Open"]}>Any Status</option>
        {/* <option value="Status">Status</option> */}
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

const LoadFlags = ({ search, items, index }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleOpen = (index) => {
    setSelectedItem(index);
    setOpen(true);
  };

  return (
    <ul className="card-grid">
      {search(items).map((item) => (
        <li onClick={() => handleOpen(index)}>
          <article className="card" key={item.id}>
            <div className="card-image">
              <img src={item.travel} alt="" />
            </div>
            <div className="card-content">
              <h3 className="card-name">{item.country}</h3>
              <ol className="card-list">
                <li>
                  Population:{" "}
                  <span>{(item.population / 1000000).toFixed(2) + "m"}</span>
                </li>
                <li>
                  Region: <span>{item.continent}</span>
                </li>
                <li>
                  Covid Risk: <span>{item.activePerOneMillion.toFixed(0)}</span>
                </li>
                <li>
                  Status: <span>{item.status}</span>
                </li>
              </ol>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

const Search = ({ q, setQ }) => {
  return (
    <label htmlFor="search-form">
      <input
        type="search"
        name="search-form"
        id="search-form"
        className="search-input"
        placeholder="Search countries..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <span className="sr-only">Search countries here</span>
    </label>
  );
};
