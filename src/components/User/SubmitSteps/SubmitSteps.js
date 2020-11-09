import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './SubmitSteps.css';

class SubmitSteps extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h2>SubmitSteps</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SubmitSteps);