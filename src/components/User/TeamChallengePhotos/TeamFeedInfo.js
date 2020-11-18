import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';

class TeamFeedInfo extends Component {

  denyImage = (value) => {
    console.log('this button works', value);
    this.props.dispatch({
      type: 'DELETE_PHOTOS',
      payload: value
    })
    this.props.dispatch({
      type: 'SUBTRACT_STEPS',
      payload: value
    })
    setTimeout(this.props.getPhotos(), 1000);
    this.props.dispatch({
      type: 'FETCH_TEAM_DETAILS',
      payload: this.props.store.user.teams_id
    })
  }

  approveImage = (value) => {
    console.log('this button works', value);
    this.props.dispatch({
      type: 'APPROVE_PHOTOS',
      payload: value
    })
  }

  render() {
    console.log('THIS PHOTOS PROPS', this.props.photo);
    
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
                        <Typography variant='body2'>{this.props.photo.name}</Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
                {this.props.store.user.admin === "CAPTAIN" && this.props.photo.approved === false ?
                  <div className='approveDenyImageBtns'>
                    <Button style={{marginRight: '40px'}} variant="contained" color="primary" onClick={() => this.approveImage(this.props.photo.id)}>Approve</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.denyImage(this.props.photo)}>Deny</Button>
                  </div> : null
                  }
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamFeedInfo);
