import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';
import "chartjs-adapter-moment";
import axios from "axios";


class MsgCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category
        }
    }
    
    render() {
        return(

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
