import React, { Component } from "react";
import "./style.css"

class RecentTable extends Component {
  render() {
    
    return (
        <div className="col l3 recentTable">
            <h5 className="center-align">{this.props.title}</h5>
            <hr></hr>
            <table className="highlight responsive-table">
                {this.props.title ==="Top Inventory"
                ?
                <>
                <thead>
                  <tr>
                    <th>Coffee</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.contents.map(green => 
                      <tr key={green._id + "row"}>
                        <td key={green.name}>{green.name}</td>
                        <td key={green._id + "weight"}>{green.weight} lbs</td>
                      </tr>
                  )
                }
                </tbody>
                </>
                :
                this.props.title ==="Recent Roasts"
                ?
                <>
                <thead>
                  <tr>
                    <th>Coffee</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {
                  this.props.contents.map(batch => {
                    const d = new Date(batch.date);
                    const year = d.getFullYear().toString().substr(-2);
                    const month = (1+d.getMonth()).toString().padStart(2, '0');
                    const day = d.getDate().toString().padStart(2, '0');
                    const roastTime = (d.getHours() +":" +('0' + (d.getMinutes())).slice(-2));
                    const roastDate = month+'/'+day+'/'+year + " " + roastTime
                    return ( 
                      <tr key={batch._id + "row"}>
                        <td key={batch.name}>{batch.name}</td>
                        <td key={batch._id + "date"}>{roastDate}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
                </>
                :
                this.props.title ==="Recent Messages"
                ?
                <>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {
                  this.props.contents.map(msg => {
                    const d = new Date(msg.date);
                    const year = d.getFullYear().toString().substr(-2);
                    const month = (1+d.getMonth()).toString().padStart(2, '0');
                    const day = d.getDate().toString().padStart(2, '0');
                    const postTime = (d.getHours() +":" +('0' + (d.getMinutes())).slice(-2));
                    const postDate = month+'/'+day+'/'+year + " " + postTime
                    return ( 
                      <tr key={msg._id + "row"}>
                        <td key={msg.name}>{msg.title}</td>
                        <td key={msg._id + "date"}>{postDate}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
                </>
                :
                null
                }
            </table>

        </div>
    );
  }
}

export default RecentTable;
