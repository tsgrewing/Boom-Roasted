import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.css"

class MsgCategory extends Component {
    constructor(props) {
        super(props);
            this.state = {
                user: this.props.user,
                currentMsg: this.props.message,
                replyText: ''
            }
        this.sendReply = this.sendReply.bind(this);
    }

    sendReply = async(e) => {
        e.preventDefault()
        const msgId = e.target.dataset.parent;
        const replyDate = new Date()
        const reply = {
            replyMessage: e.target.replyText.value,
            replyAuthor: this.props.username,
            replyAuthorId: this.props.user.id,
            date: replyDate.toISOString()
        }
        console.log(reply)
        axios.put(`api/messages/${msgId}`, {$push: {replies: reply}})
        .then(res => {
            this.setState({
                currentMsg: res.data,
                replyText: ''
            })
            console.log(this.state.currentMsg)
        })
    }

    render() {
        const currentMsg = this.state.currentMsg

        return(
            <>
            <div className="row postRow">
            <div className="messageWrapper col s12"  key={currentMsg._id +"container"}>
                <h5 className="left-align msgTitle" key={currentMsg._id + "title"}>{currentMsg.title}</h5>
                <h6 className="left-align msgAuthor" key={currentMsg._id + "author"}>By: {currentMsg.authorUsername}</h6>
                <p className="left-align msgBody" key={currentMsg._id + "msg"}>{currentMsg.message}</p>
                <p className="left-align msgBody col s6" key={currentMsg._id + "date"}>{this.props.getDate(currentMsg.date)}</p>
            </div>
            </div>
            {/* Check for and map over replies */}

            {currentMsg.replies.length > 0 &&
                currentMsg.replies.map(reply => 
                    <div className="replyRow row">
                    <div className="replyWrapper col s11 offset-s1" key={reply.date +"container"}>
                        <h5 className="left-align msgTitle" key={reply.date +"title"}>{reply.replyTitle}</h5>
                        <h6 className="left-align msgAuthor" key={reply.date +"author"}>From: {reply.replyAuthor}</h6>
                        <p className="left-align msgBody" key={reply.date +"msg"}>{reply.replyMessage}</p>
                        <p className="left-align msgBody col s6" key={reply.date +"date"}>{this.props.getDate(reply.date)}</p>
                    </div>
                    </div>
                )    
            }

            {/* Reply form */}
            <div className="row replyFormWrapper">
                <div className="col s12">
                <h6 className="left-align">Reply:</h6>
                <form data-parent={currentMsg._id} onSubmit={e => this.sendReply(e)}>
                <textarea name="replyText" className="validate postReply" value={this.state.replyText} style={{resize: 'none'}} rows={15} onChange={e => this.setState({replyText: e.target.value})}></textarea>
                <p className="right-align"><button className="replyBtn">Reply</button></p>
                </form>
                </div>
            </div>
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
