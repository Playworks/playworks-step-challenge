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
        
        {this.props.store.leaderBoard.map((team, i) =>
          team.id === this.props.store.user.teams_id && (
            <div>
          <Typography variant='h6'>{team.sum} steps</Typography>
          <Typography variant='h6'>Rank: {i +1}</Typography> 
          </div> 
          )
          )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamRank);