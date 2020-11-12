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
      <div>
        <Typography variant='h5'>{this.state.heading}</Typography>
        <center>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Steps</th>
              </tr>
            </thead>
            <tbody>
              {this.props.store.leaderBoard.map((leaders, i) => 
                <tr>
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