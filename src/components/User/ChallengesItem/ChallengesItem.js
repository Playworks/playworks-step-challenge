import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ChallengesItem.css';
import {Typography} from '@material-ui/core';
import moment from 'moment';

class ChallengesItem extends Component {

  render() {
      
    return (
        <div>
            {this.props.challenge.date.substring(0,10) === moment(Date()).format().substring(0,10) ? 
            <div className='challengeOfTheDay'>
                <Typography variant='h5'>Challenge of the Day</Typography>
                <Typography variant='subtitle1'>{this.props.challenge.name}</Typography>
                <Typography variant='body2'>{this.props.challenge.description}</Typography>
            </div>
             : ''}             
        </div>
    );
  }
}

export default connect(mapStoreToProps)(ChallengesItem);