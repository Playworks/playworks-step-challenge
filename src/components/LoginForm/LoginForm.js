import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';
import './LoginForm.css';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.login}>

        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div className='loginItem loginUsername'>
          <TextField 
            id="outlined-basic" 
            name="username"  
            htmlFor="username" 
            value={this.state.username}
            label="Username" 
            variant="outlined"
            type="text"
            required
            onChange={this.handleInputChangeFor('username')}>
          </TextField>
        </div>
        <div className='loginItem loginPassword'>
          <TextField 
            id="outlined-basic" 
            required
            name="password"  
            htmlFor="password" 
            value={this.state.password} 
            label="Password" 
            variant="outlined"
            type="password"
            onChange={this.handleInputChangeFor('password')}>
          </TextField>
        </div>
        <div className="loginItem loginBtn">
          <Button 
            variant='contained'
            style={{ color: 'white', marginTop: '1rem', fontSize: 18, background: '#054f95'}} 
            color='primary'
            className="btn" 
            type="submit" 
            name="submit" 
            value="Log In">
            Login
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
