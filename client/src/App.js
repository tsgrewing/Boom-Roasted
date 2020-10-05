import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Splash from "./pages/Splash";
import History from "./pages/History";
import Inventory from "./pages/Inventory";
import Roast from "./pages/Roast";
import Social from "./pages/Social";
import "./assets/styles/style.css";


function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path={["/", "index"]} component={Splash}/>
        <Route exact path={"history"} component={History}/>
        <Route exact path={"inventory"} component={Inventory}/>
        <Route exact path={"roast"} component={Roast}/>
        <Route exact path={"social"} component={Social}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
