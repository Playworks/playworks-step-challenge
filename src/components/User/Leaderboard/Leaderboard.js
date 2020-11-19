import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Leaderboard.css';
import { Typography } from '@material-ui/core';

class Leaderboard extends Component {
  state = {
    heading: 'Leaderboard',
  };

  render() {
    return (
      <div >
        <center>
          <div className='leaderBoard'>
            <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h5'>{this.state.heading}</Typography>
          </div>
          <table id='leaderboardTable'>
            <thead>
              <tr>
                <th><Typography variant='body1'>Rank</Typography></th>
                <th><Typography variant='body1'>Team Name</Typography></th>
                <th><Typography variant='body1'>Steps</Typography></th>
              </tr>
            </thead>
            <tbody>
              {this.props.store.leaderBoard.map((leaders, i) => 
                <tr key={i}>
                  <td>{i +1}</td>
                  <td>{leaders.name}</td>
                  <td>{leaders.sum}</td>
                </tr>
              )}
            </tbody>
          </table>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Leaderboard);