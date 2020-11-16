import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengesGridItem from '../ChallengesGridItem/ChallengesGridItem';
import { Card } from '@material-ui/core';

import './ChallengesGrid.css';

class ChallengesGrid extends Component {

  render() {
    return (
      <div className='challengesGrid'>
        <Card style={{width: '300px', minHeight: '150px'}}>
          <ChallengesGridItem
            key={this.props.challenge.id}
            challenge={this.props.challenge}
          />
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ChallengesGrid);
