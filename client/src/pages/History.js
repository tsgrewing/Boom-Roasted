import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RoastHistory from "../components/RoastHistory";
import PastDetails from "../components/PastDetails";
import axios from "axios";


class History extends Component {
  constructor(props) {
    super(props);
    this.state= {
      roastDetails:[],
      roastNotes: ''
    }
    this.loadDetails = this.loadDetails.bind(this);
  };

  loadDetails = async(id) => {
    const selectedRoast = await axios.get("/api/roasts/id/"+ id)
    if (selectedRoast.data.notes){
      this.setState({
        roastDetails: selectedRoast.data,
        roastNotes: selectedRoast.data.notes
      })
    }
    else {
      this.setState({
        roastDetails:{
          notes: 'Add notes',
          change: selectedRoast.data.change,
          charge: selectedRoast.data.charge,
          name: selectedRoast.data.name,
          drop:selectedRoast.data.drop,
          first: selectedRoast.data.first,
          turn: selectedRoast.data.turn
        },
        roastNotes: "Add notes"
      })
    }    
  };

  render() {
    const roastDetails = this.state.roastDetails;
    const roastNotes = this.state.roastNotes;
    return (
        <div className="row center-align">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Roast History</b>
            </h4>
          </div>
          <div className="row center-align">
          <RoastHistory 
          loadDetails={this.loadDetails}/>
          {roastDetails.length !== 0 &&
          <PastDetails 
          roastData={roastDetails}
          notes={roastNotes}
          />
          }
          </div>
        </div>
    );
  };
};

History.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(History);
