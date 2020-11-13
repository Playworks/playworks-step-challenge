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
            <div className='imageFeedCard' key={i}>
                <Card style={{width: '300px'}}>
                  <div className='dailyChallengeImage'>
                    <img src={photo.file_url} />
                  </div>
                <Card>
                    <div className='feedInfo'>
                      <div className='feedAvatarDiv'>
                        <img className='feedAvatar' src={photo.image_path}/>
                      </div>
                      <div className='feedDescription'>
                        <Typography variant='body2'>{photo.username}</Typography>
                        <Typography variant='body2'>{photo.name}</Typography>
                        <Typography variant='body2'>{photo.description}</Typography>
                      </div>
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