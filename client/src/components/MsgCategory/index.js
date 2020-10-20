import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./style.css";

class MsgCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      user: this.props.user,
      currentMsg: this.props.currentMsg,
    };
  }

  render() {
    return (
      <table className="highlight messageTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Preview</th>
            <th>Author</th>
            <th>Posted</th>
            <th>Replies</th>
          </tr>
        </thead>
        <tbody>
          {this.props.messages.map((msg) => {
            let preview = msg.message.substr(0, 30) + "...";
            const postDate = this.props.getDate(msg.date);
            return (
              <tr
                key={msg._id + "Row"}
                onClick={(e) => {
                  this.props.messageSelect(msg);
                }}
              >
                <td key={msg._id + "title"}>{msg.title}</td>
                <td key={msg._id + "preview"}>{preview}</td>
                <td key={msg._id + "author"}>{msg.authorUsername}</td>
                <td key={msg._id + "date"}>{postDate}</td>
                <td key={msg._id + "replies"}>
                  {msg.replies ? msg.replies.length : 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

MsgCategory.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MsgCategory);
