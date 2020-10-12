import React, { Component } from 'react';

export class StartRoastForm extends Component {
    render() {

        return(

            <fieldset className="row">
                <legend>New Roast</legend>
                <form className="col s12" id="roastStartForm" 
                onSubmit={(e) => {
                    e.preventDefault();
                    const chargeTemp = e.target.charge.value;
                    const coffeeName = e.target.name.value;
                    this.props.startRoast(coffeeName, chargeTemp);
                    this.props.start();
                }}>
                <div className="row">
                    <div className="input-field col s3">
                        <select className="browser-default"  name="name">
                            {
                            this.props.inventory.map(green => 
                                <option key={green.name}>{green.name}</option>)
                            }
                        </select>
                    </div>

                    <div className="input-field col s3">
                        <input type="number"  name="weight" ></input>
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