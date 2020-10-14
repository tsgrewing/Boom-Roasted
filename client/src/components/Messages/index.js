import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MsgCategory from "../MsgCategory";

class Messages extends Component {
    constructor(props) {
        super(props);
            this.state = {
                category: ''
            }
        this.categorySelect = this.categorySelect.bind(this);
    }

    categorySelect(e) {
        this.setState({category: e.target.title})
    }

    render() {
        const { user } = this.props.auth;
        console.log(this.props.auth);
        return (
        <div style={{ height: "75vh" }} className="container ">
            <div className="row">
            <div className="landing-copy col s12 center-align">
                <h4>Discussions</h4>
            </div>  
            <div className="row center-align collection">
                <button className="btn-flat col s3 floating collection-item" title="general" onClick={ this.categorySelect }>General</button>
                <button className="btn-flat col s3 floating collection-item" title="green" onClick={ this.categorySelect }>Green Coffee</button>
                <button className="btn-flat col s3 floating collection-item" title="trades" onClick={ this.categorySelect }>Trades</button>
                <button className="btn-flat col s3 floating collection-item" title="advice" onClick={ this.categorySelect }>Roast Advice</button>
            </div>
            {this.state.category !== ""
            ?
            <MsgCategory
            category={this.state.category} 
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