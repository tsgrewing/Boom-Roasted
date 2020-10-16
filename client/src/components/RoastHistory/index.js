import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

class RoastHistory extends Component {
    
    state = {
        history: [],
    }

    componentDidMount() {
        this.getHistory()
    };

    getHistory = async () => {
        const userHistory = this.props.auth.user.id
        const roast = await axios.get(`/api/roasts/user/${userHistory}`);
        this.setState({history: roast.data})
        // .then(this.props.loadDetails(roast.data))
        this.props.loadDetails(this.state.history[0]._id)
    };

    render() {
        const historyList = this.state.history;

        return (
            <div className="HistTableWrapper col s4">
                <table className="centered highlight bordered">
                    <thead>
                    <tr>
                        {/* <th>Date</th> */}
                        <th>Coffee</th>
                        <th>Date</th>
                        {/* <th>Temp</th>
                        <th>Time</th> */}
                        {/* <th>Details</th> */}
                    </tr>
                    </thead>
                    <tbody>
                        {/* separate this into a new component? */}
                    {historyList
                    ? historyList.map(batch => {
                        const d = new Date(batch.date);
                        const year = d.getFullYear().toString().substr(-2);
                        const month = (1+d.getMonth()).toString().padStart(2, '0');
                        const day = d.getDate().toString().padStart(2, '0');
                        const roastTime = (d.getHours() +":" +('0' + (d.getMinutes())).slice(-2));
                        const roastDate = month+'/'+day+'/'+year + " " + roastTime
                        return (
                        <tr key={batch._id + "row"} onClick={() => this.props.loadDetails(batch._id)}>
                            {/* <td>{batch.date}</td> */}
                            <td key={batch.name}>{batch.name}</td>
                            <td key={batch._id + "date"}>{roastDate}</td>
                            {/* <td key={batch.drop.temp}>{batch.drop.temp}&deg;F</td>
                            <td key={batch.drop.time}>{batch.drop.time}</td> */}
                            {/* <td key={batch._id}><button className="detailBtn" onClick={() => this.props.loadDetails(batch._id)}>Details</button></td> */}
                        </tr>
                    )})
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
