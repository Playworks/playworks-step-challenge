import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';

class AdminChallengesItem extends Component {
  state = {
    heading: 'AdminChallengesItem',
  };

  render() {
    return (
      <div>
        <Grid item xs={4}>
            <Typography variant='h5'>{this.props.challenge.name}</Typography>
            <Typography variant='subtitle1'>{this.props.challenge.date}</Typography>
            <Typography variant='body2'>{this.props.challenge.description}</Typography>
            <Button>Edit Challenge</Button>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminChallengesItem);
