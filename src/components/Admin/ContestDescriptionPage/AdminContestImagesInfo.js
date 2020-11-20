import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';


class AdminContestImagesInfo extends Component {
    deleteItem = () => {
        console.log('in deleteItem, this is our contest id', this.props.contest_id, 'this is our photo id', this.props.photo_id);
        this.props.dispatch({
            type: 'ADMIN_DELETE_PHOTO',
            payload:{
                photo_id: this.props.photo_id,
                contest_id: this.props.contest_id
            }
        });
    }

  render() {
    console.log('in AdminContestImagesInfo.js this is props', this.props);
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
                        <div className='adminFeedDescription'>
                            <Typography variant='body2'>{this.props.firstName} {this.props.lastName}</Typography>
                            <Typography variant='body2'>{this.props.companyName} </Typography>
                            <Typography variant='body2'>{this.props.challenge}</Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                    <div className='adminDeletePhotoBtn'>
                            <Button variant="contained" color="secondary" onClick={this.deleteItem}>Delete</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContestImagesInfo);
