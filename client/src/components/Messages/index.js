import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MsgCategory from "../MsgCategory";
import CurrentMessage from "../CurrentMessage";
import axios from 'axios';

class Messages extends Component {
    constructor(props) {
        super(props);
            this.state = {
                category: '',
                currentMsg: false
            }
        this.categorySelect = this.categorySelect.bind(this);
        this.getMsgs = this.getMsgs.bind(this);
        this.messageSelect = this.messageSelect.bind(this);
    }

    componentWillMount() {
        this.getRecentMsgs()
    }
    messageSelect(e) {
        console.log(e)
        this.setState({currentMsg: e})
    }

    categorySelect = async(e) => {
        this.setState({
            category: e.target.title,
            currentMsg: false
        })
        this.getMsgs(e.target.title)       
    }
    
    getMsgs= async(cat)=> {
        const msgs = await axios.get(`/api/messages/${cat}`);
        this.setState({messages: msgs.data})
        console.log(this.state.messages)
    };
    
    getRecentMsgs= async()=> {
        const msgs = await axios.get(`/api/messages/`);
        this.setState({recentMessages: msgs.data})
        console.log(this.state.recentMessages)
    }

    getDate(posted) {
        const d = new Date(posted);
        const year = d.getFullYear().toString().substr(-2);
        const month = (1+d.getMonth()).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const postTime = (d.getHours() +":" +d.getMinutes())
        const postDate = (month+'/'+day+'/'+year + " " + postTime);
        return postDate;
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
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="general"
                  onClick={(e) => this.categorySelect(e)}
                >
                  General
                </button>
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="green"
                  onClick={(e) => this.categorySelect(e)}
                >
                  Green Coffee
                </button>
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="trades"
                  onClick={(e) => this.categorySelect(e)}
                >
                  Trades
                </button>
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="advice"
                  onClick={(e) => this.categorySelect(e)}
                >
                  Roast Advice
                </button>
              </div>

              {(this.state.messages && !this.state.currentMsg) ? (
                <MsgCategory
                  category={this.state.category}
                  messages={this.state.messages}
                  user={user.id}
                  currentMsg={this.state.currentMsg}
                  messageSelect={this.messageSelect}
                  getDate={this.getDate}
                />
              ) : 
                (this.state.recentMessages && !this.state.currentMsg)
                ?
                <MsgCategory 
                messages={this.state.recentMessages}
                category={this.state.category}
                user={user.id}
                currentMsg={this.state.currentMsg}
                messageSelect={this.messageSelect}
                getDate={this.getDate}
                />
                : null
              }

              {/* if a current message has been selected display it here */}
              {this.state.currentMsg && 
                <CurrentMessage message={this.state.currentMsg}
                getDate={this.getDate}
                 />
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