import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './PlayworksAdminHome.css';
import { Typography } from '@material-ui/core';
import CreateContest from '../CreateContest/CreateContest';

class PlayworksAdminHome extends Component {
  state = {
    heading: 'Contests',
  };

  render() {
    return (
      <div className='contestTable'>
        <Typography variant='h5'>{this.state.heading}</Typography>
        <center>
          <table>
            <thead>
              <th>Contest</th>
              <th>Company</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th></th>
            </thead>
            <tbody>
              <tr>
                <td>Contest 1</td>
                <td>Company Name</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>View Details</td>
              </tr>
              <tr>
                <td>Contest 2</td>
                <td>Company Name</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>View Details</td>
              </tr>
              <tr>
                <td>Contest 3</td>
                <td>Company Name</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>View Details</td>
              </tr>
            </tbody>
          </table>
        </center>
        <CreateContest/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayworksAdminHome);