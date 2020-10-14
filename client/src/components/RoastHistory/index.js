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
        // console.log(this.state.history)
    };

    render() {
        const historyList = this.state.history;

        return (
            <div className="HistTableWrapper col s-4 left-align">
                <table className="centered highlight bordered">
                    <thead>
                    <tr>
                        {/* <th>Date</th> */}
                        <th>Coffee</th>
                        <th>Temp</th>
                        <th>Time</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* separate this into a new component? */}
                    {historyList
                    ? historyList.map(batch => (
                        <tr key={batch._id + "row"}>
                            {/* <td>{batch.date}</td> */}
                            <td key={batch.name}>{batch.name}</td>
                            <td key={batch.drop.temp}>{batch.drop.temp}&deg;F</td>
                            <td key={batch.drop.time}>{batch.drop.time}</td>
                            <td key={batch._id}><button className="detailBtn" onClick={() => this.props.loadDetails(batch._id)}>Details</button></td>
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
