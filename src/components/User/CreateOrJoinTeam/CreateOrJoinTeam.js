import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import components
import CreateTeamLink from './CreateTeamLink';
import JoinTeamLink from './JoinTeamLink';
// import css
import './CreateOrJoinTeam.css';
// import image
import Logo from '../../../images/PW-Square-logo.png';

class CreateOrJoinTeam extends Component {
  // Function pushes newly registered user to create team
  createTeam = () => {
    this.props.history.push('/createteam');
  };

  // Function pushes newly registered user to join team
  joinTeam = () => {
    this.props.history.push('/jointeam');
  };

  render() {
    return (
      <div>
        <center>
          <img className='createJoinLogo' src={Logo} alt=""/>
          <div onClick={this.createTeam}>
            <CreateTeamLink/>
          </div>
          <div onClick={this.joinTeam}>
            <JoinTeamLink/>
          </div>
          <div id='createJoinFooter'>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
              Log Out
            </button>
          </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateOrJoinTeam);