import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Paper, Typography } from '@material-ui/core';
import './TopSteppers.css';
// react multi carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  },
  smallMobile: {
    breakpoint: { max: 290, min: 0 },
    items: 2
  }
};

class TopSteppers extends Component {

  render() {
    return (
      <div>
        <div className='topSteppers'>
          <div className='homePageHeadline'>
            <Typography variant='h5'>Today's Top Steppers</Typography>
          </div>
          <Carousel 
            responsive={responsive}
            swipeable={true}
            infinite={true}
            autoPlaySpeed={5000}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            removeArrowOnDeviceType={["tablet", "mobile", "smallMobile"]}>
            { this.props.store.topSteppers.map( ( user, i ) => 
              <Paper key={i} className='stepperPaper'>
                <img className='topSteppersAvatar' src={user.image_path}/>
                <Typography variant='body2'>{user.username}</Typography>
                <Typography variant='body2'>{user.sum} steps</Typography>
                <Typography variant='body2'>{user.name}</Typography>
              </Paper>
       
            )}
          </Carousel>

        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TopSteppers);