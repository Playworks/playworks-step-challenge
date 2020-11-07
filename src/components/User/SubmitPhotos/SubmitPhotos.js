import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class SubmitPhotos extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <h2>SubmitPhotos</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SubmitPhotos);