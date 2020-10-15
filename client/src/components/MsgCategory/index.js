import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";


class MsgCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category,
            user: this.props.user
        }
    }
    
    // componentDidUpdate(prevProps) {
    //     if(prevProps.category !== this.props.category){
            // this.setState({category: nextProps.category})
            // console.log(nextProps.category)
            // this.getMsgs()
    //     }
    // }

    // componentDidMount() {
    //     this.getMsgs()
    // }

    // getMsgs= async()=> {
    //     const msgs = await axios.get(`/api/messages/${this.props.category}`);
    //     this.setState({messages: msgs.data})
    //     console.log(this.state.messages)
    // }

    render() {
        console.log(this.props.messages)
        return(
            <table className="striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Posted</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.messages.map(msg =>{
                        console.log(msg)
                        let preview = msg.message.substr(0, 30) +"..."
                        const d = new Date(msg.date);
                        const year = d.getFullYear().toString().substr(-2);
                        const month = (1+d.getMonth()).toString().padStart(2, '0');
                        const day = d.getDate().toString().padStart(2, '0');
                        const postTime = (d.getHours() +":" +d.getMinutes())
                        const postDate = month+'/'+day+'/'+year + " " + postTime;                        
                        return(
                        <tr key={msg._id +"Row"}>
                            <td key={msg._id + "title"}>{msg.title}</td>
                            <td key={msg._id + "preview"}>{preview}</td>
                            <td key={msg._id + "date"}>{postDate}</td>
                        </tr>  
                        )}                  
                    )}
                </tbody>
            </table>
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
