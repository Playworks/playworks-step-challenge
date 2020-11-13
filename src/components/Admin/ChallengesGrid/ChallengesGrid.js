import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengesGridItem from '../ChallengesGridItem/ChallengesGridItem';
import { Grid } from '@material-ui/core';
import './ChallengesGrid.css';

class ChallengesGrid extends Component {
  state = {
    heading: 'Challenges Grid',
  };

  render() {
    return (
      <div className='challengesGrid'>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <ChallengesGridItem
                key={this.props.challenge.id}
                challenge={this.props.challenge}
                />
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChallengesGrid);
