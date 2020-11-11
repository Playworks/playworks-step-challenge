import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestHome.css';
import { Paper, Typography } from '@material-ui/core';
// react multi carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Challenges from '../Challenges/Challenges';
import Leaderboard from '../Leaderboard/Leaderboard';
import TopSteppers from '../TopSteppers/TopSteppers';
import AllChallengePhotos from '../AllChallengePhotos/AllChallengePhotos';
import ChallengeOfTheDay from '../Challenges/Challenges'

class ContestHome extends Component {
  
  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <Leaderboard />
        <TopSteppers />
        <ChallengeOfTheDay/>
        <AllChallengePhotos/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestHome);
