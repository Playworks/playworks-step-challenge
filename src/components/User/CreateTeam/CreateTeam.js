import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateTeam.css';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
// material ui
import { Button, TextField, Typography } from '@material-ui/core';

class CreateTeam extends Component {

  state = {
    team_name: '',
    team_photo: '',
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function sets state of photo to selected file/image in photo input.
  photoSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      team_photo: event.target.files[0],
    });
  };

  // Function dispatches info to create team to saga Listening for 'CREATE_TEAM'
  createTeam = () => {
    const objectToSend = {
      team_name: this.state.team_name,
      team_photo: this.state.team_photo
    }
    console.log('in createTeam function and this is what we are sending', objectToSend);
    // this.props.dispatch({
    //   type: 'CREATE_TEAM',
    //   payload: {
    //     team_name: this.state.team_name,
    //     team_photo: this.state.team_photo
    //   };
    // });
    // this.props.history.push('/home')
  }

  render() {
    console.log('this is our state', this.state)
    return (
      <div>
        <div className='createTeamForm'>
          <Typography variant='h5'>Create a Team</Typography>
          <TextField 
            id="outlined-basic" 
            label="Team name" 
            variant="outlined"
            onChange={this.handleInputChangeFor('team_name')}
          />
          <img style={{marginTop: '1rem'}} height='250' src= { Placeholder } />
          <input
            type='file'
            style={{display: 'none'}}
            ref={photoInput => this.photoInput = photoInput}
            onChange={this.photoSelectedHandler} 
          />
          <Button 
            variant='contained' 
            onClick={() => this.photoInput.click()} >
              Choose photo
          </Button>
          <center>
            <Button variant='contained' 
              color='primary'
              style={{marginTop: '2rem'}} 
              onClick={this.createTeam}>
              Submit
            </Button>
          </center>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateTeam);