import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamChallengePhotos.css';

class TeamChallengePhotos extends Component {
  state = {
    heading: 'Team Challenge Photos',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamChallengePhotos);