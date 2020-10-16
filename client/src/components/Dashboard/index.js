import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import RecentTable from "../RecentTable";
import "./style.css"

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

  getRecentMsgs= async()=> {
    const msgs = await axios.get(`/api/messages/`);
    this.setState({recentMessages: (msgs.data.slice(0, 5))})
  };

  getHistory = async () => {
    const userHistory = this.props.auth.user.id
    const roast = await axios.get(`/api/roasts/user/${userHistory}`);
    this.setState({history: (roast.data.slice(0, 5))})
  };

  getInventory = async () => {
    const userInv = this.props.auth.user.id
    const green = await axios.get(`/api/coffees/${userInv}`);
    this.setState({inventory: (green.data.slice(0,5))})
  }

  componentDidMount(){
    this.getHistory();
    this.getInventory();
    this.getRecentMsgs();
  }

  render() {
    const { user } = this.props.auth;
    return (
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,{user.name.split(" ")[0]}</b>
              <p className="flow-text grey-text text-darken-1">
                You're ready to roast
              </p>
            </h4>
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
