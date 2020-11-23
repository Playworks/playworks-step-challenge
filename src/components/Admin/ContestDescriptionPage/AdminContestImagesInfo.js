import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';
// import sweet alert
import swal from 'sweetalert';

class AdminContestImagesInfo extends Component {
  // Created a function that is a validation function that takes in the argument which is the contests id
  // if willDelete is true will run closeContest and pass contest id as arguement.
  confirmationClose = () => {
    swal({
      title: "Are you sure you want to delete this photo?",
      text: "Once deleted it cannot be recovered.",
      icons: "warning",
      buttons: true,
      dangerMode: true
    })
    .then(willDelete => {
      if(willDelete){
        swal("Contest Successfully deleted!",{
          icon: "success",
        });
        this.deleteItem();
      }
      else {
        swal("You're in luck, the photo wasn't deleted!");
      }
    });
  };

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
                            <Button variant="contained" color="secondary" onClick={this.confirmationClose}>Delete</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContestImagesInfo);
