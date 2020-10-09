import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

class RoastHistory extends Component {
    
    state = {
        history: [],
        detail: {}
    }

    componentWillMount() {
        this.getHistory()
    };

    getHistory = async () => {
        const userHistory = this.props.auth.user.id
        const roast = await axios.get(`/api/roasts/${userHistory}`);
        this.setState({history: roast.data})
        console.log(roast)
    };

    loadDetails = async(id) => {
        
        const selectedRoast = await axios.get("/api/roasts"+ id)
        this.setState({detail: selectedRoast.data})
    };

    render() {
        const historyList = this.state.history;
        return (
            <div className="HistTableWrapper col s-4">
                <table className="centered highlight">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Coffee</th>
                        <th>Time</th>
                        <th>Temp</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyList
                    ? historyList.map(batch => (
                        <tr>
                            <td>{batch.date}</td>
                            <td>{batch.name}</td>
                            <td>{batch.drop.temp}&deg;F</td>
                            <td>{batch.drop.time}</td>
                            <td><button className="detailBtn" onCLick={() => this.loadDetails(batch._id)}>Details</button></td>
                        </tr>
                    ))
                    : <tr><td>Roast Some Coffee!</td></tr>
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

RoastHistory.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(RoastHistory);
