import React, { Component } from "react";
import "./style.css";

class RecentTable extends Component {
  render() {
    return (
        <div className="col s-3 offset-s1">
            <h2>{this.props.title}</h2>
            <table className="stiped">
                <thead>
                    <th></th>
                </thead>
            </table>
        </div>
    );
  }
}

export default RecentTable;
