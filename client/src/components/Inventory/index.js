import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types"
import AddGreen from "../AddGreen";
import DeleteGreen from "../DeleteGreen";
import EditBtn from "../EditBtn";


class InvTable extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            listStatus: false
        }
        this.getInventory = this.getInventory.bind(this);

    };

    componentDidMount() {
        this.getInventory()
    };

    getInventory = async () => {
        const userInv = this.props.auth.user.id
        const green = await axios.get(`/api/coffees/${userInv}`);
        this.setState({inventory: green.data})
    }

    tableUpdate () {
        this.getInventory();
    };

    updateList(e) {
        if (!this.state.listStatus) {
            this.setState({listStatus: true},console.log(this.state.listStatus))
        }
        else {
            this.setState({listStatus: false}, console.log(this.state.listStatus))
        }

    }

    render() {
        return (
            <div className="InvTableWrapper">

                <div className="row left-align ">
                    <div className="switch col s6 ">
                        <label>
                        Active Only
                        <input type="checkbox"  value={this.state.listStatus} onChange={e => this.updateList(e)}/>
                        <span className="lever"></span>
                        All Coffees
                        </label>
                    </div> 
                    

                    <AddGreen 
                    tableUpdate={this.tableUpdate}/>
                </div>
                <table className="centered highlight">
                    <thead>
                    <tr>
                        <th>Coffee Name</th>
                        <th>Process</th>
                        <th>Country</th>
                        <th>Weight</th>
                        <th>Cost</th>
                        <th>Inventory Cost</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.inventory 
                    ?
                    this.state.inventory.map(coffee => {
                        if (coffee.weight > 0 || this.state.listStatus){
                            return (
                        <tr key={coffee._id}>
                            <td key={coffee._id + ": name" }>{coffee.name}</td>
                            <td key={coffee._id + ": process" }>{coffee.process}</td>
                            <td key={coffee._id + ": country"}>{coffee.country}</td>
                            <td key={coffee._id + ": weight"}>{coffee.weight} lbs</td>
                            <td key={coffee._id + ": cost"}>${coffee.cost}</td>
                            <td key={coffee._id + " totalCost"}>${coffee.cost * coffee.weight}</td>
                            {/* Add buttons to delete coffee or adjust weight */}
                            <td key={"edit: " + coffee._id}>
                                <EditBtn 
                                coffee={coffee}
                                />
                            </td>
                            <td key={"delete: " + coffee._id} id={"delete " + coffee.name}>
                                <DeleteGreen
                                coffee={coffee}
                                />
                            </td>
                        </tr>
                            )}
                        else{ return (null); }
                        
                    })
                    :
                    <div className="row"><div className="col center-align">No Coffees in Inventory</div></div>
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
    auth: state.auth,
    inventory: state.inventory
  });
  
export default connect(mapStateToProps)(InvTable);
