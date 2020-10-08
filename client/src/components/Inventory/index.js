import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types"


class InvTable extends Component {
    
    state = {
        inventory: []
    }

    componentWillMount() {
        this.getInventory()
    };

    getInventory = async () => {
        const userInv = this.props.auth.user.id
        const green = await axios.get(`/api/coffees/${userInv}`);
        this.setState({inventory: green.data})
        console.log(green.data)
    }

    render() {
        return (
            <div className="InvTableWrapper">
                <table className="centered highlight">
                    <thead>
                    <tr>
                        <th>Coffee Name</th>
                        <th>Process</th>
                        <th>Country</th>
                        <th>Weight</th>
                        <th>Cost</th>
                        <th>Total Cost on hand</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.inventory.map(coffee => (
                        <tr>
                            <td>{coffee.name}</td>
                            <td>{coffee.process}</td>
                            <td>{coffee.country}</td>
                            <td>{coffee.weight} lbs</td>
                            <td>${coffee.cost}</td>
                            <td>${coffee.cost * coffee.weight}</td>
                            {/* Add buttons to delete coffee or adjust weight */}
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

InvTable.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(InvTable);
