import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import material ui
import { Card } from '@material-ui/core';
// import component
import AllChallengeFeedInfo from './AllChallengeFeedInfo';
// import css
import './AllChallengePhotos.css';

class AllChallengePhotos extends Component {
  // On page load runs setChallengePhotos function
  componentDidMount() {
    this.setChallengePhotos();
  }

  // Function sends dispatch to fetch challenge photos
  setChallengePhotos = () => {
    this.props.dispatch({
      type: 'FETCH_CHALLENGE_PHOTOS',
    });
  }

  render() {
    return (
      <div className='imageFeedContainer'>
        <div>
          {this.props.store.challengePhotos.map((photo, i) => 
            <div className='imageFeedCard' key={i}>
              <Card style={{width: '300px'}}>
                <div className='dailyChallengeImageContainer'>
                  <img className='dailyChallengeImage' src={photo.photos_file_url} alt="" />
                </div>
                <Card>
                  <AllChallengeFeedInfo photo={photo}/>
                </Card>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AllChallengePhotos);