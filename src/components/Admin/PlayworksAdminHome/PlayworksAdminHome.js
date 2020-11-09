import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './PlayworksAdminHome.css';

class PlayworksAdminHome extends Component {
  state = {
    heading: 'Playworks Admin Home',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayworksAdminHome);