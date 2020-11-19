import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import ChallengeDataBox from './ChallengeDataBox';

// Component holds full list of challenges
// and their respective child functions
class ChallengesGridItem extends Component {
  fetchChallenges = () => {
    this.props.dispatch({
      type: 'FETCH_CHALLENGES'
    })
  }
  render() {   
    return (
      <div className='adminChallengesGridItem'>
        <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}></Grid>
        <Grid item xs={12}>
        <ChallengeDataBox
        challenge={this.props.challenge}
        />
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChallengesGridItem);
