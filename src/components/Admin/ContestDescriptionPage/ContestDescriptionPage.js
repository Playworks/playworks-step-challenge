import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestDescriptionPage.css';
import Nav from '../../Nav/Nav.js';
import AdminContestImages from './AdminContestImages';
import { Typography } from '@material-ui/core';

class ContestDescriptionPage extends Component {
  

  render() {
    return (
      <div >
        <Nav/>
        <center>
          <div className='adminContestDescriptionHeader'>
            <Typography variant='h4'>CONTEST NAME Replace Meeeeee</Typography>
          </div>
          <table className='adminContestDescriptionTable'>
            <thead>
              <tr>
                <th><Typography variant='h6'>Team Name</Typography></th>
                <th><Typography variant='h6'>Team Captain</Typography></th>
              </tr>
            </thead>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>Name</td>
            </tr>
          </table>

          <div className='csvDiv'>
            <div className='exportToCsvLink'>
              <a href="/csv">Export Contest To CSV</a>
            </div>
            <div className='closeContestBtn'>
              <button>Close Contest</button>
            </div>
          </div>

          <AdminContestImages />
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestDescriptionPage);