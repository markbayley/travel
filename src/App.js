import React, { useState } from "react"
import AppBar from "./components/AppBar"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./components/ChatBox"
import AppBarNoAuth from "./components/AppBarNoAuth"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Charts from "./pages/Charts"
import Flags from "./pages/Flags"
import Movies from "./pages/Movies"
import Cocktails from "./pages/Cocktails"
import Users from "./pages/Users"
import Contact from "./pages/Contact"
import Travel from './components/Travel'
import Map from './components/Map'
import Action from "./components/Action"

function App() {
  const [user] = useAuthState(auth);

  //  const [favourites, setFavourites] = useState([]);
  //  const [searchValue, setSearchValue] = useState("");

  //   const [show, setShow] = useState(false);
  //   const toggleShow = () => setShow((p) => !p);


  return (
    <div className="">
    
      <Router>
        {/* {user ? (
          <>
            {" "}
            <AppBar
              searchHandler={setSearchValue}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              favourites={favourites}
              toggleShow={toggleShow}
            />{" "}
            <Action />{" "}
          </>
        ) : (
          <AppBarNoAuth
            searchHandler={setSearchValue}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )} */}

        {/* {user ? <AppBar /> : <AppBarNoAuth />} */}
        <Switch>
          <Route
            path="/travel"
            component={Travel}
            // favourites={favourites}
            // setFavourites={setFavourites}
            // searchValue={searchValue}
            // setSearchValue={setSearchValue}
            // toggleShow={toggleShow}
            // show={show}
            // setShow={setShow}
          />
          {/* <Route path="/contact" component={Contact} /> */}
          {/* <Route path="/map" component={Map} /> */}
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}
export default App
