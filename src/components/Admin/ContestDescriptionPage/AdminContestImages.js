import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Card, Typography } from '@material-ui/core';
import AdminContestImagesInfo from './AdminContestImagesInfo';

class AdminContestImages extends Component {
 
  render() {
    return (
        <div className='adminContestImagesContainer'>
            <div className='adminContestImagesHeader'>
                <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h5'>Contest Images</Typography>
            </div>
            <div className='adminContestImagesFeed'>
              { this.props.store.adminPhotos.map( ( photo, i ) => 
                <div className='imageFeedCard' key={i}>
                <Card style={{width: '300px'}}>
                    <div className='dailyChallengeImageContainer'>
                        <img className='dailyChallengeImage' src={photo.file_url} alt="" />
                    </div>
                     <Card>
                        <AdminContestImagesInfo key={i}
                        id={photo.id}
                        challenge={photo.name}
                        avatar={photo.image_path} 
                        firstName={photo.first_name}
                        lastName={photo.last_name} 
                        companyName={photo.company_name}/> 
                    </Card> 
                </Card>
                </div>
                )}
            </div>
          </div>
        

    );
  }
}

export default connect(mapStoreToProps)(AdminContestImages);
