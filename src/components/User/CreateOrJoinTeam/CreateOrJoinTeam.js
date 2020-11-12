import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateOrJoinTeam.css';
import Logo from '../../../images/PW-Square-logo.png';
// material ui
import { Typography } from '@material-ui/core';

import CreateTeamLink from './CreateTeamLink';
import JoinTeamLink from './JoinTeamLink';

class CreateOrJoinTeam extends Component {

  createTeam = () => {
    this.props.history.push('/createteam');
  }

  joinTeam = () => {
    this.props.history.push('/jointeam');
  }

  render() {
    return (
      <div>
        <center>
          <div className='pwLogo'>
            <img src={Logo}/>
          </div>
          <div onClick={this.createTeam}>
            <CreateTeamLink/>
          </div>
          <div onClick={this.joinTeam}>
            <JoinTeamLink/>
          </div>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
            Log Out
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateOrJoinTeam);