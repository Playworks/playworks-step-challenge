import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './SubmitPhotos.css';



class SubmitPhotos extends Component {
  

  render() {
    return (
      <div>
        <h1>submit photos</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SubmitPhotos);