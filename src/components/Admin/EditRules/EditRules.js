import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import Placeholder from '../../../images/placeholder-vertical.jpg';
import EditFAQ from '../EditFAQ/EditFAQ.js';
import './EditRules.css';
import AdminNav from '../../Admin/AdminNav/AdminNav.js';

class EditRules extends Component {
  state = {
    heading: 'Edit Rules',
  };

  render() {
    return (
      <div>
        <AdminNav />
      
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
    </Grid></div>
    );
  }
}

export default connect(mapStoreToProps)(EditRules);