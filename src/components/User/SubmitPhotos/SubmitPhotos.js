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
import Nav from '../../Nav/Nav.js';
import Footer from '../../Footer/Footer.js';

class SubmitPhotos extends Component {

  render() {
    return (
      <div>
        <Nav />
      
      <div className='submitPhotoSection'>

        <Card style={{width: '300px'}}>
          <div className='submitImage'>

            <ChallengeOfTheDay/>

          </div>
          <div className='selectImageBtn'>
          <ImageUpload/>
          </div>
        </Card>
      </div>
      <Footer />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(SubmitPhotos));