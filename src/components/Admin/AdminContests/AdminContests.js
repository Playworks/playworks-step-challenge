import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AdminContests.css';
import ContestsGrid from '../ContestsGrid/ContestsGrid';
import CreateContest from '../CreateContest/CreateContest';
import AdminContestsItem from '../AdminContestsItem/AdminContestsItem';
import Nav from '../../Nav/Nav.js';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import FileSaver from 'file-saver';
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
            <Typography variant='h5'>{this.state.heading}</Typography>
            <div>
              <button onClick={this.fetchDataDownloadCsv}> Test CSV download</button>
                <center>
                    <table>
                    <thead>
                        <tr>
                        <th>Contest</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.store.contest.map((item, i) => 
                        <AdminContestsItem
                            key={item.id}
                            contest={item}
                        />
                        )}
                    </tbody>
                    </table>
                </center>
            </div>
            {/* {this.props.store.contest.map((item, i) => 
                <ContestsGrid 
                key={item.id}
                contest={item} />
                )} */}
                <CreateContest/>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContests);