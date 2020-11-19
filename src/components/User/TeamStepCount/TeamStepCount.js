import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Typography } from '@material-ui/core';

class TeamStepCount extends Component {
  editLogsAndSetCurrentTeammate = (value) => {
    this.editLogs(value);
    this.setCurrent(value);
  }
  editLogs = (value) => {
    console.log('this button works', value);
    let userLogsToGet = value
    this.props.dispatch({
      type: 'FETCH_LOGS',
      payload: userLogsToGet
    })
    this.props.history.push('/editlogs')
  }
  // when the captain clicks a team member,
  // their user id is saved to redux for later use
  // on editUserLogs page
  setCurrent = (value) => {
    this.props.dispatch({
      type: "SET_CURRENT_PERSON",
      payload: value
    })
  }

  render() {
    console.log('this.props', this.props);
    
    return (
      <div className='teamStepCount'>
          <center>
          <Typography variant='h5'>Team Step Count</Typography>
            <table id='leaderboardTable'>
              <thead>
                <th><Typography variant='body1'>Name</Typography></th>
                <th><Typography variant='body1'>Steps</Typography></th>
                {this.props.store.user.admin === "CAPTAIN" &&
                <th><Typography variant='body1'>Edit</Typography></th>
                }
              </thead>
              <tbody>
                
                {this.props.store.teamDetails.map((user, i) =>
                <tr>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.sum}</td>
                  {this.props.store.user.admin === "CAPTAIN" &&
                  <th><button onClick={() => this.editLogsAndSetCurrentTeammate(user.id)}>Edit Logs</button></th>
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