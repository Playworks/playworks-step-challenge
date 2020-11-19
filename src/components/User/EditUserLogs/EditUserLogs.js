import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Typography } from "@material-ui/core";
import './EditUserLogs.css';
import Nav from '../../Nav/Nav.js';
import swal from 'sweetalert';
import axios from 'axios';
import Footer from '../../Footer/Footer.js';
import currentPerson from '../../../redux/reducers/current.person.reducer';
import EditUserSteps from './EditUserSteps.js';
import moment from 'moment';

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
        this.props.dispatch({
          type: 'DELETE_USER',
          payload: this.props.store.currentPerson
        });
        swal("Teammate deleted", {
          icon: "success"
        })
        .then(() => {
          this.goBack();
        })
      } else {
        swal("Keep on stepping!");
      }
    });
  };

  // pulls id and steps from child editUserSteps to update step logs
  saveStepLogChanges = (logId, updatedSteps) => {
    console.log('data', logId);
    console.log('steps', updatedSteps);
      axios({
      method: 'PUT',
      url: '/api/logs/',
      data: {
        id: logId,
        steps: updatedSteps
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
 
  // Function pushes user back to previous page.
  goBack = () => {
    this.props.history.push('/team');
  }
  
  render() {
    return (
      <div className='editUserLogsContainer'>
        <Nav />
          <center>
          <div className='editUserLogHeader'>
            <Typography variant='h4'>
              {this.props.store.userLogs[0] && this.props.store.userLogs[0].first_name} {this.props.store.userLogs[0] && this.props.store.userLogs[0].last_name}
            </Typography>
          </div>
          <table id='leaderboardTable'>
            <thead>
              <tr>
                <th><Typography variant='body1'>Time Submitted</Typography></th>
                <th><Typography variant='body1'>Steps</Typography></th>
                <th><Typography variant='body1'></Typography></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {this.props.store.userLogs.map(log =>
                  <EditUserSteps
                  date={log.date.split( 'T' )[0]}
                  data={log.id}
                  steps={log.steps}
                  changeStepLog={this.changeStepLog}
                  delete={this.deleteLog}
                  save={this.saveStepLogChanges}
                  />
                  )}
              </tbody>
          </table>
        </center>
        <div className='editUserBackandDeleteBtn'>
          <div className='editUserBackBtn'>

            <Button variant="contained" color="default" onClick={this.goBack}>Back</Button> 
          </div>
          <div className='editUserSaveBtn'>
            <Button variant="contained" 
              style={{color: 'white', background: '#054f95'}}>Save</Button>
          </div>
        </div>
        <div className='editUserBackandDeleteBtn'>
          <Button variant="contained" color="secondary" onClick={()=> this.deleteTeammate()}>Delete User</Button>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUserLogs);