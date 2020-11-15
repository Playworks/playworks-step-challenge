import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid, Typography } from "@material-ui/core";
import './EditUserLogs.css';
import Nav from '../../Nav/Nav.js';
import swal from 'sweetalert';
import ContentEditable from 'react-contenteditable';
import axios from 'axios';
import currentPerson from '../../../redux/reducers/current.person.reducer';

class EditUserLogs extends Component {
  state = {
    team: this.props.store.user.teams_id
  };
  // allows captain to delete teammates
  deleteTeammate = () => {
    console.log('delete teammate button works', this.props.store.currentPerson);
    swal('this button', {
      title: 'Would you like to delete the user?',
      text: 'This cannot be undone',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then((willDelete) => {
      if(willDelete) {
        swal("Teammate deleted", {
          icon: "success"
        })
        .then(
          this.props.dispatch({
                type: 'DELETE_USER',
                payload: this.props.store.currentPerson
              })
              
        )
      } else {
        swal("Keep on stepping!");
      }
      this.props.history.push('/team')
    })
  };
  // allows captain to correct the logs of a teammate
  changeStepLog = (event) => {
    // number that user has changed the step log to
    console.log('change steps button', Number(event.target.value));
    // "steps"."id" of steps database table
    console.log('change steps button', event._dispatchInstances.pendingProps.data);
    axios({
      method: 'PUT',
      url: '/api/logs/',
      data: {
        id: event._dispatchInstances.pendingProps.data,
        steps: Number(event.target.value)
      }
    })
  }
  // delete log sweet alert
  // allows captain to cancel the log deletion
  deleteLog = (value) => {
    console.log('step log id', value);
    swal('this button', {
      title: 'Would you like to delete this log?',
      text: 'This cannot be undone',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then((willDelete) => {
      if(willDelete) {
        swal("Log deleted", {
          icon: "success"
        })
        .then(
          // deletes the selected log
          this.completeTheLogDelete(value),
          // refreshed the log table
          this.props.dispatch({
            type: 'FETCH_LOGS',
            payload: this.props.store.currentPerson
          })
        )
      } else {
        swal("Keep on stepping!");
      }
    })
  }
  // This function is embedded in the deleteLog sweet alert to allow
  // the user to cancel the log deletion
  completeTheLogDelete = (value) => {
    let stepLogId = value;
    axios({
      method: 'DELETE',
      url:'/api/logs/',
      data: {
        id: stepLogId
      }
    })
  }
  // sends captain to the contest home to refresh data tables
  toContestHome = () => {
    this.props.history.push('/home');
  }
  
  render() {
    return (
      <div>
        <Nav />
      <Grid container direction="column" alignItems="center">
        <Grid item>
        <Typography variant='h5'>{this.props.store.userLogs[0] && this.props.store.userLogs[0].username}<button onClick={()=> this.deleteTeammate()}>Delete User</button></Typography>
          <center>
            <table>
              <thead>
                <th>Time Submitted</th>
                <th>Steps</th>
                <th>Delete</th>
              </thead>
              <tbody>
                {this.props.store.userLogs.map(log =>
                <tr>
                  <td>{log.date}</td>
                  <td>
                  <ContentEditable
                  data={log.id}
                  html={String(log.steps)}
                  onChange={this.changeStepLog}
                  />
                  </td>
                  <td><button onClick={(event) => this.deleteLog(log.id)}>Delete Log</button></td>
                </tr>
                  )}
              </tbody>
            </table>
          </center>
        </Grid>
        <Grid item><button onClick={() => this.toContestHome()}>Back</button></Grid>
      </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUserLogs);