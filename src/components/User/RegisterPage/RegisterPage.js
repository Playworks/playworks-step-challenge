import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import Logo from '../../../images/PW-hor-logo.png';
import '../RegisterPage/RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <center>
          <img className='registerLogo' src= {Logo}/>
          <RegisterForm />
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Already a member? Login
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
