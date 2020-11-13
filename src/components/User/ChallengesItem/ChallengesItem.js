import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ChallengesItem.css';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';

class ChallengesItem extends Component {

  render() {
      
    return (
        <div className='challengeOfTheDay'>
            {this.props.challenge.date.substring(0,10) === moment(Date()).format().substring(0,10) ? 
            <div className='challengeOfTheDaySubtitleAndDescription'>
                <Typography variant='subtitle1'><Box fontWeight='fontWeightBold' display='inline'>{this.props.challenge.name}</Box></Typography>
                <Typography variant='body2'>{this.props.challenge.description}</Typography>
            </div>
             : ''}             
        </div>
    );
  }
}

export default connect(mapStoreToProps)(ChallengesItem);