import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Challenges.css';
import { Typography } from '@material-ui/core';

class Challenges extends Component {
  state = {
    name: "Today's Challenge Title",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra suspendisse potenti nullam. Nisl nisi scelerisque eu ultrices.'
  };

  render() {
    return (
      <div className='challengeOfTheDay'>
        <Typography variant='h5'>Challenge of the Day</Typography>
        <Typography variant='subtitle1'>{this.state.name}</Typography>
    <Typography variant='body2'>{this.state.description}</Typography>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Challenges);