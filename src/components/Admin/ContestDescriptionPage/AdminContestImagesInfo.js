import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';


class AdminContestImagesInfo extends Component {

  render() {
    return (
        <div className='adminContestImageFeedInfo'>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={3}>
                        <div className='feedAvatarDiv'>
                            <img className='feedAvatar' src={this.props.avatar} alt=""/>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className='feedDescription'>
                            <Typography variant='body2'>{this.props.firstName} {this.props.lastName}</Typography>
                            <Typography variant='body2'>{this.props.companyName} </Typography>
                            <Typography variant='body2'>{this.props.challenge}</Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                    <div className='adminDeletePhotoBtn'>
                            <Button variant="contained" color="secondary">Delete</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContestImagesInfo);
