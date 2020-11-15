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
                <Typography variant='h5'>{this.props.contest.name}</Typography>
                <Typography variant='subtitle1'>{this.props.contest.date}</Typography>
                <Typography variant='body2'>{this.props.contest.description}</Typography>
                <Button>Edit Contest</Button>
            </Grid>
        </div>

    );
  }
}

export default connect(mapStoreToProps)(ContestsGridItem);