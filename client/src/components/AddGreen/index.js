import React, { Component } from "react";

const AddCoffee = (greenName, process, importer, weight, cost) => {
    
}

class AddGreen extends Component {
  render() {
    return (
        <div id="greenModal" className="modal">
            <div className="row">
                <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">local_offer</i>
                        <input id="newName" type="text" className="validate" />
                        <label for="newName">Coffee Name</label>
                    </div>
                    <div className="input-field col s6">
                        <i className="material-icons prefix">category</i>
                        <input id="newProcess" type="text" className="validate" />
                        <label for="newProcess">Process</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <i className="fas fa-ship"></i>
                        <input id="newImporter" type="text" className="validate" />
                        <label for="newImporter">Importer</label>
                    </div>
                    <div className="input-field col s4">
                    <i className="fas fa-weight-hanging"></i>
                        <input id="newWeight" type="text" className="validate" />
                        <label for="newWeight">Weight in pounds</label>
                    </div>
                    <div className="input-field col s4">
                        <i className="material-icons prefix">attach_money</i>
                        <input id="newCost" type="text" className="validate" />
                        <label for="newCost">Cost per pound</label>
                    </div>
                </div>
                </form>
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={AddCoffee()}>Submit
                <i className="material-icons right">add_box</i>
                </button>
            </div>
        </div>
    );
  }
}



export default AddGreen;
