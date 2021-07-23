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
import Action from './components/Action'
import Travel from './pages/Travel'


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="">
      <Router>
        {user ? <AppBar /> : <AppBarNoAuth />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/charts" component={Charts} />
          <Route path="/flags" component={Flags} />
          <Route path="/movies" component={Movies} />
          <Route path="/cocktails" component={Cocktails} />
          <Route path="/users" component={Users} />
          <Route path="/travel" component={Travel} />

          <Route path="/contact" component={Contact} />
        </Switch>
        <Action />
      </Router>
    </div>
  );
}
export default App
