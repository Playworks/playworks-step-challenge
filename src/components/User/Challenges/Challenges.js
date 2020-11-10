import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengesItem from '../ChallengesItem/ChallengesItem';
import './Challenges.css';
import { Typography } from '@material-ui/core';

class Challenges extends Component {
  state = {
    name: "Today's Challenge Title",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra suspendisse potenti nullam. Nisl nisi scelerisque eu ultrices.'
  };

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
        <h2>{this.state.heading}</h2>
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