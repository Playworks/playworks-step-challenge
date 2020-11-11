import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from "@material-ui/core";
import VerticalPlaceholder from '../../../images/placeholder-vertical.jpg';

class FAQ extends Component {
  state = {
    heading: 'FAQ',
  };

  render() {
    return (
        <Grid container direction="column" alignItems="center" className="rulesFaq">
            <Grid item>
                <h2>FAQ</h2>
            </Grid>
            <Grid item className="pdf">
                <img  src={VerticalPlaceholder} />
            </Grid>
        </Grid>
    );
  }
}

export default connect(mapStoreToProps)(FAQ);