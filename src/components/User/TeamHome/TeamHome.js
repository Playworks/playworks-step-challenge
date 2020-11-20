import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamHome.css';
import TeamRank from '../TeamRank/TeamRank';
import TeamStepCount from '../TeamStepCount/TeamStepCount';
import ChallengeOfTheDay from '../Challenges/Challenges';
import TeamChallengePhotos from '../TeamChallengePhotos/TeamChallengePhotos';
import Nav from '../../Nav/Nav.js';
import TeamName from '../../User/TeamName/TeamName.js';
import ScrollingFooter from '../../ScrollingFooter/ScrollingFooter';

class TeamHome extends Component {
  componentDidMount() {
    this.getTeamDetails();
    this.getLeaderBoard();
  }


  getTeamDetails = () => {
    console.log('team number', this.props.store.user.teams_id);
    this.props.dispatch({
      type: 'FETCH_TEAM_DETAILS',
      payload: this.props.store.user.teams_id
    })
  }

  getLeaderBoard = () => {
    this.props.dispatch({
      type: 'FETCH_LEADER_BOARD',
      payload: this.props.store.user.teams_id
    })
  }

  render() {
    console.log('team home', this.props.history);
    
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

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(TeamHome);