import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    photo: ''
  };

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
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="first_name">
            First Name:
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              required
              onChange={this.handleInputChangeFor('first_name')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Last Name:
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              required
              onChange={this.handleInputChangeFor('last_name')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleInputChangeFor('email')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="photo">
            Photo:
            <input
              type="file"
              required
              onChange={this.photoSelectedHandler}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(RegisterForm));
