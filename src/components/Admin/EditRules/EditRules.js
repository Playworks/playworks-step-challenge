import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import Placeholder from '../../../images/placeholder-square.png';
import EditFAQ from '../EditFAQ/EditFAQ.js';
import './EditRules.css';

class EditRules extends Component {
  state = {
    heading: 'Edit Rules',
  };

  render() {
    return (
      <Grid container direction="column" alignItems="center" className="rulesFaq">
      <Grid item>
        <h2>Rules</h2>
      </Grid>
      <Grid item className="pdf">
        <img  src={Placeholder} />
      </Grid>
      <Grid item>
        <button>Delete</button> 
      </Grid>
      <EditFAQ />
    </Grid>
    );
  }
}

export default connect(mapStoreToProps)(EditRules);