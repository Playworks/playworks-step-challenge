import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid, Typography } from "@material-ui/core";
import './EditUserLogs.css';
import Nav from '../../Nav/Nav.js';
import swal from 'sweetalert';

class EditUserLogs extends Component {
  state = {
    team: this.props.store.user.teams_id
  };
  deleteTeammate = () => {
    console.log('delete teammmate button works', this.props.store.currentPerson);
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
  

  render() {
    console.log('this.prop', this.props.history);
    
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
                <th>Edit?</th>
              </thead>
              <tbody>
                {this.props.store.userLogs.map(log =>
                <tr>
                  <td>{log.date}</td>
                  <td>{log.steps}</td>
                  <td><button>Edit</button></td>
                </tr>
                  )}
              </tbody>
            </table>
          </center>
        </Grid>
        <Grid item><button>Cancel</button><button>Save</button></Grid>
      </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUserLogs);