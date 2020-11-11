import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Challenges.css';
import CreateChallenges from '../CreateChallenges/CreateChallenges';
import { Typography } from '@material-ui/core';

class Challenges extends Component {
  state = {
    heading: 'Challenges',
    description: '',
    date: ''
  };

  render() {
    return (
        <div>
            <Typography variant='h5'>{this.state.heading}</Typography>
            <CreateChallenges/>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(Challenges);