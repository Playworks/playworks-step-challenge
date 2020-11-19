import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AdminContests.css';
import AdminCreateContest from '../CreateContest/CreateContest';
import AdminContestTable from './AdminContestTable';
import Nav from '../../Nav/Nav.js';
import { Typography } from '@material-ui/core';


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



  render() {
    return (
        <div>
          <Nav/>
          <center>
            <div className='adminContestHeader'>
              <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h4'>{this.state.heading}</Typography>
            </div>
            <AdminContestTable/>
          
          <div className='csvDiv'>
          </div>
          <AdminCreateContest/>
          </center>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContests);