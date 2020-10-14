import React, { Component } from 'react';

export class StartRoastForm extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         invWeight: this.props.initialInvWeight
    //     }
    // }

    render() {

        return(

            <fieldset className="row">
                <legend>New Roast</legend>
                <form className="col s12" id="roastStartForm" 
                onSubmit={(e) => {
                    e.preventDefault();
                    const batchWeight = e.target.weight.value;
                    const chargeTemp = e.target.charge.value;
                    const coffeeName = e.target.name.value;
                    const greenId = e.target.name.options[e.target.name.options.selectedIndex].dataset.id;
                    const invWeight = e.target.name.options[e.target.name.options.selectedIndex].dataset.inv;
                    this.props.startRoast(coffeeName, chargeTemp, greenId, batchWeight, invWeight);
                    this.props.start();
                }}>
                <div className="row">
                    <div className="input-field col s3">
                        <select className="browser-default"  name="name" onChange={e => this.setState({invWeight: (e.target.options[e.target.options.selectedIndex].dataset.inv)})}>
                            {
                            this.props.inventory.map(green => 
                                <option key={green._id} data-id={green._id} data-inv={green.weight}>{green.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="input-field col s3">
                        <input type="number" name="weight" ></input>
                        <label htmlFor="weight">Weight:</label>
                    </div>

                    <div className="input-field col s3">
                        <input type="number"  name="charge"></input>
                        <label htmlFor="charge">Charge Temp:</label>
                    </div>

                    <div className="input-field col s3">
                        <button type="submit" className="waves-effect waves-light btn">Start Roast</button>
                    </div>

                    </div>
                    </form>
                </fieldset>
        )}
}

export default StartRoastForm