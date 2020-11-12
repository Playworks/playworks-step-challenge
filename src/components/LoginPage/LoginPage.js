import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';
import Logo from '../../images/PW-Square-logo.png';

class LoginPage extends Component {
  render() {
    return (
      <div className='centered'>
        <center>
          <img className='loginLogo' src= {Logo}/>
          <LoginForm />
          <div className='registerBtn'>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                this.props.history.push('/registration');
              }}
            >
              New here? Register
            </button>
          </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
