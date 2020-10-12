import React, {Component} from 'react';

class CurrentNotes extends Component {
    render(){
    return(
        <div className="col s6">
            <fieldset>
                <legend>Notes</legend>
                    <textarea name="notes" onChange={e=> { 
                        let notes = e.target.value
                        this.props.updateNotes(notes) }}></textarea>

            </fieldset>
        </div>
    )}
}

export default CurrentNotes