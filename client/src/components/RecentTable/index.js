import React, { Component } from "react";
import "./style.css"
import ReactTooltip from "react-tooltip";


class RecentTable extends Component {
  render() {
    
    return (
        <div className="col recentTable">
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
                {this.props.contents[0]
                ?
                  this.props.contents.map(green => 
                      <tr key={green._id + "row"} data-tip data-for={green._id}>
                        <td key={green.name}>{green.name}</td>
                        <td key={green._id + "weight"}>{green.weight} lbs</td>
                        <ReactTooltip 
                        id={green._id}
                        place="right"
                        >
                          <ul>
                            <li>{"Name: " + green.name}</li>
                            <li>{"Weight: " + green.weight}</li>
                            <li>{`Cost: $${green.cost}`}</li>
                          </ul>
                        </ReactTooltip>
                      </tr>
                  )
                  :
                  <tr><td colSpan='2'>No coffees in inventory yet...</td></tr>
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
                {this.props.contents[0]
                ?
                  this.props.contents.map(batch => {
                    const d = new Date(batch.date);
                    const year = d.getFullYear().toString().substr(-2);
                    const month = (1+d.getMonth()).toString().padStart(2, '0');
                    const day = d.getDate().toString().padStart(2, '0');
                    const roastTime = (d.getHours() +":" +('0' + (d.getMinutes())).slice(-2));
                    const roastDate = month+'/'+day+'/'+year + " " + roastTime
                    return ( 
                      <tr key={batch._id + "row"} data-tip data-for={batch._id}>
                        <td key={batch.name}>{batch.name}</td>
                        <td key={batch._id + "date"}>{roastDate}</td>
                        <ReactTooltip 
                        id={batch._id}
                        place="right"
                        >
                          <ul>
                            <li>{`Name: ${batch.name}`}</li>
                            <li>{`Date: ${roastDate}`}</li>
                            <li>{`First: ${batch.first.temp} @ ${batch.first.time}`}</li>
                            <li>{`Drop: ${batch.drop.temp} @ ${batch.drop.time}`}</li>
                          </ul>
                        </ReactTooltip>
                      </tr>
                    )
                  })
                  :
                  <tr><td colSpan="2">You haven't saved any roasts yet...</td></tr>
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
