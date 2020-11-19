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

      <div className='footerContainer'>
        <center>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/home')}}>
            <HomeIcon/>
            <div className='footerCaption'>
              <Typography variant='caption'>Home</Typography>
            </div>
          </div>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/addphoto')}}>
            <AddAPhotoIcon/>
            <div className='footerCaption'>
              <Typography variant='caption'>Add Photo</Typography>
            </div>
          </div>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/addsteps')}}>
            <DirectionsWalkIcon/>
            <div className='footerCaption'>
              <Typography variant='caption'>Add Steps</Typography>
            </div>
          </div>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/team')}}>
            <SupervisedUserCircleIcon/>
            <div className='footerCaption'>
              <Typography variant='caption'>Team Home</Typography>
            </div>
          </div>
        </center>
      </div>
      
    );
  }
}

export default connect(mapStoreToProps) ( withRouter (Footer));

