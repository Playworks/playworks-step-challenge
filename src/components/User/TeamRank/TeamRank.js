import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import material ui
import { Typography } from '@material-ui/core';

class TeamRank extends Component {
  render() {
    return (
      <div className='teamRankDiv'>
        {this.props.store.leaderBoard.map((team, i) =>
          team.id === this.props.store.user.teams_id && (
            <div key={i} className='teamRank'>
              <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h6'>{team.sum} steps</Typography>
              <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h6'>Rank: {i +1}</Typography> 
            </div> 
          )
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamRank);