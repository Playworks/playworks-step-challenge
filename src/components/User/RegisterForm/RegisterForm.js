import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import './RegisterForm.css';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    photo: '',
    contests_id: '', 
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
        contests_id: this.state.contests_id,
      },
    });
    this.props.history.push('/createorjointeam');
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleFinishedUpload = info => {
    console.log('File uploaded with filename', info.filename)
    console.log('Access it on s3 at', info.fileUrl)
    this.setState({
      photo: info.fileUrl
    });
  };

  render() {
    console.log('this is props', this.props);

    const uploadOptions = {
      server: 'http://localhost:5000',
      // signingUrlQueryParams: {uploadType: 'avatar'},
  }

    const s3Url = `http://playworks-step-challenge.s3.amazonaws.com`;

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
          value={this.state.password} 
          label="Password" 
          variant="outlined"
          type="password"
          onChange={this.handleInputChangeFor('password')}>
        </TextField>
        </div>
        <div className='registerItem'>
          <FormControl>
            <InputLabel style={{paddingLeft:14}}>
              Select Contest
            </InputLabel> 
            <Select value={this.state.contests_id} variant='outlined' style={{width:195}} onChange={this.handleInputChangeFor('contests_id')}>
              {this.props.store.contest.map(contest => 
              <MenuItem key={contest.id} value={contest.id}>{contest.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div className='registerItem'>
          <label htmlFor="photo">
            Photo:
            <DropzoneS3Uploader
                onFinish={this.handleFinishedUpload}
                s3Url={s3Url}
                maxSize={1024 * 1024 * 5}
                upload={uploadOptions}
            />
          </label>
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
