import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './ContestDescriptionPage.css';
import Nav from '../../Nav/Nav.js';
import AdminContestImages from './AdminContestImages';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import saveAs from 'file-saver';
// import sweetalert
import swal from 'sweetalert';


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

  // Created a function that is a validation function that takes in the argument which is the contests id
  // if willDelete is true will run closeContest and pass contest id as arguement.
  confirmationClose = (id) => {
    swal({
      title: "Are you sure you want to close this contest?",
      text: "Once deleted it cannot be recovered.",
      icons: "warning",
      buttons: true,
      dangerMode: true
    })
    .then(willDelete => {
      if(willDelete){
        swal("Contest Successfully deleted!",{
          icon: "success",
        });
        this.closeContest(id)
      }
      else {
        swal("You're in luck, the contest wasn't deleted!");
      }
    });
  };

  // Function sends a delete request to server upon success pushes user to adminhome
  closeContest = (id) => {
    console.log('this is id arg', id);
    axios({
      method: 'DELETE',
      url: `/api/contest/${id}`
    }).then(result => {
      console.log('we did it', result);
      this.props.history.push('/adminhome');
    }).catch(error => {
      console.log('uh oh', error);
    });
  };

  // uses currentContest to find by index of contest in contest array
  // to show name of current contest
  current = () => {
    return this.props.store.currentContest - 1;
  }


  render() {
    console.log('current', this.props.store.currentContest);
    return (
      <div >
        <Nav/>
        <center>
          <div className='adminContestDescriptionHeader'>
          <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h4'>{this.props.store.contest[this.current()] && this.props.store.contest[this.current()].name}</Typography>
          </div>
          <table className='adminContestDescriptionTable'>
            <thead>
              <tr>
                <th><Typography variant='h6'>Team Name</Typography></th>
                <th><Typography variant='h6'>Team Captain</Typography></th>
                <th><Typography variant='h6'>Company</Typography></th>
              </tr>
            </thead>
            {this.props.store.adminContest.map((contest, i) => 
              <tbody key={i}>
                <tr>
                  <td>{contest.name}</td>
                  <td>{contest.first_name} {contest.last_name}</td>
                  <td>{contest.company_name}</td>
                </tr>
              </tbody>
              )}
          </table>

          <div className='csvDiv'>
            <div className='exportToCsvLink'>
              <button onClick={this.fetchDataDownloadCsv}>Export Data To CSV</button>
            </div>
            <div className='closeContestBtn'>
              <button onClick={() => this.confirmationClose(this.props.store.currentContest)}>Close Contest</button>
            </div>
          </div>

          <AdminContestImages />
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestDescriptionPage);