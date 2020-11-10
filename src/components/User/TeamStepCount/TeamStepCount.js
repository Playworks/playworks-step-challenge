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
                <tr>
                  <td>Ada Lovelace</td>
                  <td>800</td>
                </tr>
                <tr>
                  <td>Grace Hopper</td>
                  <td>700</td>
                </tr>
                <tr>
                  <td>Margaret Hamilton</td>
                  <td>600</td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(TeamStepCount);