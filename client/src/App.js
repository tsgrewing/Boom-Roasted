import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import store from "./store";

import Nav from "./components/Layout/Nav";
import Landing from "./components/Layout/Landing";
import Login from "./components/Authorization/Login";
import Register from "./components/Authorization/Register";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Landing} />
          <Route exact path="Register" component={Register} />
          <Route exact path="Login" component={Login} />
          <Landing />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
