import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class MsgCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            currentMsg: this.props.message
        }
    }

    render() {
        console.log(this.props.message)
        return(
            <div className="messageWrapper col s12 green">
                <h5 className="left-align msgTitle">{this.state.currentMsg.title}</h5>
                <p className="left-align msgBody">{this.state.currentMsg.message}</p>
                <p className="left-align msgBody">{this.props.getDate(this.state.currentMsg.date)}</p>
            </div>
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
