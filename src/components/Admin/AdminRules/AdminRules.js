import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import Placeholder from '../../../images/placeholder-vertical.jpg';
import AdminFAQ from '../AdminFAQ/AdminFAQ.js';
import './AdminRules.css';
import Nav from '../../Nav/Nav.js';

class AdminRules extends Component {
  state = {
    heading: 'Admin Rules',
  };

  render() {
    return (
      <div>
        <Nav />
      
      {/* <Grid container direction="column" alignItems="center" className="rulesFaq">
      <Grid item> */}
        <h2>Rules</h2>
      {/* </Grid>
      <Grid item className="pdf">
        <img  src={Placeholder} />
      </Grid>
      <Grid item>
        <button>Delete</button> 
      </Grid>
      <AdminFAQ />
    </Grid> */}
    </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminRules);