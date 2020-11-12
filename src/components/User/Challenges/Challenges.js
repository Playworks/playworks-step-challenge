import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengesItem from '../ChallengesItem/ChallengesItem';
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
      <div className='challengeOfTheDay'>
        {this.props.store.challenges.map((challenge, i) => 
                <ChallengesItem
                  key={challenge.id}
                  challenge={challenge}
                />
              )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Challenges);