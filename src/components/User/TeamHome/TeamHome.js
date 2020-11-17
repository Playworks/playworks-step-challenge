import React, { Component } from 'react';

import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamHome.css';
import TeamRank from '../TeamRank/TeamRank';
import TeamStepCount from '../TeamStepCount/TeamStepCount';
import { Typography } from '@material-ui/core';
import ChallengeOfTheDay from '../Challenges/Challenges';
import TeamChallengePhotos from '../TeamChallengePhotos/TeamChallengePhotos';
import RulesFaqBtn from '../RulesFaqBtn/RulesFaqBtn';
import Nav from '../../Nav/Nav.js';
import Footer from '../../Footer/Footer.js';
import TeamName from '../../User/TeamName/TeamName.js';

class TeamHome extends Component {
  componentDidMount() {
    this.getTeamDetails()
  }


  getTeamDetails = () => {
    console.log('team number', this.props.store.user.teams_id);
    this.props.dispatch({
      type: 'FETCH_TEAM_DETAILS',
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
            <TeamRank/>
          </div>
          <TeamStepCount/>
          <ChallengeOfTheDay/>
          <TeamChallengePhotos/>
        </div>
        <div className='footer'>
         <Footer />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(TeamHome);