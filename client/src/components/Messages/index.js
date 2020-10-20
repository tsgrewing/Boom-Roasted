import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MsgCategory from "../MsgCategory";
import CurrentMessage from "../CurrentMessage";
import NewMessage from "../NewMessage";
import axios from 'axios';
import "./style.css"

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
        this.getUser()
    };

    getUser = async() => {
        const username = await axios.get(`api/users/${this.props.auth.user.id}`)
        this.setState({username: username.data.username})
    }

    messageSelect(e) {
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
    };
    
    getRecentMsgs= async()=> {
        const msgs = await axios.get(`/api/messages/`);
        console.log(msgs.data)
        this.setState({recentMessages: (msgs.data.slice(0, 10))})
    }

    getDate(posted) {
        const d = new Date(posted);
        const year = d.getFullYear().toString().substr(-2);
        const month = (1+d.getMonth()).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const postTime = (d.getHours() +":" +("0"+ (d.getMinutes())).slice(-2));
        const postDate = (month+'/'+day+'/'+year + " " + postTime);
        return postDate;
    }

    render() {
        const { user } = this.props.auth;
        return (
          <div  className=" messageBoard">
            <div className="row">
              <div className="col s12 center-align msgTitle">
                <h3><b>Discussions</b></h3>
                <NewMessage 
                username={this.state.username}
                user={user}
                updateMessages={this.getRecentMsgs}/>
              </div>
              {/* category selection bar */}
              <div className="center-align collection">
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="general"
                  onClick={(e) => this.categorySelect(e)}
                >
                  <b>General</b>
                </button>
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="green"
                  onClick={(e) => this.categorySelect(e)}
                >
                  <b>Green Coffee</b>
                </button>
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="trades"
                  onClick={(e) => this.categorySelect(e)}
                >
                  <b>Trades</b>
                </button>
                <button
                  className="btn-flat col s3 floating collection-item"
                  title="advice"
                  onClick={(e) => this.categorySelect(e)}
                >
                  <b>Roast Advice</b>
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
                user={user}
                currentMsg={this.state.currentMsg}
                messageSelect={this.messageSelect}
                getDate={this.getDate}
                />
                : null
              }

              {/* if a current message has been selected display it here */}
              {this.state.currentMsg && 
                <CurrentMessage message={this.state.currentMsg}
                user={user}
                username={this.state.username}
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