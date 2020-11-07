import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class Rules extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h2>Rules</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Rules);
