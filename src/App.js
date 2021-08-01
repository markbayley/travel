import React from "react"
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
import Travel from './Travel'

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="">
      <Router>  
        {/* {user ? <AppBar /> : <AppBarNoAuth />} */}
        <Switch>
          <Route path="/travel" component={Travel} />
          <Route path="/contact" component={Contact} />
        </Switch>
      
      </Router>
    </div>
  );
}
export default App
