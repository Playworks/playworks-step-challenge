import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import component
import ChallengesItem from '../ChallengesItem/ChallengesItem';
// import material ui
import { Typography } from '@material-ui/core';
// import css
import './Challenges.css';

class Challenges extends Component {
  // runs setChallenges function on page load
  componentDidMount() {
    this.setChallenges();
  }

  // Function sends dispatch to saga listening for FETCH_CHALLENGES to get challenges to display
  setChallenges = () => {
    this.props.dispatch({
      type: 'FETCH_CHALLENGES'
    });
  }

  render() {
    return (
      <div>
        <div className='challengeOfTheDayHeadline'>
          <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h5'>Challenge of the Day</Typography>
        </div>
        {this.props.store.challenges.map((challenge, i) => 
          <div className='challengesItem' key={i}>
            <ChallengesItem
              challenge={challenge}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Challenges);