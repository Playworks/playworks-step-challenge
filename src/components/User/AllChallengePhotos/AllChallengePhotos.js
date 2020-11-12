import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AllChallengePhotos.css';
import { Card, Typography } from '@material-ui/core';

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
            <div key={i} className='imageFeedCard'>

                <Card style={{width: '300px'}}>
                  <div className='dailyChallengeImage'>
                    <img src={photo.file_url} />
                  </div>
                  <Card>
                    <img className='avatarFeed' src={photo.image_path}/>
                    <div className='feedInfo'>
                    <Typography variant='body2'>User: {photo.username}</Typography>
                    <Typography variant='body2'>Challenge Name: {photo.name}</Typography>
                    <Typography variant='body2'>Challenge Description: {photo.description}</Typography>
                    </div>
                </Card>
                </Card>
            </div>
          )}
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AllChallengePhotos);