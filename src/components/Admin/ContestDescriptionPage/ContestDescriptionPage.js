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
            <Typography variant='h4'></Typography>
          </div>
          <table className='adminContestDescriptionTable'>
            <thead>
              <tr>
                <th><Typography variant='h6'>Team Name</Typography></th>
                <th><Typography variant='h6'>Team Captain</Typography></th>
                <th><Typography variant='h6'>Company</Typography></th>
              </tr>
            </thead>
            {this.props.store.adminContest.map(contest => 
              <tr>
              <td>{contest.name}</td>
              <td>{contest.first_name} {contest.last_name}</td>
              <td>{contest.company_name}</td>
              </tr>
              )}
            
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