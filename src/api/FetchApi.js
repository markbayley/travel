import { useState, useEffect } from "react";
import "./FetchApi.scss";
import Button from "@material-ui/core/Button";
// import Modal from '@material-ui/core/Modal';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Action from "../components/Action";

// import { Modal } from "react-bootstrap";

const FilterRegion = ({ setFilterParam }) => {
  return (
    <div className="select">
      <select
        /* 
                // here we create a basic select input
                // we set the value to the selected value 
                // and update the setC() state every time onChange is called
                    */
        onChange={(e) => {
          setFilterParam(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Countries"
      >
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="All">All</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

const FilterPopulation = ({ setFilterParam2 }) => {
  return (
    <div className="select">
      <select
        /* 
                // here we create a basic select input
                // we set the value to the selected value 
                // and update the setC() state every time onChange is called
                    */
        onChange={(e) => {
          setFilterParam2(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Countries"
      >
        <option value="1">Population</option>
        <option value="100000000">100m+</option>
        <option value="50000000">50m+</option>
        <option value="10000000">10m+</option>
        <option value="5000000">5m+</option>
        <option value="1000000">1m+</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

const LoadFlags = ({ search, items, index }) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const [selectedItem, setSelectedItem] = useState("");

  const handleOpen = (index) => {
    setSelectedItem(index);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <ul className="card-grid">
      {search(items).map((item) => (
          <li onClick={() => handleOpen(index)}>
            <article className="card" key={item.id}>
              <div className="card-image">
                <img src={item.flag} alt="" />
              </div>
              <div className="card-content">
                <h3 className="card-name">{item.name}</h3>
                <ol className="card-list">
                  <li>
                    Population:{" "}
                    <span>{(item.population / 1000000).toFixed(2) + "m"}</span>
                  </li>
                  <li>
                    Region: <span>{item.region}</span>
                  </li>
                  <li>
                    Capital: <span>{item.capital}</span>
                  </li>
                </ol>
              </div>
            </article>
          </li>
      ))}
    </ul>
    // {open && <Detail index={`${selectedItem}`} onClose={handleClose} />} */}
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
        /* 
                            // set the value of our useState e
                            //  anytime the user types in the search box
                            */
        onChange={(e) => setQ(e.target.value)}
      />
      <span className="sr-only">Search countries here</span>
    </label>
  );
};

const FetchApi = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  //     set search query to empty string
  const [q, setQ] = useState("");
  //     set search parameters
  //     we only what to search countries by capital and name
  //     this list can be longer if you want
  //     you can search countries even by their population
  // just add it to this array
  const [searchParam] = useState(["capital", "name", "population"]);
  //     add a default value to be used by our select element
  const [filterParam, setFilterParam] = useState(["Europe"]);
  const [filterParam2, setFilterParam2] = useState([""]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  /* here we create a function 
    //     we filter the items
    // use array property .some() to return an item even if other requirements didn't match
    */
  function search(items) {
    return items.filter((item) => {
      /* 
            // in here we check if our region is equal to our c state
            // if it's equal to then only return the items that match
            // if not return All the countries
            */
      if (item.population >= filterParam2 && item.region == filterParam) {
        console.log(item, "hi");
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
      if (item.region == filterParam && item.population >= filterParam2) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

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
            <FilterRegion setFilterParam={setFilterParam} />
            <FilterPopulation setFilterParam2={setFilterParam2} />
          </div>
          <LoadFlags search={search} items={items} />
        </div>
      </>
    );
  }
};

export default FetchApi;
