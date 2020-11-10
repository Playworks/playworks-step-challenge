import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestHome.css';
import Leaderboard from '../Leaderboard/Leaderboard';
import TopSteppers from '../TopSteppers/TopSteppers';
import AllChallengePhotos from '../AllChallengePhotos/AllChallengePhotos';


class ContestHome extends Component {

  state = {
  };
  
  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <Leaderboard />
        <TopSteppers />
        <AllChallengePhotos />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestHome);
