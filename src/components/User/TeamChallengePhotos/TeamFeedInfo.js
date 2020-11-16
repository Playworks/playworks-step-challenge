import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';

class TeamFeedInfo extends Component {

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
                        <Typography variant='body2'>{this.props.photo.name}</Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
                {this.props.store.user.admin === "CAPTAIN" && 
                  <div className='approveDenyImageBtns'>
                    <Button style={{marginRight: '40px'}} variant="contained" color="primary">Approve</Button>
                    <Button variant="contained" color="secondary">Deny</Button>
                  </div>
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
