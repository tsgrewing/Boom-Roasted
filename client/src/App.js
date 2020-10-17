import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Footer from "./components/Footer";
import Landing from "./components/Landing/index";
import Register from "./components/Authorization/Register";
import Login from "./components/Authorization/Login";
import PrivateRoute from "./components/Private-Route";
import Dashboard from "./components/Dashboard";
import Roast from "./pages/Roast";
import History from "./pages/History";
import Inventory from "./pages/Inventory";
import Social from "./pages/Social";



import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <>
        <Router>

          <main className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/inventory" component={Inventory} />
              <PrivateRoute exact path="/roast" component={Roast} />
              <PrivateRoute exact path="/social" component={Social} />
              <PrivateRoute exact path="/history" component={History} />
            </Switch>
            
          </main>

        </Router>
        <Footer />
        </>
      </Provider>
    );
  }
}
export default App;
