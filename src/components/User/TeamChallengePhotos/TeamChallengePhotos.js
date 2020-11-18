import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamChallengePhotos.css';
import { Card } from '@material-ui/core';
import TeamFeedInfo from './TeamFeedInfo';
class TeamChallengePhotos extends Component {

  componentDidMount() {
    this.getTeamPhotos();
  }

  getTeamPhotos = () => {
    console.log('team number', this.props.store.user.teams_id);
    
    this.props.dispatch({
      type: 'FETCH_TEAM_PHOTOS',
      payload: this.props.store.user.teams_id
    })
  }

  render() {
    return (
      <div className='imageFeed'>
        { this.props.store.teamPhotos.map( ( photo, i ) => 
        <div className='imageFeedCard'>
            <Card style={{width: '300px'}}>
              <div className='dailyChallengeImageContainer'>
                <img className='dailyChallengeImage' key={i} src={photo.file_url}/>
              </div>
              <Card>
                <TeamFeedInfo key={i} photo={photo} getPhotos={()=>this.getTeamPhotos}/>
              </Card>
            </Card>
          </div>
          )}
        </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamChallengePhotos);