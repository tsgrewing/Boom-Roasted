import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MsgCategory from "../MsgCategory";
import axios from 'axios';

class Messages extends Component {
    constructor(props) {
        super(props);
            this.state = {
                category: ''
            }
        this.categorySelect = this.categorySelect.bind(this);
        this.getMsgs = this.getMsgs.bind(this);
    }

    categorySelect = async(e) => {
        this.setState({category: e.target.title})
        this.getMsgs()       
    }
    
    getMsgs= async()=> {
        const msgs = await axios.get(`/api/messages/${this.state.category}`);
        this.setState({messages: msgs.data})
        console.log(this.state.messages)
    }

    render() {
        const { user } = this.props.auth;
        return (
        <div style={{ height: "75vh" }} className="container ">
            <div className="row">
            <div className="landing-copy col s12 center-align">
                <h4>Discussions</h4>
            </div>  
            <div className="row center-align collection">
                <button className="btn-flat col s3 floating collection-item" title="general" onClick={ e => this.categorySelect(e) }>General</button>
                <button className="btn-flat col s3 floating collection-item" title="green" onClick={ e => this.categorySelect(e) }>Green Coffee</button>
                <button className="btn-flat col s3 floating collection-item" title="trades" onClick={ e => this.categorySelect(e) }>Trades</button>
                <button className="btn-flat col s3 floating collection-item" title="advice" onClick={ e => this.categorySelect(e) }>Roast Advice</button>
            </div>

            {this.state.messages 
            ?
            <MsgCategory
            category={this.state.category}
            messages={this.state.messages} 
            user={user.id}
            />
            :
            null
            }

            </div>
        </div>
    );
  }
}

Messages.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Messages);