import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Select from 'react-select';

class NewMessage extends Component {

  constructor() {
      super();
      this.state= {

      }
  };

  componentDidMount() {
    const options = {
      onCloseEnd: () => {
          this.props.updateMessages();
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  onChange = e => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
      console.log(this.state)
  }

  postMessage = e => {
    e.preventDefault();
    const user = this.props.auth.user.id;
    const {title, category, message} = this.state;
    console.log(title + '/' + '/'+category+ '/' +'/' + message +'/'+user+'/'+this.props.username)
    axios.post("/api/messages/", { 
      author: user,
      title: title,
      category: category,
      message: message,
      authorUsername: this.props.username
     })
        .then((res) => {
      });
  };

  render() {
    const categories = [
      {value: "general", label: "General"},
      {value: "green", label: "Green Coffee"},
      {value: "trades", label: "Trades"},
      {value: "advice", label: "Advice"},

    ]
    return (
    <div>
        <div className="col s6 right-align">
            {/* add green link to open model with add green form */}
            <button className="center-align btn waves-effect waves-light green modal-trigger" data-target="postModal" >
            New Post<i className="material-icons right">add_circle</i>
            </button>
        </div>
        {/* modal with add green form */}
        <div
            ref={Modal => {
                this.Modal = Modal;
            }}
            id="postModal"
            className="modal"
        >
          <div className="modal-content">
            <div className="row">
                <h3>New Discussion</h3>
                <form className="col s12" onSubmit={this.postMessage}>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="title" type="text" className="validate" name="title" onChange={this.onChange} />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s6">
                      {/* <select name="category" className="browser-default" >
                        <option value='0' disabled selected>Select a Category</option>
                        <option value="general">General</option>
                        <option value="green">Green Coffee</option>
                        <option value="trades">Trade</option>
                        <option value="Advice">Advice</option>
                      </select> */}
                      <Select 
                      options={categories}
                      required
                      name="category"
                      placeholder="Select a category"
                      onChange={e => this.setState({category: e.value})}
                      />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="message" style={{resize:"none", height: "6rem"}} type="text" className="validate" name="message" onChange={this.onChange} />
                        <label htmlFor="message">Message</label>
                    </div>
                </div>
                </form>
                <div className="row">
                <div className="col s6 center-align">
                    <button className="center-align btn waves-effect waves-light modal-close green" type="submit" onClick={this.postMessage} name="action">Submit
                    <i className="material-icons right">add_box</i>
                    </button>
                </div>
                <div className="col s6 center-align">
                    <button className="center-align btn waves-effect waves-light modal-close red" type="submit" onClick={e => e.preventDefault()} name="action">Cancel
                    <i className="material-icons right">cancel_presentation</i>
                    </button>
                </div>
                </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

NewMessage.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps)(NewMessage);
