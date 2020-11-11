import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Placeholder from '../../../images/placeholder-square.png';
import { Grid } from "@material-ui/core";
import "./Rules.css";

class Rules extends Component {
  state = {
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
        <Grid>
          <h2>FAQ</h2>
        </Grid>
        <Grid>
          <button>Upload PDF</button>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(Rules);
