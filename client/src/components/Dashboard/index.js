import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import RecentTable from "../RecentTable";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

import "./style.css"
import { get } from "mongoose";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inventory: [],
        history: [],
        recentMessages: []
    }
    this.getInventory = this.getInventory.bind(this);
    this.getRecentMsgs = this.getRecentMsgs.bind(this);
    this.getHistory = this.getHistory.bind(this);
  };

  // Scrape daily coffee news for headlines
  getNews = async() => {
    axios.get(`https://dailycoffeenews.com/`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {console.log(err)})
  }

  // Load the  most recent messages from the database
  getRecentMsgs= async()=> {
    const msgs = await axios.get(`/api/messages/`);
    this.setState({recentMessages: (msgs.data.slice(0, 5))})
  };

  // load the most recent roasts from the database
  getHistory = async () => {
    const userHistory = this.props.auth.user.id
    const roast = await axios.get(`/api/roasts/user/${userHistory}`);
    this.setState({history: (roast.data.slice(0, 5))})
  };

  // load the coffees with the highest inventory from the database
  getInventory = async () => {
    const userInv = this.props.auth.user.id
    const green = await axios.get(`/api/coffees/${userInv}`);
    this.setState({inventory: (green.data.slice(0,5))})
  }

  // call functions to get recent roasts/messages and inventory
  componentDidMount(){
    this.getHistory();
    this.getInventory();
    this.getRecentMsgs();
    this.getNews()
  }

  render() {
    const { user } = this.props.auth;
    return (
      <>
      <Navbar />
        <div className="row dashRow valign-wrapper">
          <div className="col s12 center-align">
            {this.state.inventory[0] 
            ?
            <h2 >
              <b>Welcome, {user.name.split(" ")[0]}, you're ready to roast</b>
            </h2>
            :
            <h2 >
              <b>Welcome, {user.name.split(" ")[0]}, <Link className="addInventory" to="/inventory">add some coffee to your inventory to start roasting.</Link></b>
            </h2>
            }
            <br></br>
            <br></br>
            <div className="row center-align recentTableRow">
            <RecentTable 
            title="Top Inventory"
            contents={this.state.inventory}
            user={user.id}
            />
            <RecentTable 
            title="Recent Roasts"
            contents={this.state.history}
            user={user.id}
            />
            <RecentTable 
            title="Recent Messages"
            contents={this.state.recentMessages}
            user={user.id}
            />
            </div>
          </div>
        </div>
        </>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
