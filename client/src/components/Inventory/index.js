import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types"
import AddGreen from "../AddGreen";


class InvTable extends Component {
    
    state = {
        inventory: []
    }

    componentDidMount() {
        this.getInventory()
    };

    getInventory = async () => {
        const userInv = this.props.auth.user.id
        const green = await axios.get(`/api/coffees/${userInv}`);
        this.setState({inventory: green.data})
        console.log(green.data)
    }

    tableUpdate = () => {
        this.getInventory();
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
                    {this.state.inventory 
                    ?
                    this.state.inventory.map(coffee => (
                        <tr key={coffee._id}>
                            <td key={coffee.name}>{coffee.name}</td>
                            <td key={coffee.process}>{coffee.process}</td>
                            <td key={coffee.country}>{coffee.country}</td>
                            <td key={coffee.weight}>{coffee.weight} lbs</td>
                            <td key={coffee.cost}>${coffee.cost}</td>
                            <td key="totalCost">${coffee.cost * coffee.weight}</td>
                            {/* Add buttons to delete coffee or adjust weight */}
                        </tr>
                    ))
                    :
                    <tr><td>No Coffees in Inventory</td></tr>
                    }
                    </tbody>
                </table>
                    
                <AddGreen 
                tableUpdate={this.tableUpdate}/>
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
