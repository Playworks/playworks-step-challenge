import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengesItem from '../ChallengesItem/ChallengesItem';
import { Typography } from '@material-ui/core';
import './Challenges.css';

class Challenges extends Component {

  componentDidMount() {
    this.setChallenges();
  }

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
              key={challenge.id}
              challenge={challenge}
            />
          </div>
              )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Challenges);