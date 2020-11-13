import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';
import moment from 'moment';

class ChallengesGridItem extends Component {
  state = {
    heading: 'ChallengesGridItem',
  };

  render() {
    return (
      <div>
        <Grid item xs={4}>
            <Typography variant='h5'>{this.props.challenge.name}</Typography>
            <Typography variant='subtitle1'>{moment(this.props.challenge.date).format('MMMM Do YYYY')}</Typography>
            <Typography variant='body2'>{this.props.challenge.description}</Typography>
            <Button>Edit Challenge</Button>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChallengesGridItem);
