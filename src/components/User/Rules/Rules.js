import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import VerticalPlaceholder from '../../../images/placeholder-vertical.jpg';
import FAQ from '../../User/FAQ/FAQ';
import { Grid } from "@material-ui/core";


class Rules extends Component {
  state = {
    heading: 'Rules',
  };

  render() {
    return (
      <div>
        <Grid container direction="column" alignItems="center" className="rulesFaq">
          <Grid item>
            <h2>Rules</h2>
          </Grid>
        <Grid item className="pdf">
          <img  src={VerticalPlaceholder} />
        </Grid>
          <FAQ />
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Rules);
