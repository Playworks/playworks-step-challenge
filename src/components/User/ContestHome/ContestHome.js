import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestHome.css';
// react multi carousel
import 'react-multi-carousel/lib/styles.css';
import Leaderboard from '../Leaderboard/Leaderboard';
import TopSteppers from '../TopSteppers/TopSteppers';
import AllChallengePhotos from '../AllChallengePhotos/AllChallengePhotos';
import ChallengeOfTheDay from '../Challenges/Challenges'
import { Button } from '@material-ui/core';

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
        <Button variant='contained' 
            color='default'
            size= 'large'>
            Rules & FAQ
        </Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestHome);
