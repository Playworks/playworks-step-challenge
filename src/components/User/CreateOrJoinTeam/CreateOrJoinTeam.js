import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateOrJoinTeam.css';
// material ui
import { Typography } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

class CreateOrJoinTeam extends Component {

  createTeam = () => {
    this.props.history.push('/createteam');
  }

  joinTeam = () => {
    this.props.history.push('/jointeam');
  }

  render() {
    return (
      <div style={{ marginTop: '5rem' }}>
        <center onClick={this.createTeam}>
        <GroupAddIcon 
          style={{ width: 110, height: 110, display: 'block' }} 
          fontSize='large' 
          />
        <Typography variant='h5'>Create Team</Typography>
        </center>

        <center style={{margin: '5rem', marginBottom: '10'}} 
          onClick={this.joinTeam}>
        <i class="fas fa-users fa-5x" ></i>
        <Typography variant='h5' style={{marginTop: 30}}>Join Team</Typography>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateOrJoinTeam);