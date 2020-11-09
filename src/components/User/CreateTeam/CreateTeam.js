import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateTeam.css';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
// material ui
import { Button, TextField, Typography } from '@material-ui/core';

class CreateTeam extends Component {



  render() {
    return (
      <div>
        <div className='createTeamForm'>
        <Typography variant='h5'>Create a Team</Typography>
        <TextField id="outlined-basic" label="Team name" variant="outlined"></TextField>
        <img style={{marginTop: '1rem'}} src= { Placeholder } />
        <Button variant='contained'>Upload a photo</Button>
        <center>
          <Button variant='contained' 
            color='primary'
            style={{marginTop: '2rem'}} 
            onClick={() => {this.props.history.push('/home')}}>
            Submit
          </Button>
        </center>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateTeam);