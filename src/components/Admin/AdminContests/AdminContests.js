import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AdminContests.css';
import CreateContest from '../CreateContest/CreateContest';
import AdminContestTable from './AdminContestTable';
import Nav from '../../Nav/Nav.js';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import saveAs from 'file-saver';

class AdminContests extends Component {
  state = {
    heading: 'Contests',
    description: '',
    date: ''
  };

  componentDidMount() {
    this.setContests();

  }

  setContests = () => {
    this.props.dispatch({
      type: 'FETCH_CONTEST'
    });
  }

  // Test function sends hard coded contests_id and csv is generated with papaparse server side
  // result.data is raw data in csv format. saves file as csv
  fetchDataDownloadCsv = () => {
    axios({
      method: 'POST',
      url: '/api/admin',
      data: {
        contests_id: 2
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
        <div>
          <Nav/>
          <center>
            <div className='adminContestHeader'>
              <Typography variant='h4'>{this.state.heading}</Typography>
            </div>
            <AdminContestTable/>
          </center>
          <div className='csvDiv'>
            <button onClick={this.fetchDataDownloadCsv}> Test CSV download</button>
          </div>
          <CreateContest/>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContests);