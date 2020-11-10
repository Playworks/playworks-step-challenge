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
    );
  }
}

export default connect(mapStoreToProps)(Leaderboard);