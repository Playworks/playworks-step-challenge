import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import axios
import axios from 'axios';
// import components
import EditUserSteps from './EditUserSteps.js';
import Nav from '../../Nav/Nav.js';
import ScrollingFooter from '../../ScrollingFooter/ScrollingFooter';
// import sweet alert
import swal from 'sweetalert';
// import material ui
import { Button, Typography } from "@material-ui/core";
// import css 
import './EditUserLogs.css';

class EditUserLogs extends Component {
  state = {
    steps: 0
  };

  // allows captain to delete teammates
  deleteTeammate = () => {
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
  saveStepLogChanges = (logId) => {
    let newSteps = this.state.steps;
    axios({
      method: 'PUT',
      url: `/api/logs/${logId}`,
      data: {steps: newSteps}
    });
  };

  // delete log sweet alert
  // allows captain to cancel the log deletion
  deleteLog = (value) => {
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
          axios({
            method: 'DELETE',
            url:'/api/logs/',
            data: {
              id: value
            }
          }),
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
  };

  // Function pushes user back to previous page.
  goBack = () => {
    this.props.history.push('/team');
  };

  // sets local state to changed step log
  edit = (event) => {
    this.setState({
      steps: event.target.value
    });
  };

  reload = () => {
    this.props.dispatch({
      type: 'FETCH_LOGS',
      payload: this.props.store.currentPerson
    })
  };

  render() {
    return (
      <div className='editUserLogsContainer'>
        <Nav />
          <center>
          <div className='editUserLogHeader'>
            <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h4'>
              {this.props.store.userLogs[0] && this.props.store.userLogs[0].first_name} {this.props.store.userLogs[0] && this.props.store.userLogs[0].last_name}
            </Typography>
          </div>
          <table id='leaderboardTable'>
            <thead>
              <tr>
                <th><Typography variant='body1'>Time Submitted</Typography></th>
                <th><Typography variant='body1'>Steps</Typography></th>
                <th></th>
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
                  edit={this.edit}
                  delete={this.deleteLog}
                  save={this.saveStepLogChanges}
                  reload={this.reload}
                />
              )}
            </tbody>
          </table>
        </center>
        <div className='editUserBackandDeleteBtn'>
          <div className='editUserBackBtn'>
            <Button variant="contained" style={{color: 'white', background: '#054f95'}} onClick={this.goBack}>Finished Editing</Button> 
          </div>
        </div>
        <div className='editUserBackandDeleteBtn'>
          <Button variant="contained" color="secondary" onClick={()=> this.deleteTeammate()}>Delete User</Button>
        </div>
        <ScrollingFooter/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUserLogs);