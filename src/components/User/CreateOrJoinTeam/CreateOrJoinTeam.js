import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateOrJoinTeam.css';

class CreateOrJoinTeam extends Component {
  state = {
    heading: 'Create Or Join Team',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/createteam');
            }}
          >
            Create Team
          </button>
        </center>
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/jointeam');
            }}
          >
            Join Team
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateOrJoinTeam);