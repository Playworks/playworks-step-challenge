import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ChallengesItem.css';
import moment from 'moment';

class ChallengesItem extends Component {

  render() {
      
    return (
        <div>
            {this.props.challenge.date.substring(0,10) === moment(Date()).format().substring(0,10) ? 
            <div>
                <h2>{this.props.challenge.name}</h2> 
                <p>{this.props.challenge.description}</p>
            </div>
             : ''}
        </div>
    );
  }
}

export default connect(mapStoreToProps)(ChallengesItem);