import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CurrentMessage from '../CurrentMessage';

class MsgCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category,
            user: this.props.user,
            currentMsg: this.props.currentMsg
        }
    }

    render() {
        console.log(this.state.currentMsg)
        return(
            <>
            {!this.state.currentMsg &&
            <table className="striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        {/* add author */}
                        <th>Posted</th>
                        {/* add reply count */}
                    </tr>
                </thead>
                <tbody>
                    {this.props.messages.map(msg =>{
                        let preview = msg.message.substr(0, 30) +"..."
                        const postDate = this.props.getDate(msg.date)
                        return(
                        <tr key={msg._id +"Row"} onClick={ e => { this.props.messageSelect(msg) }}>
                            <td key={msg._id + "title"}>{msg.title}</td>
                            <td key={msg._id + "preview"}>{preview}</td>
                            {/* add author */}
                            <td key={msg._id + "date"}>{postDate}</td>
                            {/* add reply count */}
                        </tr>  
                        )}                  
                    )}
                </tbody>
            </table>
            }

            {/* if a current message has been selected display it here */}
            {this.state.currentMsg &&
                <CurrentMessage 
                    message={this.state.currentMsg}
                />
            }
            </>
        )
    }
        
}

MsgCategory.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(MsgCategory);
