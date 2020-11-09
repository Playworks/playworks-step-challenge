import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AllChallengePhotos.css';

class AllChallengePhotos extends Component {
  state = {
    heading: 'All Challenge Photos',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AllChallengePhotos);