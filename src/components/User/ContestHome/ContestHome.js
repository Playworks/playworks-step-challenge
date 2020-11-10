import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestHome.css';
import { Paper, Typography } from '@material-ui/core';
// react multi carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

class ContestHome extends Component {

  state = {
    topSteppers: [
      {
        image: 'https://avatars0.githubusercontent.com/u/32749419?s=400&u=dff1f0e1c8e5a6e2d6dd58ce4b1456f465ddad4d&v=4',
        name: 'Arthur',
        teamName: 'Kickin Chickens',
        steps: 10000
      },
      {
      image: 'https://avatars3.githubusercontent.com/u/65255337?s=400&u=813c5093318f0235870d08ecbd15ccb61a3aa5f7&v=4',
      name: 'David',
      teamName: 'Kickin Chickens',
      steps: 10000
      },
      {
      image: 'https://avatars1.githubusercontent.com/u/67034482?s=400&u=1623bbf91704fc5fc444fb013324a0ab9faf0ed3&v=4',
      name: 'Brady',
      teamName: 'Kickin Chickens',
      steps: 10000
    },
    {
      image: 'https://avatars1.githubusercontent.com/u/65906860?s=460&u=40b78eaf27468b6e20afc655a916e2b651bf1cfe&v=4',
      name: 'Ashley',
      teamName: 'Kickin Chickens',
      steps: 10000
    }
    ],
  };
  
  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <div className='leaderboardTable'>
        <Typography variant='h5'>Leaderboard</Typography>
        <center>
          <table>
            <thead>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Steps</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Team Name</td>
                <td>total</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Team Name</td>
                <td>total</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Team Name</td>
                <td>total</td>
              </tr>
            </tbody>
          </table>
        </center>
        </div>
        {/* react multi carousel */}
        <div className='topSteppers'>
          <Typography variant='h5'>Today's Top Steppers</Typography>
          <Carousel responsive={responsive}
          swipeable={true}
          infinite={true}
          autoPlaySpeed={4000}
          autoPlay={this.props.deviceType !== "mobile" ? true : false}
          removeArrowOnDeviceType={["tablet", "mobile"]}>
          { this.state.topSteppers.map( ( item, i ) => 
              <Paper className='stepperPaper'>
                <img className='avatar' src={item.image}/>
                <Typography variant='body2'>{item.name}</Typography>
                <Typography variant='body2'>{item.teamName}</Typography>
                <Typography variant='body2'>{item.steps}</Typography>
              </Paper>
            )}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestHome);
