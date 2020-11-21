import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid, Typography } from '@material-ui/core';

class AllChallengeFeedInfo extends Component {

    
  render() {
    console.log('this is props in allchallengefeedinfo', this.props);
    return (
        <div className='feedInfo'>
            <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={3}>
                <div className='feedAvatarDiv'>
                    <img className='feedAvatar' src={this.props.photo.user_image_path} alt=""/>
                </div>
                </Grid>
                <Grid item xs={9}>
                <div className='feedDescription'>
                    <Typography variant='body2'>{this.props.photo.username}</Typography>
                    <Typography variant='body2'>{this.props.photo.team_name}</Typography>
                    <Typography variant='body2'>{this.props.photo.company_name}</Typography>
                    <Typography variant='body2'>{this.props.photo.challenge_name}</Typography>
                </div>
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AllChallengeFeedInfo);
