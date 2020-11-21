import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';

class ContestsGridItem extends Component {
  state = {
    heading: 'ContestsGridItem',
  };

  render() {
    return (
      <div>
        <Grid item xs={4}>
          <Typography variant='h5'>Oops</Typography>
          <Typography variant='subtitle1'>messed</Typography>
          <Typography variant='body2'>this up</Typography>
          <Button>Edit Contest</Button>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestsGridItem);