import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './TeamStepCount.css';
import { Typography } from '@material-ui/core';

class TeamStepCount extends Component { 

  render() {
    return (
      <div className='teamStepCount'>
        <Typography variant='h5'>Team Step Count</Typography>
          <center>
            <table>
              <thead>
                <th>Name</th>
                <th>Steps</th>
              </thead>
              <tbody>
                {this.props.store.teamDetails.map((user, i) =>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.sum}</td>
                </tr>
                )}
              </tbody>
            </table>
          </center>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamStepCount);