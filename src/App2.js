import React, { useState, useEffect } from "react";
import GridComponent from "./components/GridComponent";
import SearchComponent from "./components/SearchComponent";
import FilterComponent from "./components/FilterComponent";
import { Button, Container, Typography } from "@material-ui/core";
import jsonData from "./country.json";
import SimpleModal from './components/SimpleModal'

export default function App2() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState('')
	const [filteredFlags, setFilteredFlags] = useState([])
  const [filteredTravel, setFilteredTravel] = useState([]);

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setLoading(true);
    setError(null);
  

    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.Response === "False") {
          setError(response.Error);
        } else {
          console.log(response, "response -flags");
          setItems(response);
          console.log(response, "response -flags");
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, []);

    //Flags
    const searchedFlags = items.filter((item) =>
      item?.name.toLowerCase().includes(keyword)
    );

    useEffect(() => {
      setFilteredFlags(items);
    }, [items]);

    useEffect(() => {
      setFilteredFlags(searchedFlags);
    }, [setKeyword, keyword]);

    //Travel
    const searchedTravel = jsonData.filter((item) =>
      item?.country.toLowerCase().includes(keyword)
    );

    useEffect(() => {
      setFilteredTravel(jsonData);
    }, []);

    useEffect(() => {
      setFilteredTravel(searchedTravel);
    }, [setKeyword, keyword]);


    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div
          className="sidebar"
          style={{
            position: "relative",
            overflow: "auto",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Container maxWidth="lg" style={{ padding: 40 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  style={{ marginTop: 10 }}
                >
                  Flags of the World
                </Typography>
                {/* {windowSize.width >= 900 && ( */}
								<Button
									style={{
										marginTop: 10,
										fontSize: 12,
										marginLeft: 10,
										padding: '5px 10px'
									}}
									variant="contained"
									disableElevation
									onClick={() => setOpen(!open)}>
									{open ? 'hide map' : 'open map'}
								</Button>
							{/* )} */}
              </div>

              <FilterComponent
                items={items}
                setFilteredFlags={setFilteredFlags}
              />
            </div>
            <SearchComponent keyword={keyword} setKeyword={setKeyword} />
            <GridComponent filteredFlags={filteredFlags} />
          </Container>
        </div>

        {/* map section */}
        {open && (
				<div
					style={{
						position: 'relative',
						top: 0,
						right: 0,
						bottom: 0,
						width: '100%',
						height: '100vh'
					}}>
					{/* <SimpleModal image={image} open={open} handleClose={handleClose} /> */}
				</div>
			)}
      </div>
    );
}



