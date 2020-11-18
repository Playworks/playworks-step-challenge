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
import IconButton from '@material-ui/core/IconButton';

class Footer extends Component {

  render() {
    return (
      <div className='footerContainer'>
        <center>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/home')}}>
            <HomeIcon/>
            <Typography variant='body2'>Home</Typography>
          </div>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/addphoto')}}>
            <AddAPhotoIcon/>
            <Typography variant='body2'>Add Photo</Typography>
          </div>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/addsteps')}}>
            <DirectionsWalkIcon/>
            <Typography variant='body2'>Add Steps</Typography>
          </div>
          <div className='footerIconGroup' onClick={() => {this.props.history.push('/team')}}>
            <SupervisedUserCircleIcon/>
            <Typography variant='body2'>Team Home</Typography>
          </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps) ( withRouter (Footer));

