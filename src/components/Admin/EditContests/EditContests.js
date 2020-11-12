import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './EditContests.css';
import AdminNav from '../../Admin/AdminNav/AdminNav.js';

class EditContests extends Component {
  state = {
    heading: 'Edit Contests',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditContests);