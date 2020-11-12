import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './SubmitPhotos.css';
import ImageUpload from './ImageUpload';
import { Button, Card, Typography } from '@material-ui/core';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
import CancelSubmitBtnGroup from './BtnGroup/BtnGroup';
import ChallengeOfTheDay from '../Challenges/Challenges'


class SubmitPhotos extends Component {

//   state = {
//     image: '',
//     challenge:
//       {
//       name: "Today's Challenge Title",
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor pretium viverra suspendisse potenti nullam. Nisl nisi scelerisque eu ultrices.'
//       }
//   };


  

  render() {
    return (
      <div className='submitPhotoSection'>
        {/* <Typography variant='h5'>Today's Challenge</Typography>
        <Typography variant='subtitle1'>{this.state.challenge.name}</Typography>
        <Typography variant='body2'>{this.state.challenge.description}</Typography> */}
        <Card style={{width: '300px'}}>
          <div className='submitImage'>
            {/* { this.state.image === '' ? (
              <img style={{marginTop: '1rem', width: '300px'}} src= { Placeholder } /> 
              ) : ( 
              <img style={{marginTop: '1rem', width: '300px'}} src= { this.state.image } /> 
            )} */}
            <ChallengeOfTheDay/>

          </div>
          <div className='selectImageBtn'>
          <ImageUpload/>
          </div>
        </Card>
        <CancelSubmitBtnGroup />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(SubmitPhotos));