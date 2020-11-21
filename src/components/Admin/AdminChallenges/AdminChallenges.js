import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengesGrid from '../ChallengesGrid/ChallengesGrid';
import CreateChallenges from '../CreateChallenges/CreateChallenges';
import Nav from '../../Nav/Nav.js';
import { Typography } from '@material-ui/core';
import './AdminChallenges.css';

class AdminChallenges extends Component {
  state = {
    heading: 'Challenges',
    description: '',
    date: ''
  };

  // on page load runs setChallenges
  componentDidMount() {
    this.setChallenges();
  };

  // function dispatches 'FETCH_CHALLENGES'
  setChallenges = () => {
    this.props.dispatch({
      type: 'FETCH_CHALLENGES'
    });
  };

  render() {
    return (
      <div>
        <Nav/>
        <div className='adminChallengesContainer'>
          <div className='adminChallengesHeader'>
            <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h4'>{this.state.heading}</Typography>
          </div>
          {this.props.store.challenges.map((challenge, i) => 
            <ChallengesGrid 
              key={challenge.id}
              challenge={challenge} />
              )}
          <CreateChallenges/>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminChallenges);