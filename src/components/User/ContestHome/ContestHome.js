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
import RulesFaqBtn from '../RulesFaqBtn/RulesFaqBtn';
import Nav from '../../Nav/Nav.js';
import Footer from '../../Footer/Footer.js';
class ContestHome extends Component {
  
  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div>
        <Nav />
      <div className="container">
        <Leaderboard/>
        <TopSteppers/>
        <ChallengeOfTheDay/>
        <AllChallengePhotos/>
        <RulesFaqBtn/>
      </div>
      <Footer />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestHome);
