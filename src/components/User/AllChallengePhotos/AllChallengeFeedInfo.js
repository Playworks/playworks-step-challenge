import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid, Typography } from '@material-ui/core';

class AllChallengeFeedInfo extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <div className='feedInfo'>
            <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={3}>
                <div className='feedAvatarDiv'>
                    <img className='feedAvatar' src={this.props.photo.image_path}/>
                </div>
                </Grid>
                <Grid item xs={9}>
                <div className='feedDescription'>
                    <Typography variant='body2'>{this.props.photo.username}</Typography>
                    <Typography variant='body2'>TEAM NAME HERE</Typography>
                    <Typography variant='body2'>{this.props.photo.name}</Typography>
                </div>
                </Grid>
            </Grid>
            </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AllChallengeFeedInfo);
