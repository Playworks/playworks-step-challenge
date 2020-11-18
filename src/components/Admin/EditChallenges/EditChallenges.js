import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './EditChallenges.css';
import {Typography, Card, Button, Grid} from '@material-ui/core';
import CreateContest from '../CreateContest/CreateContest';
import AdminNav from '../../Admin/AdminNav/AdminNav.js';

class EditChallenges extends Component {
  state = {
  };

  render() {
    return (
      <div>
        <AdminNav />
        <div className='adminChallengesGrid'>
          <Grid container direction="row">
            <Grid item>
          <Card>
            <Typography>Challenge Title</Typography>
            <Typography>No date selected</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            <Button variant="outlined">Edit Challenge</Button>
          </Card></Grid>
          <Grid item>
          <Card>
            <Typography>Challenge Title</Typography>
            <Typography>No date selected</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            <Button variant="outlined">Edit Challenge</Button>
          </Card></Grid>
          <Grid item>
          <Card>
            <Typography>Challenge Title</Typography>
            <Typography>No date selected</Typography>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            <Button variant="outlined">Edit Challenge</Button>
          </Card>
          </Grid>
          </Grid>
        </div>
        <CreateContest />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditChallenges);