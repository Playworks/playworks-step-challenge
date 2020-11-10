import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamRank.css';
import { Typography } from '@material-ui/core';

class TeamRank extends Component {
  state = {
    rank: 7,
    stepCount: 3325,
  };

  render() {
    return (
      <div>
        <Typography variant='h6'>{this.state.stepCount} steps</Typography>
        <Typography variant='h6'>Rank: {this.state.rank}</Typography>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamRank);