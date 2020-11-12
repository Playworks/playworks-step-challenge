import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import './EditFAQ.css';
import AdminNav from '../../Admin/AdminNav/AdminNav.js';

class EditFAQ extends Component {
  state = {
    heading: 'Edit FAQ',
  };

  render() {
    return (
        <Grid container direction="column" alignItems="center" className="rulesFaq">
        <Grid item>
          <h2>FAQ</h2>
        </Grid>
        <Grid item>
          <button>Upload PDF</button>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(EditFAQ);