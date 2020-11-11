import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import './RegisterForm.css'

class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    photo: '',
    contestId: '',
  };

  componentDidMount() {
    // Dispatching fetch contest on this page load so that users have access contest for drop down.
    this.props.dispatch({ type: 'FETCH_CONTEST'});
  }

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        photo: this.state.photo,
        contestId: this.state.contestId
      },
    });
    this.props.history.push('/createorjointeam');
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function sets state of photo to selected file/image in photo input.
  photoSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      photo: event.target.files[0],
    });
  };

  render() {
    console.log('this is state', this.state);
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div className='registerItem registerFirstName'>
          <TextField 
            id="outlined-basic" 
            name="first_name" 
            required 
            htmlFor="first_name" 
            value={this.state.first_name} 
            label="First Name" 
            variant="outlined"
            type="text"
            onChange={this.handleInputChangeFor('first_name')}>
          </TextField>
      </div>
        <div className='registerItem registerLastName'>
          <TextField 
            id="outlined-basic" 
            name="last_name" 
            required 
            htmlFor="last_name" 
            value={this.state.last_name} 
            label="Last Name" 
            variant="outlined"
            type="text"
            onChange={this.handleInputChangeFor('last_name')}>
          </TextField>
        </div>
        <div className='registerItem registerEmail'>
          <TextField 
            id="outlined-basic" 
            name="email" 
            required 
            htmlFor="email" 
            value={this.state.email} 
            label="Email" 
            variant="outlined"
            type="text"
            onChange={this.handleInputChangeFor('email')}>
          </TextField>
        </div>
        <div className='registerItem registerUserName'>
          <TextField 
            id="outlined-basic" 
            name="username" 
            required 
            htmlFor="username" 
            value={this.state.username} 
            label="Username" 
            variant="outlined"
            type="text"
            onChange={this.handleInputChangeFor('username')}>
          </TextField>
        </div>
        <div className='registerItem registerPassword'>
          <TextField 
          id="outlined-basic" 
          name="password" 
          required 
          htmlFor="password" 
          value={this.state.username} 
          label="Password" 
          variant="outlined"
          type="password"
          onChange={this.handleInputChangeFor('password')}>
        </TextField>
        </div>
        <div className='registerItem registerSelectContest'>
          <FormControl required variant='outlined' style={{minWidth: '60%'}}>
            <InputLabel id="demo-simple-select-helper-label">Select Contest</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.contestId}
              onChange={this.handleInputChangeFor('contestId')}
              >
              {this.props.store.contest.map(contest => 
              <MenuItem key={contest.id} value={contest.id}>{contest.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div className='registerItem registerProfilePhoto' >
          <InputLabel style={{marginTop: '1.5rem'}}>Upload Profile Image</InputLabel>
          <Input className="registerItem" disableUnderline={true} style={{marginLeft: '3.5rem'}} type="file" onChange={this.photoSelectedHandler}></Input>
        </div>
        <div className="registerItem registerBtn">
          <Button 
            variant='contained'
            style={{ color: 'white', marginTop: '1rem', fontSize: 18, background: '#054f95'}} 
            color='primary'
            className="btn" 
            type="submit" 
            name="submit" 
            value="Register">
            Register
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(RegisterForm));
