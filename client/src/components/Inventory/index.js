import React, { Component } from "react";

class Inventory extends Component {
    render() {
        return (
            <div className="InvTableWrapper">
                <table>
                    <tr>
                        <th>Coffee Name</th>
                        <th>Process</th>
                        <th>Importer</th>
                        <th>Weight</th>
                        <th>Cost</th>
                        <th>Actions</th>
                    </tr>

                    {/* Set Up call to db to insert users green coffee */}

                </table>
            </div>
        )
    }
}

Inventory.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(Inventory);
