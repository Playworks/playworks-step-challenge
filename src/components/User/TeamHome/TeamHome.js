import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import components
import ChallengeOfTheDay from '../Challenges/Challenges';
import Nav from '../../Nav/Nav.js';
import ScrollingFooter from '../../ScrollingFooter/ScrollingFooter';
import TeamChallengePhotos from '../TeamChallengePhotos/TeamChallengePhotos';
import TeamName from '../../User/TeamName/TeamName.js';
import TeamRank from '../TeamRank/TeamRank';
import TeamStepCount from '../TeamStepCount/TeamStepCount';
// import css 
import './TeamHome.css';

class TeamHome extends Component {
  // runs both functions on page load
  componentDidMount() {
    this.getTeamDetails();
    this.getLeaderBoard();
  }

  // function sends dispatch to get leader board info
  getLeaderBoard = () => {
    this.props.dispatch({
      type: 'FETCH_LEADER_BOARD',
      payload: this.props.store.user.teams_id
    });
  };

  // function sends dispatch to get team details
  getTeamDetails = () => {
    this.props.dispatch({
      type: 'FETCH_TEAM_DETAILS',
      payload: this.props.store.user.teams_id
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <div className='teamPhotoContainer'>
          <div className='teamHomeHeader'>
            <TeamName />
            <TeamRank getTeamDetails={this.getTeamDetails}/>
          </div>
          <TeamStepCount/>
          <ChallengeOfTheDay/>
          <TeamChallengePhotos/>
        </div>
        <ScrollingFooter/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamHome);