import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AllChallengePhotos.css';
import { Card, Typography } from '@material-ui/core';

class AllChallengePhotos extends Component {
  // state = {
  //   images: [
  //     {
  //       avatar: 'https://avatars1.githubusercontent.com/u/65906860?s=460&u=40b78eaf27468b6e20afc655a916e2b651bf1cfe&v=4',
  //       image:'https://www.abc.net.au/cm/rimage/12172884-3x4-xlarge.jpg?v=4', 
  //       teamName: 'Kickin Chickens',
  //       name: 'Kermit',
  //       challengeTitle: 'Sloths'
  //     },
  //     {
  //       avatar: 'https://avatars1.githubusercontent.com/u/67034482?s=400&u=1623bbf91704fc5fc444fb013324a0ab9faf0ed3&v=4',
  //       image: 'https://news.uchicago.edu/sites/default/files/images/2019-06/sloth_family_tree.jpg', 
  //       name: 'Deadly',
  //       teamName: 'Kickin Chickens',
  //       challengeTitle: 'Things that are cute'
  //     },
  //     {
  //       avatar: 'https://avatars3.githubusercontent.com/u/65255337?s=400&u=813c5093318f0235870d08ecbd15ccb61a3aa5f7&v=4',
  //       image: 'https://static01.nyt.com/images/2014/01/28/science/28SLOT_SPAN/28SLOT-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
  //       name: 'Gonzo',
  //       teamName: 'Kickin Chickens',
  //       challengeTitle: 'Things that are slow'
  //     }
  //   ]
  // };

  componentDidMount() {
    this.setChallengePhotos();
  }

  setChallengePhotos = () => {
    this.props.dispatch({
      type: 'FETCH_CHALLENGE_PHOTOS',
    });
  }

  render() {
    return (
        //   <div className='imageFeed'>
        //     { this.state.images.map( ( item, i ) => 
        //     <div key={i} className='imageFeedCard'>
        //         <Card >
        //           <div className='dailyChallengeImage'>
        //             <img src={item.image}/>
        //           </div>
        //           <Card>
        //             <img className='avatarFeed' src={item.avatar}/>
        //             <div className='feedInfo'>
        //               <Typography variant='body2'>{item.name}</Typography>
        //               <Typography variant='body2'>{item.teamName}</Typography>
        //               <Typography variant='body2'>{item.challengeTitle}</Typography>
        //             </div>
        //           </Card>
        //         </Card>
        //       </div>
        //       )}
        //   </div>
        <div className='imageFeed'>
        { this.props.store.challengePhotos.map( ( photo, i ) => 
            <div key={i} className='imageFeedCard'>

                <Card style={{width: '300px'}}>
                  <div className='dailyChallengeImage'>
                    <img src={photo.file_url} />
                  </div>
                  <Card>
                    <img className='avatarFeed' src={photo.image_path}/>
                    <div className='feedInfo'>
                    <Typography variant='body2'>User:{photo.username}</Typography>
                    <Typography variant='body2'>Challenge Name:{photo.name}</Typography>
                    <Typography variant='body2'>Challenge Description:{photo.description}</Typography>
                    </div>
                </Card>
                </Card>
            </div>
          )}
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AllChallengePhotos);