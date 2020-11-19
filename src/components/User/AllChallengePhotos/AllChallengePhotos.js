import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AllChallengePhotos.css';
import { Card } from '@material-ui/core';
import AllChallengeFeedInfo from './AllChallengeFeedInfo';

class AllChallengePhotos extends Component {

  componentDidMount() {
    this.setChallengePhotos();
  }

  setChallengePhotos = () => {
    this.props.dispatch({
      type: 'FETCH_CHALLENGE_PHOTOS',
    });
  }

  render() {
    return (
        <div className='imageFeed'>
        { this.props.store.challengePhotos.map( ( photo, i ) => 
            <div className='imageFeedCard' key={i}>
              <Card style={{width: '300px'}}>
                <div className='dailyChallengeImageContainer'>
                  <img className='dailyChallengeImage' src={photo.photos_file_url} alt="" />
                </div>
                <Card>
                  <AllChallengeFeedInfo key={i} photo={photo}/>
                </Card>
              </Card>
            </div>
          )}
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AllChallengePhotos);