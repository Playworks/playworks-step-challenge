import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestDescriptionPage.css';
import Nav from '../../Nav/Nav.js';
import AdminContestImages from './AdminContestImages';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import saveAs from 'file-saver';

class ContestDescriptionPage extends Component {
  
  // Test function sends hard coded contests_id and csv is generated with papaparse server side
  // result.data is raw data in csv format. saves file as csv
  fetchDataDownloadCsv = () => {
    axios({
      method: 'POST',
      url: '/api/admin',
      data: {
        contests_id: this.props.store.currentContest
      }
    }).then(result => {
      console.log(result.data);
      const csvfile = new File([result.data], 'result.csv', {type: "text/plain;charset=utf-8"});
      saveAs(csvfile);
    }).catch(error => {
      console.log('we have an error in fetchDataDownloadCSV', error);
    })
  };

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
              <button onClick={this.fetchDataDownloadCsv}>Export Data To CSV</button>
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