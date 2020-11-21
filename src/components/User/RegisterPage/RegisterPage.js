import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import component
import RegisterForm from '../RegisterForm/RegisterForm';
// import css
import '../RegisterPage/RegisterPage.css';
// import logo
import Logo from '../../../images/PW-hor-logo.png';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <center>
          <img className='registerLogo' src= {Logo} alt=""/>
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