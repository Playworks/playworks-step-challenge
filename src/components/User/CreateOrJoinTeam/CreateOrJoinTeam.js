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
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateOrJoinTeam);