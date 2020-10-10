import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RoastHistory from "../components/RoastHistory";
import PastDetails from "../components/PastDetails";
import axios from "axios";


class History extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state= {
  //     roastDetails:[],
  //     roastNotes: ''
  //   }
  //   this.loadDetails = this.loadDetails.bind(this);
  // }

  state= {
    roastDetails:[],
    roastNotes: ''
  }



  loadDetails = async(id) => {
    const selectedRoast = await axios.get("/api/roasts/id/"+ id)
    this.setState({
      roastDetails: selectedRoast.data,
      roastNotes: selectedRoast.data.notes
    })
    console.log(this.state.roastDetails.notes)
    
  };

  render() {
    const roastDetails = this.state.roastDetails;
    const roastNotes = roastDetails.notes;
    console.log(roastDetails)
    return (
      <div className="container valign-wrapper main-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Roast History</b>
            </h4>
          </div>
          <div className="row">
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
      </div>
    );
  }
}

History.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(History);
