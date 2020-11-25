import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import components
import AllChallengePhotos from '../AllChallengePhotos/AllChallengePhotos';
import ChallengeOfTheDay from '../Challenges/Challenges'
import Leaderboard from '../Leaderboard/Leaderboard';
import Nav from '../../Nav/Nav.js';
import ScrollingFooter from '../../ScrollingFooter/ScrollingFooter';
import TopSteppers from '../TopSteppers/TopSteppers';
// import react multi carousel
import 'react-multi-carousel/lib/styles.css';
// import css
import './ContestHome.css';

class ContestHome extends Component {
  // On page load runs these four functions
  componentDidMount() {
    this.checkAdmin();
    this.getLeaderBoard();
    this.getTopSteppers();
    this.getUserInfo();
  };

  // Functions checks user admin level if admin pushes to admin view
  checkAdmin = () => {
    if (this.props.store.user.admin === 'ADMIN') {
      this.props.history.push('/adminhome')
    };
  };
  
  // Function dispatches to get info for leaderboard
  getLeaderBoard = () => {
    this.props.dispatch({
      type: "FETCH_LEADER_BOARD"
    });
  };

  // Function dispatches to get top steppers
  getTopSteppers = () => {
    this.props.dispatch({
      type: "FETCH_TOP_STEPPERS"
    });
  };

  // Function dispatches to get user info 
  getUserInfo = () => {
    this.props.dispatch({
      type: 'FETCH_USER'
    });
  };
  
  render() {    
    return (
      <div >
        <Nav />
        <div className="container">
          <Leaderboard/>
          <TopSteppers/>
          <ChallengeOfTheDay/>
          <AllChallengePhotos/>
        </div>
        <ScrollingFooter/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestHome);