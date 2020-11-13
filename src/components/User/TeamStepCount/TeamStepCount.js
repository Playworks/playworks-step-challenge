import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamStepCount.css';
import { Typography, Link } from '@material-ui/core';

class TeamStepCount extends Component { 
  editLogs = (value) => {
    console.log('this button works', value);
    this.props.history.push('/editlogs')
  }

  render() {
    console.log('history', this.props);
    
    return (
      <div className='teamStepCount'>
        <Typography variant='h5'>Team Step Count</Typography>
          <center>
            <table>
              <thead>
                <th>Name</th>
                <th>Steps</th>
                {this.props.store.user.admin === "CAPTAIN" &&
                <th>Edit</th>
                }
              </thead>
              <tbody>
                {this.props.store.teamDetails.map((user, i) =>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.sum}</td>
                  {this.props.store.user.admin === "CAPTAIN" &&
                  <th><button onClick={() => this.editLogs(user.id)}>Edit Logs</button></th>
                  }
                </tr>
                )}
              </tbody>
            </table>
          </center>
        </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(TeamStepCount));