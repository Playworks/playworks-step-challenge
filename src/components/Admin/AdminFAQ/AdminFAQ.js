import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import Placeholder from '../../../images/placeholder-vertical.jpg';
import AdminRules from '../AdminRules/AdminRules.js';
import './AdminFAQ.css';
import Nav from '../../Nav/Nav.js';

class AdminFAQ extends Component {
  state = {
    heading: 'Admin FAQ',
  };

  render() {
    return (
      <div>
        <Nav />
      
      {/* <Grid container direction="column" alignItems="center" className="FAQFaq">
      <Grid item> */}
        <h2>FAQ</h2>
      {/* </Grid>
      <Grid item className="pdf">
        <img  src={Placeholder} />
      </Grid>
      <Grid item>
        <button>Delete</button> 
      </Grid>
      <AdminRules />
    </Grid> */}
    </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminFAQ);