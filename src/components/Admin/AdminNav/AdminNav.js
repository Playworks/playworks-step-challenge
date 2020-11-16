import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import './AdminNav.css';
import mapStoreToProps from '../../../redux/mapStoreToProps';

const AdminNav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Playworks Step Challenge</h2>
      </Link>
      <div className="nav-right">
        {/*
        <Link className="nav-link" to={loginLinkData.path}>
           Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not 
          {loginLinkData.text}
        </Link>*/}
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <Link className="nav-link" to="/adminhome">
              Home
            </Link>
            {/* <Link className="nav-link" href="#createContest">
              Add Contest
            </Link> */}
            <Link className="nav-link" to="/editchallenges">
              Add/Edit Challenges
            </Link>
            <Link className="nav-link" to="/editrules">
              Edit Rules/FAQ
            </Link>
            {/* <Link className="nav-link" to="/editfaq">
              Edit FAQ
            </Link> */}
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        {/* <Link className="nav-link" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(AdminNav);