import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Footer.css';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Typography } from '@material-ui/core';

class Footer extends Component {

  render() {
    return (
      <div>
        <center>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/home')}}>
          <HomeIcon fontSize='large' />
          <Typography variant='body1'>Home</Typography>
        </div>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/addphoto')}}>
          <AddAPhotoIcon fontSize='large'/>
          <Typography variant='body1'>Add Photo</Typography>
        </div>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/addsteps')}}>
          <DirectionsWalkIcon fontSize='large'/>
          <Typography variant='body1'>Add Steps</Typography>
        </div>
        <div className='footerIconGroup' onClick={() => {this.props.history.push('/team')}}>
          <SupervisedUserCircleIcon fontSize='large'/>
          <Typography variant='body1'>Team Home</Typography>
        </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps) ( withRouter (Footer));

