import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AllChallengePhotos.css';
import { Card, Grid, Typography } from '@material-ui/core';

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
                  <img className='dailyChallengeImage' src={photo.file_url} />
                </div>
                <Card>
                <div className='feedInfo'>
                  <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={3}>
                      <div className='feedAvatarDiv'>
                            <img className='feedAvatar' src={photo.image_path}/>
                          </div>
                      </Grid>
                      <Grid item xs={9}>
                        <div className='feedDescription'>
                          <Typography variant='body2'>{photo.username}</Typography>
                          <Typography variant='body2'>TEAM NAME HERE</Typography>
                          <Typography variant='body2'>{photo.name}</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
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