import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';
import swal from 'sweetalert';

class TeamFeedInfo extends Component {

  denyImage = (value) => {
    // console.log('this button works', value);
    swal({
      title: "Are you sure you want to deny this photo?",
      text: "Once denied the image will be deleted and cannot be recovered.",
      icons: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if(willDelete){
        swal("Image Successfully deleted!",{
          icon: "success",
        }).then(() => {
          this.deleteImage(value);
        })
      }
      else {
        swal("You're in luck, the image wasn't deleted!");
      }
    });
  };

  // Function subtracts 1000 steps first then runs dispatch for delete photo
  // needs to pass teams id to be used in saga that listens for FETCH_CAPTAIN_TEAM_PHOTOS
  deleteImage = async (value) => {
    //console.log('in delete image', value)
    await this.props.dispatch({
      type: 'SUBTRACT_STEPS',
      payload: value
    });
    await this.props.dispatch({
      type: 'DELETE_PHOTOS',
      payload: {
        photo_id: value,
        team_id: this.props.store.user.teams_id
      }
    });
  }

  // Function sends photo id and teams id, needs both photo id for the put request
  // and the teams id to pass to fetch_captain_team_photos type for payload.
  approveImage = async (value) => {
    // console.log('in approveImage and this is value', value);
    await this.props.dispatch({
      type: 'APPROVE_PHOTOS',
      payload: {
        photo_id: value,
        team_id: this.props.store.user.teams_id
      }
    })
  }

  render() {
    return (
      <div>
        <div className='feedInfo'>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={3}>
                    <div className='teamFeedAvatarDiv'>
                    <img className='feedAvatar' src={this.props.photo.image_path}/>

                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='teamFeedDescription'>
                        <Typography variant='body2'>{this.props.photo.username}</Typography>
                        <Typography variant='body2'>{this.props.photo.name}</Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
                {this.props.store.user.admin === "CAPTAIN" && this.props.photo.approved === false ?
                  <div className='approveDenyImageBtns'>
                    <Button style={{marginLeft: '30px'}} variant="contained" color="secondary" onClick={() => this.denyImage(this.props.photo.id)}>Deny</Button>
                    <Button style={{ color: 'white', background: '#054f95', marginLeft: '30px'}} variant="contained" color="primary" onClick={() => this.approveImage(this.props.photo.id)}>Approve</Button>
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
