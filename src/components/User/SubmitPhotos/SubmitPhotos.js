import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './SubmitPhotos.css';

class SubmitPhotos extends Component {
  state = {
    heading: 'Submit Photos',
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