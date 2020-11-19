import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamChallengePhotos.css';
import { Card } from '@material-ui/core';
import TeamFeedInfo from './TeamFeedInfo';
class TeamChallengePhotos extends Component {

  componentDidMount() {
    if(this.props.store.user.admin === 'CAPTAIN'){
      this.getCaptainTeamPhotos();
    }
    else if(this.props.store.user.admin === 'USER'){
      this.getUserTeamPhotos();
    }
  }

  // Makes get request for all photos that are have a status of TRUE || FALSE in approved column by teams id
  getCaptainTeamPhotos = () => {
    this.props.dispatch({
      type: 'FETCH_CAPTAIN_TEAM_PHOTOS',
      payload: this.props.store.user.teams_id
    })
  }

  // Makes get request for photos that have been approved by teams id
  getUserTeamPhotos = () => {
    this.props.dispatch({
      type: 'FETCH_USER_TEAM_PHOTOS',
      payload: this.props.store.user.teams_id
    })
  }

  render() {
    return (
      <div className='imageFeed'>
        { this.props.store.teamPhotos.map( ( photo, i ) => 
          <div key={i} className='imageFeedCard'>
            <Card style={{width: '300px'}}>
              <div className='dailyChallengeImageContainer'>
                <img className='dailyChallengeImage' src={photo.file_url}/>
              </div>
              <Card>
                <TeamFeedInfo photo={photo}/>
              </Card>
            </Card>
          </div>
          )}
        </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamChallengePhotos);