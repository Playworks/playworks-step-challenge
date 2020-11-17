import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestHome.css';
// react multi carousel
import 'react-multi-carousel/lib/styles.css';
import Leaderboard from '../Leaderboard/Leaderboard';
import TopSteppers from '../TopSteppers/TopSteppers';
import AllChallengePhotos from '../AllChallengePhotos/AllChallengePhotos';
import ChallengeOfTheDay from '../Challenges/Challenges'
import Nav from '../../Nav/Nav.js';
import Footer from '../../Footer/Footer.js';


class ContestHome extends Component {

  state = {
    showBanner: 'true'
  }

  componentDidMount() {
    this.getLeaderBoard()
    this.getTopSteppers()
    this.checkAdmin()
    this.getUserInfo()
  }

  checkAdmin = () => {
    if (this.props.store.user.admin === 'ADMIN') {
      this.props.history.push('/adminhome')
    }
  }
  
  getLeaderBoard = () => {
    this.props.dispatch({
      type: "FETCH_LEADER_BOARD"
    })
  }
  getTopSteppers = () => {
    this.props.dispatch({
      type: "FETCH_TOP_STEPPERS"
    })
  }

  getUserInfo = () => {
    this.props.dispatch({
      type: 'FETCH_USER'
    })
  }
  
  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    console.log('this', this.props.history);
    
    return (
      <div >
        <Nav />
        <div className="container">
          <Leaderboard/>
          <TopSteppers/>
          <ChallengeOfTheDay/>
          <AllChallengePhotos/>
        </div>
        <div className='footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestHome);
